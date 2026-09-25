((global) => {
  'use strict';

  const STORAGE_KEY = 'todoapp-tasks';
  const FILTER_KEY = 'todoapp-filter';
  const ACTIVE_LIST_KEY = 'todoapp-active-list';
  const FILTERS = ['all', 'active', 'completed'];
  const INBOX = { id: 'inbox', name: 'Entrada' };

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
          this.#lists.push(...unique);
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
      const list = { id, name: clean };
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

    moveTask(id, listId) {
      const task = this.#find(id);
      if (!task || !this.#lists.some((list) => list.id === listId)) {
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

  // Presentation: DOM rendering and event wiring. It reads the
  // model through the App facade and calls its operations.
  const UI = {
    editingId: null,

    render(App) {
      const doc = global.document;
      if (!doc) {
        return;
      }
      const list = doc.getElementById('todo-list');
      if (list) {
        list.innerHTML = '';
        App.visibleTasks().forEach((t) => {
          const li = doc.createElement('li');
          li.dataset.id = t.id;
          if (t.done) {
            li.className = 'done';
          }
          if (UI.editingId === t.id) {
            const editInput = doc.createElement('input');
            editInput.type = 'text';
            editInput.className = 'edit';
            editInput.value = t.text;
            editInput.addEventListener('keydown', (ev) => {
              if (ev.key === 'Enter') {
                App.editTask(t.id, editInput.value);
              } else if (ev.key === 'Escape') {
                App.cancelEdit();
              }
            });
            li.appendChild(editInput);
          } else {
            const toggle = doc.createElement('input');
            toggle.type = 'checkbox';
            toggle.className = 'toggle';
            toggle.checked = t.done;
            toggle.addEventListener('change', () => {
              App.toggleTask(t.id);
            });
            const label = doc.createElement('label');
            label.textContent = t.text;
            label.addEventListener('dblclick', () => {
              App.startEdit(t.id);
            });
            const destroy = doc.createElement('button');
            destroy.className = 'destroy';
            destroy.textContent = '×';
            destroy.addEventListener('click', () => {
              App.deleteTask(t.id);
            });
            li.appendChild(toggle);
            li.appendChild(label);
            const move = doc.createElement('select');
            move.className = 'move';
            move.setAttribute('aria-label', 'Mover a otra lista');
            const placeholder = doc.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Mover a…';
            placeholder.disabled = true;
            placeholder.selected = true;
            move.appendChild(placeholder);
            App.lists.forEach((l) => {
              if (l.id !== t.listId) {
                const option = doc.createElement('option');
                option.value = l.id;
                option.textContent = l.name;
                move.appendChild(option);
              }
            });
            move.addEventListener('change', () => {
              App.moveTask(t.id, move.value);
            });
            li.appendChild(move);
            li.appendChild(destroy);
          }
          list.appendChild(li);
        });
        const editing = list.querySelector('input.edit');
        if (editing) {
          editing.focus();
        }
      }
      const select = doc.getElementById('list-select');
      if (select) {
        select.innerHTML = '';
        App.lists.forEach((l) => {
          const option = doc.createElement('option');
          option.value = l.id;
          option.textContent = `${l.name} (${App.pendingCount(l.id)})`;
          option.selected = l.id === App.activeListId;
          select.appendChild(option);
        });
      }
      const inboxActive = App.activeListId === INBOX.id;
      const renameButton = doc.getElementById('rename-list');
      if (renameButton) {
        renameButton.disabled = inboxActive;
      }
      const deleteButton = doc.getElementById('delete-list');
      if (deleteButton) {
        deleteButton.disabled = inboxActive;
      }
      const counter = doc.getElementById('todo-count');
      if (counter) {
        const n = App.pendingCount();
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
          link.classList.toggle('selected', name === App.filter);
        }
      });
    },

    bindEvents(App) {
      const doc = global.document;
      if (!doc) {
        return;
      }
      const select = doc.getElementById('list-select');
      if (select) {
        select.addEventListener('change', () => {
          App.setActiveList(select.value);
        });
      }
      const addButton = doc.getElementById('add-list');
      if (addButton) {
        addButton.addEventListener('click', () => {
          const name = global.prompt('Nombre de la lista');
          if (name !== null) {
            App.addList(name);
          }
        });
      }
      const renameButton = doc.getElementById('rename-list');
      if (renameButton) {
        renameButton.addEventListener('click', () => {
          const current = App.lists
            .find((list) => list.id === App.activeListId);
          const name = global.prompt('Nuevo nombre de la lista',
            current ? current.name : '');
          if (name !== null) {
            App.renameList(App.activeListId, name);
          }
        });
      }
      const deleteButton = doc.getElementById('delete-list');
      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
          App.deleteList(App.activeListId);
        });
      }
      const input = doc.getElementById('new-todo');
      if (input) {
        input.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter' && App.addTask(input.value)) {
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
            App.setFilter(name);
          });
        }
      });
      const clearButton = doc.getElementById('clear-completed');
      if (clearButton) {
        clearButton.addEventListener('click', () => {
          App.clearCompleted();
        });
      }
    }
  };

  // Composition root: wires model, persistence and presentation,
  // and exposes the public API the page and the tests use.
  const App = {
    initialized: false,
    filter: 'all',
    activeListId: INBOX.id,

    load() {
      UI.editingId = null;
      App.filter = Storage.loadFilter();
      taskList.load(Storage.loadTasks());
      // The stored active list is only valid once the model knows
      // which lists exist; anything else falls back to the inbox.
      const stored = Storage.loadActiveList();
      App.activeListId = taskList.lists().some((list) => list.id === stored)
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
      UI.editingId = null;
      return taskList.editTask(id, newText);
    },

    deleteTask(id) {
      if (!taskList.findTask(id)) {
        return null;
      }
      if (UI.editingId === id) {
        UI.editingId = null;
      }
      return taskList.deleteTask(id);
    },

    startEdit(id) {
      if (!taskList.findTask(id)) {
        return;
      }
      UI.editingId = id;
      App.render();
    },

    cancelEdit() {
      UI.editingId = null;
      App.render();
    },

    pendingCount(listId = App.activeListId) {
      return taskList.pendingCount(listId);
    },

    visibleTasks() {
      return taskList.visibleTasks(App.filter, App.activeListId);
    },

    setActiveList(id) {
      if (!taskList.lists().some((list) => list.id === id)) {
        return;
      }
      App.activeListId = id;
      UI.editingId = null;
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
      UI.editingId = null;
      return taskList.deleteList(id);
    },

    moveTask(id, listId) {
      return taskList.moveTask(id, listId);
    },

    clearCompleted() {
      taskList.clearCompleted(App.activeListId);
    },

    reset() {
      taskList.reset();
      App.activeListId = INBOX.id;
    },

    render() {
      UI.render(App);
    },

    init() {
      if (App.initialized) {
        return;
      }
      App.initialized = true;
      App.load();
      UI.bindEvents(App);
      App.render();
    }
  };

  // The state lives in the components: the facade exposes it
  // read-only for tasks/nextId and delegates editingId to the UI.
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
      return UI.editingId;
    },
    set(value) {
      UI.editingId = value;
    }
  });

  taskList.subscribe(() => {
    App.save();
    App.render();
  });

  global.App = App;

  if (global.document) {
    global.document.addEventListener('DOMContentLoaded', App.init);
  }
})(typeof window !== 'undefined' ? window : this);
