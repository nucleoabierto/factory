((global) => {
  'use strict';

  const STORAGE_KEY = 'todoapp-tasks';
  const FILTER_KEY = 'todoapp-filter';
  const ACTIVE_LIST_KEY = 'todoapp-active-list';
  const FILTERS = ['all', 'active', 'completed'];
  const INBOX = { id: 'inbox', name: 'Entrada', archived: false };

  // Task dates are calendar days as ISO strings ('YYYY-MM-DD'):
  // comparing them as strings orders like dates, so classification
  // needs no Date arithmetic and the reference day is injectable.
  function currentDay() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}` +
      `-${pad(now.getDate())}`;
  }

  // A valid date is a real calendar day, not just a matching shape:
  // '2026-02-30' parses but does not exist.
  function isValidDate(candidate) {
    if (typeof candidate !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(candidate)) {
      return false;
    }
    const [year, month, day] = candidate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 &&
      date.getDate() === day;
  }

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
        listId: task.listId, date: task.date };
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
      this.#tasks = tasks
        .filter(this.isValidTask)
        .filter((t) => !('listId' in t) || known.has(t.listId))
        .map((t) => ({ id: t.id, text: t.text, done: t.done,
          listId: 'listId' in t ? t.listId : INBOX.id,
          date: isValidDate(t.date) ? t.date : null }));
      this.#nextId = this.#tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    }

    findTask(id) {
      const task = this.#find(id);
      return task ? this.#snapshot(task) : null;
    }

    #find(id) {
      return this.#tasks.find((t) => t.id === id) || null;
    }

    addTask(text, listId = INBOX.id) {
      const clean = (text || '').trim();
      if (!clean || !this.#lists.some((list) => list.id === listId)) {
        return null;
      }
      const task = { id: this.#nextId++, text: clean, done: false, listId,
        date: null };
      this.#tasks.push(task);
      this.#notify();
      return this.#snapshot(task);
    }

    toggleTask(id) {
      const task = this.#find(id);
      if (!task) {
        return null;
      }
      task.done = !task.done;
      this.#notify();
      return this.#snapshot(task);
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

    pendingCount(listId) {
      return this.#tasks
        .filter((t) => !t.done && (!listId || t.listId === listId))
        .length;
    }

    visibleTasks(filter, listId) {
      const scoped = listId
        ? this.#tasks.filter((t) => t.listId === listId)
        : this.#tasks;
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

    clearCompleted(listId = INBOX.id) {
      this.#tasks = this.#tasks
        .filter((t) => !(t.done && t.listId === listId));
      this.#notify();
    }
  }

  const taskList = new TaskList();

  // Infrastructure: persistence in localStorage, tolerant of
  // missing or corrupted data. It moves data in and out; it does
  // not know the model or the DOM.
  const Storage = {
    loadTasks() {
      let raw;
      try {
        raw = global.localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        return [];
      }
      if (!raw) {
        return [];
      }
      try {
        const data = JSON.parse(raw);
        if (!data || typeof data !== 'object') {
          throw new Error('unexpected format');
        }
        return data;
      } catch (e) {
        return [];
      }
    },

    saveTasks(data) {
      try {
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        // Persistence unavailable: the app keeps working in memory.
      }
    },

    loadFilter() {
      let stored;
      try {
        stored = global.localStorage.getItem(FILTER_KEY);
      } catch (e) {
        stored = null;
      }
      return FILTERS.includes(stored) ? stored : 'all';
    },

    saveFilter(name) {
      try {
        global.localStorage.setItem(FILTER_KEY, name);
      } catch (e) {
        // Persistence unavailable: the filter still applies in memory.
      }
    },

    // The stored value is a raw string: whether the list exists
    // is for the model to decide after loading.
    loadActiveList() {
      try {
        return global.localStorage.getItem(ACTIVE_LIST_KEY);
      } catch (e) {
        return null;
      }
    },

    saveActiveList(id) {
      try {
        global.localStorage.setItem(ACTIVE_LIST_KEY, id);
      } catch (e) {
        // Persistence unavailable: the choice still applies in memory.
      }
    }
  };

  // Presentation: DOM rendering and event dispatch. Each render is a
  // function of the view-model it receives; user events go out through
  // the actions bound at init. It knows nothing about the model or
  // persistence.
  // The single event mechanism: delegated listeners on the document
  // dispatch by data-action. Static controls and dynamic rows share
  // the same contract, so the render attaches no listeners at all.
  const dispatchTable = {
    click: {
      'destroy-task': (el, ev, actions) =>
        actions.deleteTask(Number(el.dataset.id)),
      'reactivate-list': (el, ev, actions) =>
        actions.unarchiveList(el.dataset.id),
      'set-filter': (el, ev, actions) => {
        ev.preventDefault();
        actions.setFilter(el.dataset.filter);
      },
      'clear-completed': (el, ev, actions) => actions.clearCompleted(),
      'add-list': (el, ev, actions) => {
        const name = global.prompt('Nombre de la lista');
        if (name !== null) {
          actions.addList(name);
        }
      },
      'rename-list': (el, ev, actions) => {
        const name = global.prompt('Nuevo nombre de la lista',
          actions.activeListName());
        if (name !== null) {
          actions.renameActiveList(name);
        }
      },
      'archive-list': (el, ev, actions) => actions.archiveActiveList(),
      'delete-list': (el, ev, actions) => actions.deleteActiveList()
    },
    change: {
      'set-active-list': (el, ev, actions) => actions.setActiveList(el.value),
      'toggle-task': (el, ev, actions) =>
        actions.toggleTask(Number(el.dataset.id)),
      'move-task': (el, ev, actions) =>
        actions.moveTask(Number(el.dataset.id), el.value)
    },
    keydown: {
      'add-task': (el, ev, actions) => {
        if (ev.key === 'Enter' && actions.addTask(el.value)) {
          el.value = '';
        }
      },
      'edit-task': (el, ev, actions) => {
        if (ev.key === 'Enter') {
          actions.editTask(Number(el.dataset.id), el.value);
        } else if (ev.key === 'Escape') {
          actions.cancelEdit();
        }
      }
    },
    dblclick: {
      'start-edit': (el, ev, actions) =>
        actions.startEdit(Number(el.dataset.id))
    }
  };

  const UI = {
    actions: {},
    bound: false,

    // bind may run again with fresh actions; the document listeners
    // are attached once and always dispatch to the current actions.
    bind(actions) {
      UI.actions = actions;
      const doc = global.document;
      if (!doc || UI.bound) {
        return;
      }
      UI.bound = true;
      Object.entries(dispatchTable).forEach(([type, table]) => {
        doc.addEventListener(type, (ev) => {
          const el = ev.target.closest
            ? ev.target.closest('[data-action]')
            : null;
          const handle = el && table[el.dataset.action];
          if (handle) {
            handle(el, ev, UI.actions);
          }
        });
      });
    },

    render(vm) {
      const doc = global.document;
      if (!doc) {
        return;
      }
      renderTasks(doc, vm);
      renderListBar(doc, vm);
      renderArchived(doc, vm);
      renderFooter(doc, vm);
    }
  };

  function renderTasks(doc, vm) {
    const list = doc.getElementById('todo-list');
    if (!list) {
      return;
    }
    list.innerHTML = '';
    vm.tasks.forEach((t) => {
      const li = doc.createElement('li');
      li.dataset.id = t.id;
      if (t.done) {
        li.className = 'done';
      }
      if (vm.editingId === t.id) {
        const editInput = doc.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit';
        editInput.value = t.text;
        editInput.dataset.action = 'edit-task';
        editInput.dataset.id = t.id;
        li.appendChild(editInput);
      } else {
        const toggle = doc.createElement('input');
        toggle.type = 'checkbox';
        toggle.className = 'toggle';
        toggle.checked = t.done;
        toggle.dataset.action = 'toggle-task';
        toggle.dataset.id = t.id;
        const label = doc.createElement('label');
        label.textContent = t.text;
        label.dataset.action = 'start-edit';
        label.dataset.id = t.id;
        const destroy = doc.createElement('button');
        destroy.className = 'destroy';
        destroy.textContent = '×';
        destroy.dataset.action = 'destroy-task';
        destroy.dataset.id = t.id;
        li.appendChild(toggle);
        li.appendChild(label);
        li.appendChild(moveSelect(doc, t));
        li.appendChild(destroy);
      }
      list.appendChild(li);
    });
    const editing = list.querySelector('input.edit');
    if (editing) {
      editing.focus();
    }
  }

  function moveSelect(doc, t) {
    const move = doc.createElement('select');
    move.className = 'move';
    move.dataset.action = 'move-task';
    move.dataset.id = t.id;
    move.setAttribute('aria-label', 'Mover a otra lista');
    const placeholder = doc.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Mover a…';
    placeholder.disabled = true;
    placeholder.selected = true;
    move.appendChild(placeholder);
    t.moveTargets.forEach((l) => {
      const option = doc.createElement('option');
      option.value = l.id;
      option.textContent = l.name;
      move.appendChild(option);
    });
    return move;
  }

  function renderListBar(doc, vm) {
    const select = doc.getElementById('list-select');
    if (select) {
      select.innerHTML = '';
      vm.navigableLists.forEach((l) => {
        const option = doc.createElement('option');
        option.value = l.id;
        option.textContent = `${l.name} (${l.pendingCount})`;
        option.selected = l.id === vm.activeListId;
        select.appendChild(option);
      });
    }
    const inboxActive = vm.activeListId === INBOX.id;
    const renameButton = doc.getElementById('rename-list');
    if (renameButton) {
      renameButton.disabled = inboxActive;
    }
    const archiveButton = doc.getElementById('archive-list');
    if (archiveButton) {
      archiveButton.disabled = inboxActive;
    }
    const deleteButton = doc.getElementById('delete-list');
    if (deleteButton) {
      deleteButton.disabled = inboxActive;
    }
  }

  function renderArchived(doc, vm) {
    const archivedSection = doc.getElementById('archived-section');
    if (!archivedSection) {
      return;
    }
    const archived = vm.archivedLists;
    archivedSection.hidden = archived.length === 0;
    const summary = archivedSection.querySelector('summary');
    if (summary) {
      summary.textContent = `Archivadas (${archived.length})`;
    }
    const archivedItems = doc.getElementById('archived-list');
    if (archivedItems) {
      archivedItems.innerHTML = '';
      archived.forEach((l) => {
        const li = doc.createElement('li');
        const name = doc.createElement('span');
        name.textContent = `${l.name} (${l.pendingCount})`;
        const reactivate = doc.createElement('button');
        reactivate.className = 'reactivate';
        reactivate.textContent = 'Reactivar';
        reactivate.dataset.action = 'reactivate-list';
        reactivate.dataset.id = l.id;
        li.appendChild(name);
        li.appendChild(reactivate);
        archivedItems.appendChild(li);
      });
    }
  }

  function renderFooter(doc, vm) {
    const counter = doc.getElementById('todo-count');
    if (counter) {
      const n = vm.pendingCount;
      counter.textContent = `${n} pendiente${n === 1 ? '' : 's'}`;
    }
    const filterLinks = {
      all: doc.getElementById('filter-all'),
      active: doc.getElementById('filter-active'),
      completed: doc.getElementById('filter-completed')
    };
    FILTERS.forEach((name) => {
      const link = filterLinks[name];
      if (link) {
        link.classList.toggle('selected', name === vm.filter);
      }
    });
  }

  // View state: owned by the composition root, which decides when an
  // operation ends the editing session. The view only reads it
  // through the view-model.
  const viewState = { editingId: null };

  // Composition root: wires model, persistence and presentation,
  // and exposes the public API the page and the tests use.
  const App = {
    initialized: false,
    filter: 'all',
    activeListId: INBOX.id,

    load() {
      viewState.editingId = null;
      App.filter = Storage.loadFilter();
      taskList.load(Storage.loadTasks());
      // The stored active list is only valid once the model knows
      // which lists exist; anything else falls back to the inbox.
      const stored = Storage.loadActiveList();
      App.activeListId = taskList.lists()
        .some((list) => list.id === stored && !list.archived)
        ? stored
        : INBOX.id;
    },

    save() {
      Storage.saveTasks({
        lists: taskList.lists(),
        tasks: taskList.tasks()
      });
    },

    addTask(text) {
      return taskList.addTask(text, App.activeListId);
    },

    toggleTask(id) {
      return taskList.toggleTask(id);
    },

    editTask(id, newText) {
      if (!taskList.findTask(id)) {
        return null;
      }
      viewState.editingId = null;
      return taskList.editTask(id, newText);
    },

    deleteTask(id) {
      if (!taskList.findTask(id)) {
        return null;
      }
      if (viewState.editingId === id) {
        viewState.editingId = null;
      }
      return taskList.deleteTask(id);
    },

    startEdit(id) {
      if (!taskList.findTask(id)) {
        return;
      }
      viewState.editingId = id;
      App.render();
    },

    cancelEdit() {
      viewState.editingId = null;
      App.render();
    },

    pendingCount(listId = App.activeListId) {
      return taskList.pendingCount(listId);
    },

    visibleTasks() {
      return taskList.visibleTasks(App.filter, App.activeListId);
    },

    setActiveList(id) {
      if (!taskList.lists()
          .some((list) => list.id === id && !list.archived)) {
        return;
      }
      App.activeListId = id;
      viewState.editingId = null;
      Storage.saveActiveList(id);
      App.render();
    },

    setFilter(name) {
      if (!FILTERS.includes(name)) {
        return;
      }
      App.filter = name;
      Storage.saveFilter(name);
      App.render();
    },

    addList(name) {
      return taskList.addList(name);
    },

    renameList(id, name) {
      return taskList.renameList(id, name);
    },

    // The active list is corrected before deleting so that the
    // notification inside the model already renders the fallback.
    deleteList(id) {
      if (id === INBOX.id ||
          !taskList.lists().some((list) => list.id === id)) {
        return null;
      }
      if (App.activeListId === id) {
        App.activeListId = INBOX.id;
        Storage.saveActiveList(INBOX.id);
      }
      // A task being edited in a deleted list reappears in the
      // inbox; leaving edit mode keeps the view consistent.
      viewState.editingId = null;
      return taskList.deleteList(id);
    },

    moveTask(id, listId) {
      return taskList.moveTask(id, listId);
    },

    setTaskDate(id, date) {
      return taskList.setTaskDate(id, date);
    },

    clearTaskDate(id) {
      return taskList.clearTaskDate(id);
    },

    dateStatus(date, today) {
      return taskList.dateStatus(date, today);
    },

    // Same ordering as deleteList: the active list is corrected
    // before the model notifies, so the render is already right.
    archiveList(id) {
      if (id === INBOX.id ||
          !taskList.lists()
            .some((list) => list.id === id && !list.archived)) {
        return null;
      }
      if (App.activeListId === id) {
        App.activeListId = INBOX.id;
        Storage.saveActiveList(INBOX.id);
      }
      viewState.editingId = null;
      return taskList.archiveList(id);
    },

    unarchiveList(id) {
      return taskList.unarchiveList(id);
    },

    clearCompleted() {
      taskList.clearCompleted(App.activeListId);
    },

    reset() {
      taskList.reset();
      App.activeListId = INBOX.id;
    },

    // The view contract: the view-model carries every datum the
    // render needs as plain data — collections arrive already
    // projected, so the render never re-decides membership rules
    // the model defends — and the actions map declares the events
    // the view can dispatch. The view never sees this facade.
    viewModel() {
      const project = (list) => ({
        id: list.id,
        name: list.name,
        pendingCount: taskList.pendingCount(list.id)
      });
      const navigableLists = taskList.lists()
        .filter((list) => !list.archived)
        .map(project);
      const archivedLists = taskList.lists()
        .filter((list) => list.archived)
        .map(project);
      return {
        tasks: App.visibleTasks().map((t) => ({
          ...t,
          moveTargets: navigableLists
            .filter((l) => l.id !== t.listId)
            .map((l) => ({ id: l.id, name: l.name }))
        })),
        navigableLists,
        archivedLists,
        activeListId: App.activeListId,
        filter: App.filter,
        editingId: viewState.editingId,
        pendingCount: taskList.pendingCount(App.activeListId)
      };
    },

    actions: {
      addTask: (text) => App.addTask(text),
      toggleTask: (id) => App.toggleTask(id),
      startEdit: (id) => App.startEdit(id),
      cancelEdit: () => App.cancelEdit(),
      editTask: (id, text) => App.editTask(id, text),
      deleteTask: (id) => App.deleteTask(id),
      moveTask: (id, listId) => App.moveTask(id, listId),
      setActiveList: (id) => App.setActiveList(id),
      setFilter: (name) => App.setFilter(name),
      addList: (name) => App.addList(name),
      activeListName() {
        const current = App.lists
          .find((list) => list.id === App.activeListId);
        return current ? current.name : '';
      },
      renameActiveList: (name) => App.renameList(App.activeListId, name),
      archiveActiveList: () => App.archiveList(App.activeListId),
      deleteActiveList: () => App.deleteList(App.activeListId),
      unarchiveList: (id) => App.unarchiveList(id),
      clearCompleted: () => App.clearCompleted()
    },

    render() {
      UI.render(App.viewModel());
    },

    init() {
      if (App.initialized) {
        return;
      }
      App.initialized = true;
      App.load();
      UI.bind(App.actions);
      App.render();
    }
  };

  // The state lives in the components: the facade exposes it
  // read-only for tasks/nextId and delegates editingId to the
  // view state.
  Object.defineProperty(App, 'tasks', {
    get() {
      return taskList.tasks();
    }
  });
  Object.defineProperty(App, 'lists', {
    get() {
      return taskList.lists();
    }
  });
  Object.defineProperty(App, 'nextId', {
    get() {
      return taskList.nextId();
    }
  });
  Object.defineProperty(App, 'editingId', {
    get() {
      return viewState.editingId;
    },
    set(value) {
      viewState.editingId = value;
    }
  });

  taskList.subscribe(() => {
    App.save();
    App.render();
  });

  global.App = App;
  // The test harness renders UI with literal view-models.
  global.UI = UI;

  if (global.document) {
    global.document.addEventListener('DOMContentLoaded', App.init);
  }
})(typeof window !== 'undefined' ? window : this);
