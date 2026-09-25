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
        App.lists.forEach((list) => {
          const option = doc.createElement('option');
          option.value = list.id;
          option.textContent = `${list.name} (${App.pendingCount(list.id)})`;
          option.selected = list.id === App.activeListId;
          select.appendChild(option);
        });
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
