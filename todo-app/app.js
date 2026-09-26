((global) => {
  'use strict';

  const STORAGE_KEY = 'todoapp-tasks';
  const FILTER_KEY = 'todoapp-filter';
  const ACTIVE_LIST_KEY = 'todoapp-active-list';
  const FILTERS = ['all', 'active', 'completed'];
  const INBOX = { id: 'inbox', name: 'Entrada', archived: false };

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
        listId: task.listId };
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
      this.#tasks = tasks
        .filter(this.isValidTask)
        .filter((t) => !('listId' in t) || known.has(t.listId))
        .map((t) => ({ id: t.id, text: t.text, done: t.done,
          listId: 'listId' in t ? t.listId : INBOX.id }));
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
      const task = { id: this.#nextId++, text: clean, done: false, listId };
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
  const UI = {
    actions: {},

    bind(actions) {
      UI.actions = actions;
      const doc = global.document;
      if (!doc) {
        return;
      }
      const select = doc.getElementById('list-select');
      if (select) {
        select.addEventListener('change', () => {
          actions.setActiveList(select.value);
        });
      }
      const addButton = doc.getElementById('add-list');
      if (addButton) {
        addButton.addEventListener('click', () => {
          const name = global.prompt('Nombre de la lista');
          if (name !== null) {
            actions.addList(name);
          }
        });
      }
      const renameButton = doc.getElementById('rename-list');
      if (renameButton) {
        renameButton.addEventListener('click', () => {
          const name = global.prompt('Nuevo nombre de la lista',
            actions.activeListName());
          if (name !== null) {
            actions.renameActiveList(name);
          }
        });
      }
      const archiveButton = doc.getElementById('archive-list');
      if (archiveButton) {
        archiveButton.addEventListener('click', () => {
          actions.archiveActiveList();
        });
      }
      const deleteButton = doc.getElementById('delete-list');
      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
          actions.deleteActiveList();
        });
      }
      const input = doc.getElementById('new-todo');
      if (input) {
        input.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter' && actions.addTask(input.value)) {
            input.value = '';
          }
        });
      }
      const filterClicks = {
        'filter-all': 'all',
        'filter-active': 'active',
        'filter-completed': 'completed'
      };
      Object.entries(filterClicks).forEach(([id, name]) => {
        const link = doc.getElementById(id);
        if (link) {
          link.addEventListener('click', (ev) => {
            ev.preventDefault();
            actions.setFilter(name);
          });
        }
      });
      const clearButton = doc.getElementById('clear-completed');
      if (clearButton) {
        clearButton.addEventListener('click', () => {
          actions.clearCompleted();
        });
      }
    },

    render(vm) {
      const doc = global.document;
      if (!doc) {
        return;
      }
      renderTasks(doc, vm, UI.actions);
      renderListBar(doc, vm);
      renderArchived(doc, vm, UI.actions);
      renderFooter(doc, vm);
    }
  };

  function renderTasks(doc, vm, actions) {
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
        editInput.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter') {
            actions.editTask(t.id, editInput.value);
          } else if (ev.key === 'Escape') {
            actions.cancelEdit();
          }
        });
        li.appendChild(editInput);
      } else {
        const toggle = doc.createElement('input');
        toggle.type = 'checkbox';
        toggle.className = 'toggle';
        toggle.checked = t.done;
        toggle.addEventListener('change', () => {
          actions.toggleTask(t.id);
        });
        const label = doc.createElement('label');
        label.textContent = t.text;
        label.addEventListener('dblclick', () => {
          actions.startEdit(t.id);
        });
        const destroy = doc.createElement('button');
        destroy.className = 'destroy';
        destroy.textContent = '×';
        destroy.addEventListener('click', () => {
          actions.deleteTask(t.id);
        });
        li.appendChild(toggle);
        li.appendChild(label);
        li.appendChild(moveSelect(doc, t, vm, actions));
        li.appendChild(destroy);
      }
      list.appendChild(li);
    });
    const editing = list.querySelector('input.edit');
    if (editing) {
      editing.focus();
    }
  }

  function moveSelect(doc, t, vm, actions) {
    const move = doc.createElement('select');
    move.className = 'move';
    move.setAttribute('aria-label', 'Mover a otra lista');
    const placeholder = doc.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Mover a…';
    placeholder.disabled = true;
    placeholder.selected = true;
    move.appendChild(placeholder);
    vm.lists.forEach((l) => {
      if (l.id !== t.listId && !l.archived) {
        const option = doc.createElement('option');
        option.value = l.id;
        option.textContent = l.name;
        move.appendChild(option);
      }
    });
    move.addEventListener('change', () => {
      actions.moveTask(t.id, move.value);
    });
    return move;
  }

  function renderListBar(doc, vm) {
    const select = doc.getElementById('list-select');
    if (select) {
      select.innerHTML = '';
      vm.lists.forEach((l) => {
        if (l.archived) {
          return;
        }
        const option = doc.createElement('option');
        option.value = l.id;
        option.textContent = `${l.name} (${vm.pendingCount(l.id)})`;
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

  function renderArchived(doc, vm, actions) {
    const archivedSection = doc.getElementById('archived-section');
    if (!archivedSection) {
      return;
    }
    const archived = vm.lists.filter((l) => l.archived);
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
        name.textContent = `${l.name} (${vm.pendingCount(l.id)})`;
        const reactivate = doc.createElement('button');
        reactivate.className = 'reactivate';
        reactivate.textContent = 'Reactivar';
        reactivate.addEventListener('click', () => {
          actions.unarchiveList(l.id);
        });
        li.appendChild(name);
        li.appendChild(reactivate);
        archivedItems.appendChild(li);
      });
    }
  }

  function renderFooter(doc, vm) {
    const counter = doc.getElementById('todo-count');
    if (counter) {
      const n = vm.pendingCount();
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
    // render needs, and the actions map declares the events the
    // view can dispatch. The view never sees this facade.
    viewModel() {
      return {
        tasks: App.visibleTasks(),
        lists: taskList.lists(),
        activeListId: App.activeListId,
        filter: App.filter,
        editingId: viewState.editingId,
        pendingCount(listId) {
          return taskList.pendingCount(listId || App.activeListId);
        }
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
