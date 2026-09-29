((global) => {
  'use strict';

  const { INBOX, RECURS, EXPORT_APP, EXPORT_VERSION, IMPORT_MODES,
    currentDay, isValidDate } = global.Todo;

  // Domain model: the task list, its invariants and its operations.
  // It knows nothing about localStorage or the DOM; it notifies
  // subscribers when the state changes. The state is private and
  // only mutates through the operations below.
  class TaskList {
    #tasks = [];
    #lists = [{ ...INBOX }];
    #nextId = 1;
    #listeners = [];

    subscribe(fn) {
      this.#listeners.push(fn);
    }

    #notify() {
      this.#listeners.forEach((fn) => fn());
    }

    // Resets the state without notifying subscribers. The inbox
    // list is permanent: it exists even in an empty state.
    reset() {
      this.#tasks = [];
      this.#lists = [{ ...INBOX }];
      this.#nextId = 1;
    }

    // Public reads return copies: the private state (and each
    // task object in it) can only change through the operations.
    #snapshot(task) {
      return { id: task.id, text: task.text, done: task.done,
        listId: task.listId, date: task.date, recur: task.recur };
    }

    lists() {
      return this.#lists.map((list) => ({ ...list }));
    }

    tasks() {
      return this.#tasks.map(this.#snapshot);
    }

    nextId() {
      return this.#nextId;
    }

    isValidTask(candidate) {
      return !!candidate &&
        typeof candidate.id === 'number' && Number.isFinite(candidate.id) &&
        typeof candidate.text === 'string' && candidate.text.trim() !== '' &&
        typeof candidate.done === 'boolean';
    }

    isValidList(candidate) {
      return !!candidate &&
        typeof candidate.id === 'string' && candidate.id !== '' &&
        candidate.id !== INBOX.id &&
        typeof candidate.name === 'string' && candidate.name.trim() !== '';
    }

    // List names are unique case-insensitively: "Trabajo" and
    // "trabajo" are the same list for the person managing them.
    #nameTaken(name, exceptId = null) {
      const wanted = name.trim().toLowerCase();
      return this.#lists.some((list) =>
        list.id !== exceptId && list.name.toLowerCase() === wanted);
    }

    // Accepts two persisted shapes: the legacy flat array, whose
    // tasks all migrate to the inbox, and the current
    // {lists, tasks} object. Tasks pointing to a missing list are
    // dropped; the inbox is recreated when absent.
    load(data) {
      this.#lists = [{ ...INBOX }];
      let tasks = [];
      if (Array.isArray(data)) {
        tasks = data;
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.lists)) {
          const valid = data.lists.filter(this.isValidList);
          const unique = valid.filter((list, i) =>
            valid.findIndex((other) => other.id === list.id) === i);
          // Data persisted before archiving lacks the flag;
          // absent means not archived.
          this.#lists.push(...unique.map((list) =>
            ({ id: list.id, name: list.name,
              archived: list.archived === true })));
        }
        if (Array.isArray(data.tasks)) {
          tasks = data.tasks;
        }
      }
      const known = new Set(this.#lists.map((list) => list.id));
      // Data persisted before task dates lacks the field, and a
      // malformed date drops alone: the task survives either way.
      // Recurrence is bound to the date: without a valid one, or with
      // an unknown periodicity, it drops alone the same way.
      this.#tasks = tasks
        .filter(this.isValidTask)
        .filter((t) => !('listId' in t) || known.has(t.listId))
        .map((t) => {
          const date = isValidDate(t.date) ? t.date : null;
          return { id: t.id, text: t.text, done: t.done,
            listId: 'listId' in t ? t.listId : INBOX.id,
            date,
            recur: date && RECURS.includes(t.recur) ? t.recur : null };
        });
      this.#nextId = this.#tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    }

    // The export document is self-contained and versioned: lists
    // and tasks ride in the same shape the state persists, inbox
    // included.
    toDocument() {
      return {
        app: EXPORT_APP,
        version: EXPORT_VERSION,
        lists: this.lists(),
        tasks: this.tasks()
      };
    }

    // Strict gate for foreign payloads: unlike load, which salvages
    // item by item, a single invalid item rejects the whole document
    // and the state is never touched. The optional fields (archived,
    // date, recur) may be absent so documents exported before they
    // existed still import; when present they must be valid.
    parseDocument(candidate) {
      let doc = candidate;
      if (typeof doc === 'string') {
        try {
          doc = JSON.parse(doc);
        } catch (e) {
          return { ok: false, reason: 'malformed-json' };
        }
      }
      if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
        return { ok: false, reason: 'not-a-document' };
      }
      if (doc.app !== EXPORT_APP) {
        return { ok: false, reason: 'unknown-format' };
      }
      if (doc.version !== EXPORT_VERSION) {
        return { ok: false, reason: 'unsupported-version' };
      }
      if (!Array.isArray(doc.lists) || !Array.isArray(doc.tasks)) {
        return { ok: false, reason: 'not-a-document' };
      }
      return this.#validateDocument(doc);
    }

    // List ids and names (case-insensitive) are unique within the
    // document. The inbox may appear once — never archived — and is
    // the only list allowed to carry its reserved id. Since the
    // imported state always contains the permanent inbox, no other
    // list may carry its name.
    #validateDocument(doc) {
      const listIds = new Set();
      const listNames = new Set();
      for (const list of doc.lists) {
        const valid = !!list && typeof list === 'object' &&
          typeof list.name === 'string' && list.name.trim() !== '' &&
          (!('archived' in list) || typeof list.archived === 'boolean') &&
          (list.id === INBOX.id
            ? list.archived !== true
            : this.isValidList(list));
        const key = valid && list.name.trim().toLowerCase();
        if (!valid || listIds.has(list.id) || listNames.has(key) ||
            (list.id !== INBOX.id &&
              key === INBOX.name.trim().toLowerCase())) {
          return { ok: false, reason: 'invalid-lists' };
        }
        listIds.add(list.id);
        listNames.add(key);
      }
      const taskIds = new Set();
      for (const task of doc.tasks) {
        const valid = this.isValidTask(task) &&
          (!('listId' in task) || listIds.has(task.listId)) &&
          (task.date === undefined || task.date === null ||
            isValidDate(task.date)) &&
          (task.recur === undefined || task.recur === null ||
            (RECURS.includes(task.recur) && isValidDate(task.date)));
        if (!valid || taskIds.has(task.id)) {
          return { ok: false, reason: 'invalid-tasks' };
        }
        taskIds.add(task.id);
      }
      return { ok: true, document: doc };
    }

    // Importing always goes through the strict gate. 'replace' makes
    // the document the whole state — load's per-item sanitation is
    // harmless on an already validated document; 'copy' adds the
    // content next to the existing state. Either way the subscribers
    // get a single notification.
    importDocument(candidate, mode) {
      if (!IMPORT_MODES.includes(mode)) {
        return { ok: false, reason: 'unknown-mode' };
      }
      const parsed = this.parseDocument(candidate);
      if (!parsed.ok) {
        return parsed;
      }
      if (mode === 'replace') {
        this.load(parsed.document);
      } else {
        this.#importCopy(parsed.document);
      }
      this.#notify();
      return { ok: true };
    }

    // Copying adds the document's content next to the existing state:
    // each list gets a fresh id and a free name, the document's inbox
    // merges into the permanent one and tasks are recreated with new
    // ids and their list reference remapped.
    #importCopy(doc) {
      // A Map, not a plain object: document ids are foreign strings
      // like '__proto__', which would corrupt an object's prototype.
      const idMap = new Map([[INBOX.id, INBOX.id]]);
      doc.lists.forEach((list) => {
        if (list.id === INBOX.id) {
          return;
        }
        let seq = 0;
        let id;
        do {
          id = `list-${++seq}`;
        } while (this.#lists.some((l) => l.id === id));
        this.#lists.push({ id, name: this.#freeName(list.name),
          archived: list.archived === true });
        idMap.set(list.id, id);
      });
      doc.tasks.forEach((task) => {
        this.#tasks.push({ id: this.#nextId++, text: task.text,
          done: task.done,
          listId: 'listId' in task ? idMap.get(task.listId) : INBOX.id,
          date: task.date || null, recur: task.recur || null });
      });
    }

    // A copied list keeps its name unless it collides: names are
    // unique case-insensitively, so a numbered '(copia)' suffix makes
    // room without merging content.
    #freeName(name) {
      let candidate = name;
      for (let seq = 1; this.#nameTaken(candidate); seq++) {
        candidate = seq === 1 ? `${name} (copia)` : `${name} (copia ${seq})`;
      }
      return candidate;
    }

    findTask(id) {
      const task = this.#find(id);
      return task ? this.#snapshot(task) : null;
    }

    #find(id) {
      return this.#tasks.find((t) => t.id === id) || null;
    }

    // A malformed date degrades to undated, same tolerance as load.
    addTask(text, listId = INBOX.id, date = null) {
      const clean = (text || '').trim();
      if (!clean || !this.#lists.some((list) => list.id === listId)) {
        return null;
      }
      const task = { id: this.#nextId++, text: clean, done: false, listId,
        date: isValidDate(date) ? date : null, recur: null };
      this.#tasks.push(task);
      this.#notify();
      return this.#snapshot(task);
    }

    // Completing a recurring task leaves the completed one as the
    // record of what was done and spawns a live copy — same text,
    // list and recurrence — dated at the next occurrence.
    toggleTask(id, today = currentDay()) {
      const task = this.#find(id);
      if (!task) {
        return null;
      }
      task.done = !task.done;
      if (task.done && task.recur && task.date) {
        const copy = { id: this.#nextId++, text: task.text,
          done: false, listId: task.listId,
          date: this.#nextOccurrence(task.date, task.recur, today),
          recur: task.recur };
        this.#tasks.push(copy);
      }
      this.#notify();
      return this.#snapshot(task);
    }

    // The next occurrence is computed from the task's own date and
    // advanced in steps until it lands strictly after the reference
    // day, so an overdue recurring task resumes at its next future
    // slot. Monthly keeps the day of month, clamping to the last
    // day when the month is shorter ('2026-01-31' → '2026-02-28');
    // each step starts from the resulting date.
    #nextOccurrence(date, recur, today) {
      let next = date;
      while (next <= today) {
        const [year, month, day] = next.split('-').map(Number);
        let d;
        if (recur === 'weekly') {
          d = new Date(year, month - 1, day + 7);
        } else {
          d = new Date(year, month, day);
          if (d.getDate() !== day) {
            d.setDate(0);
          }
        }
        const pad = (n) => String(n).padStart(2, '0');
        next = `${d.getFullYear()}-${pad(d.getMonth() + 1)}` +
          `-${pad(d.getDate())}`;
      }
      return next;
    }

    editTask(id, newText) {
      const task = this.#find(id);
      if (!task) {
        return null;
      }
      const clean = (newText || '').trim();
      if (!clean) {
        return this.deleteTask(id);
      }
      task.text = clean;
      this.#notify();
      return this.#snapshot(task);
    }

    deleteTask(id) {
      const task = this.#find(id);
      if (!task) {
        return null;
      }
      this.#tasks = this.#tasks.filter((t) => t.id !== id);
      this.#notify();
      return this.#snapshot(task);
    }

    setTaskDate(id, date) {
      const task = this.#find(id);
      if (!task || !isValidDate(date)) {
        return null;
      }
      task.date = date;
      this.#notify();
      return this.#snapshot(task);
    }

    clearTaskDate(id) {
      const task = this.#find(id);
      if (!task) {
        return null;
      }
      task.date = null;
      // Recurrence requires a date: removing one removes the other.
      task.recur = null;
      this.#notify();
      return this.#snapshot(task);
    }

    // Recurrence needs a date to repeat from: a task without one
    // cannot be recurring. Pass null to make the task plain again.
    setTaskRecur(id, recur) {
      const task = this.#find(id);
      if (!task || !task.date ||
          (recur !== null && !RECURS.includes(recur))) {
        return null;
      }
      task.recur = recur;
      this.#notify();
      return this.#snapshot(task);
    }

    // Where a task's day stands relative to the reference day —
    // injectable so tests pin "today" instead of the clock.
    dateStatus(date, today = currentDay()) {
      if (!isValidDate(date)) {
        return null;
      }
      return date < today ? 'overdue' : date > today ? 'future' : 'today';
    }

    pendingCount(listId, view = 'main', today = currentDay()) {
      return this.visibleTasks('active', listId, view, today).length;
    }

    // The 'main' view stays scoped to a list and hides tasks
    // scheduled for later; the 'today' view crosses live lists
    // and admits only what is overdue or due on the reference
    // day — an archived list is out of every view.
    #scopedTasks(listId, view, today) {
      const archivedIds = new Set(
        this.#lists.filter((l) => l.archived).map((l) => l.id));
      return view === 'today'
        ? this.#tasks.filter((t) => {
            if (archivedIds.has(t.listId)) {
              return false;
            }
            const status = this.dateStatus(t.date, today);
            return status === 'overdue' || status === 'today';
          })
        : this.#tasks
            .filter((t) => !listId || t.listId === listId)
            .filter((t) => this.dateStatus(t.date, today) !== 'future');
    }

    visibleTasks(filter, listId, view = 'main', today = currentDay()) {
      const scoped = this.#scopedTasks(listId, view, today);
      if (filter === 'active') {
        return scoped.filter((t) => !t.done).map(this.#snapshot);
      }
      if (filter === 'completed') {
        return scoped.filter((t) => t.done).map(this.#snapshot);
      }
      return scoped.map(this.#snapshot);
    }

    addList(name) {
      const clean = (name || '').trim();
      if (!clean || this.#nameTaken(clean)) {
        return null;
      }
      let seq = 0;
      let id;
      do {
        id = `list-${++seq}`;
      } while (this.#lists.some((list) => list.id === id));
      const list = { id, name: clean, archived: false };
      this.#lists.push(list);
      this.#notify();
      return { ...list };
    }

    renameList(id, name) {
      const list = this.#lists.find((l) => l.id === id);
      const clean = (name || '').trim();
      if (!list || id === INBOX.id || !clean || this.#nameTaken(clean, id)) {
        return null;
      }
      list.name = clean;
      this.#notify();
      return { ...list };
    }

    // Deleting a list never loses tasks: they move to the inbox.
    deleteList(id) {
      const list = this.#lists.find((l) => l.id === id);
      if (!list || id === INBOX.id) {
        return null;
      }
      const removed = { ...list };
      this.#tasks.forEach((t) => {
        if (t.listId === id) {
          t.listId = INBOX.id;
        }
      });
      this.#lists = this.#lists.filter((l) => l.id !== id);
      this.#notify();
      return removed;
    }

    // Archiving parks a list with its tasks intact: it leaves the
    // navigation but nothing is destroyed.
    archiveList(id) {
      const list = this.#lists.find((l) => l.id === id);
      if (!list || id === INBOX.id || list.archived) {
        return null;
      }
      list.archived = true;
      this.#notify();
      return { ...list };
    }

    unarchiveList(id) {
      const list = this.#lists.find((l) => l.id === id);
      if (!list || !list.archived) {
        return null;
      }
      list.archived = false;
      this.#notify();
      return { ...list };
    }

    // Archived lists are parked: tasks cannot be moved into them.
    moveTask(id, listId) {
      const task = this.#find(id);
      if (!task || !this.#lists
          .some((list) => list.id === listId && !list.archived)) {
        return null;
      }
      task.listId = listId;
      this.#notify();
      return this.#snapshot(task);
    }

    // Clearing removes what the active view shows as completed:
    // the same scope the read applies, so a completed task scheduled
    // for later is never reached — it is visible in neither view.
    clearCompleted(listId = INBOX.id, view = 'main', today = currentDay()) {
      const scoped = new Set(
        this.#scopedTasks(listId, view, today).map((t) => t.id));
      this.#tasks = this.#tasks
        .filter((t) => !(t.done && scoped.has(t.id)));
      this.#notify();
    }
  }

  // The class is shared; the instance belongs to the composition
  // root and never reaches the namespace.
  global.Todo.TaskList = TaskList;
})(typeof window !== 'undefined' ? window : this);
