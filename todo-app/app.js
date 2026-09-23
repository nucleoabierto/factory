(function (global) {
  'use strict';

  var STORAGE_KEY = 'todoapp-tasks';
  var FILTER_KEY = 'todoapp-filter';
  var FILTERS = ['all', 'active', 'completed'];

  // Domain model: the task list, its invariants and its operations.
  // It knows nothing about localStorage or the DOM; it notifies
  // subscribers when the state changes. The state is private and
  // only mutates through the operations below.
  class TaskList {
    #tasks = [];
    #nextId = 1;
    #listeners = [];

    subscribe(fn) {
      this.#listeners.push(fn);
    }

    #notify() {
      this.#listeners.forEach(function (fn) {
        fn();
      });
    }

    // Resets the state without notifying subscribers.
    reset() {
      this.#tasks = [];
      this.#nextId = 1;
    }

    // Public reads return copies: the private state (and each
    // task object in it) can only change through the operations.
    #snapshot(task) {
      return { id: task.id, text: task.text, done: task.done };
    }

    tasks() {
      return this.#tasks.map(this.#snapshot);
    }

    nextId() {
      return this.#nextId;
    }

    isValidTask(candidate) {
      return !!candidate &&
        typeof candidate.id === 'number' && isFinite(candidate.id) &&
        typeof candidate.text === 'string' && candidate.text.trim() !== '' &&
        typeof candidate.done === 'boolean';
    }

    load(data) {
      this.#tasks = data.filter(this.isValidTask);
      this.#nextId = this.#tasks.reduce(function (max, t) {
        return Math.max(max, t.id);
      }, 0) + 1;
    }

    findTask(id) {
      var task = this.#find(id);
      return task ? this.#snapshot(task) : null;
    }

    #find(id) {
      return this.#tasks.filter(function (t) { return t.id === id; })[0] || null;
    }

    addTask(text) {
      var clean = (text || '').trim();
      if (!clean) {
        return null;
      }
      var task = { id: this.#nextId++, text: clean, done: false };
      this.#tasks.push(task);
      this.#notify();
      return this.#snapshot(task);
    }

    toggleTask(id) {
      var task = this.#find(id);
      if (!task) {
        return null;
      }
      task.done = !task.done;
      this.#notify();
      return this.#snapshot(task);
    }

    editTask(id, newText) {
      var task = this.#find(id);
      if (!task) {
        return null;
      }
      var clean = (newText || '').trim();
      if (!clean) {
        return this.deleteTask(id);
      }
      task.text = clean;
      this.#notify();
      return this.#snapshot(task);
    }

    deleteTask(id) {
      var task = this.#find(id);
      if (!task) {
        return null;
      }
      this.#tasks = this.#tasks.filter(function (t) { return t.id !== id; });
      this.#notify();
      return this.#snapshot(task);
    }

    pendingCount() {
      return this.#tasks.filter(function (t) { return !t.done; }).length;
    }

    visibleTasks(filter) {
      if (filter === 'active') {
        return this.#tasks.filter(function (t) { return !t.done; })
          .map(this.#snapshot);
      }
      if (filter === 'completed') {
        return this.#tasks.filter(function (t) { return t.done; })
          .map(this.#snapshot);
      }
      return this.tasks();
    }

    clearCompleted() {
      this.#tasks = this.#tasks.filter(function (t) { return !t.done; });
      this.#notify();
    }
  }

  var taskList = new TaskList();

  // Infrastructure: persistence in localStorage, tolerant of
  // missing or corrupted data. It moves data in and out; it does
  // not know the model or the DOM.
  var Storage = {
    loadTasks: function () {
      var raw;
      try {
        raw = global.localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        return [];
      }
      if (!raw) {
        return [];
      }
      try {
        var data = JSON.parse(raw);
        if (!Array.isArray(data)) {
          throw new Error('unexpected format');
        }
        return data;
      } catch (e) {
        return [];
      }
    },

    saveTasks: function (tasks) {
      try {
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        // Persistence unavailable: the app keeps working in memory.
      }
    },

    loadFilter: function () {
      var stored;
      try {
        stored = global.localStorage.getItem(FILTER_KEY);
      } catch (e) {
        stored = null;
      }
      return FILTERS.indexOf(stored) !== -1 ? stored : 'all';
    },

    saveFilter: function (name) {
      try {
        global.localStorage.setItem(FILTER_KEY, name);
      } catch (e) {
        // Persistence unavailable: the filter still applies in memory.
      }
    }
  };

  // Presentation: DOM rendering and event wiring. It reads the
  // model through the App facade and calls its operations.
  var UI = {
    editingId: null,

    render: function (App) {
      var doc = global.document;
      if (!doc) {
        return;
      }
      var list = doc.getElementById('todo-list');
      if (list) {
        list.innerHTML = '';
        App.visibleTasks().forEach(function (t) {
          var li = doc.createElement('li');
          li.dataset.id = t.id;
          if (t.done) {
            li.className = 'done';
          }
          if (UI.editingId === t.id) {
            var editInput = doc.createElement('input');
            editInput.type = 'text';
            editInput.className = 'edit';
            editInput.value = t.text;
            editInput.addEventListener('keydown', function (ev) {
              if (ev.key === 'Enter') {
                App.editTask(t.id, editInput.value);
              } else if (ev.key === 'Escape') {
                App.cancelEdit();
              }
            });
            li.appendChild(editInput);
          } else {
            var toggle = doc.createElement('input');
            toggle.type = 'checkbox';
            toggle.className = 'toggle';
            toggle.checked = t.done;
            toggle.addEventListener('change', function () {
              App.toggleTask(t.id);
            });
            var label = doc.createElement('label');
            label.textContent = t.text;
            label.addEventListener('dblclick', function () {
              App.startEdit(t.id);
            });
            var destroy = doc.createElement('button');
            destroy.className = 'destroy';
            destroy.textContent = '×';
            destroy.addEventListener('click', function () {
              App.deleteTask(t.id);
            });
            li.appendChild(toggle);
            li.appendChild(label);
            li.appendChild(destroy);
          }
          list.appendChild(li);
        });
        var editing = list.querySelector('input.edit');
        if (editing) {
          editing.focus();
        }
      }
      var counter = doc.getElementById('todo-count');
      if (counter) {
        var n = App.pendingCount();
        counter.textContent = n + (n === 1 ? ' pendiente' : ' pendientes');
      }
      var filterLinks = {
        all: doc.getElementById('filter-all'),
        active: doc.getElementById('filter-active'),
        completed: doc.getElementById('filter-completed')
      };
      FILTERS.forEach(function (name) {
        var link = filterLinks[name];
        if (link) {
          if (name === App.filter) {
            link.classList.add('selected');
          } else {
            link.classList.remove('selected');
          }
        }
      });
    },

    bindEvents: function (App) {
      var doc = global.document;
      if (!doc) {
        return;
      }
      var input = doc.getElementById('new-todo');
      if (input) {
        input.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter') {
            if (App.addTask(input.value)) {
              input.value = '';
            }
          }
        });
      }
      var filterClicks = {
        'filter-all': 'all',
        'filter-active': 'active',
        'filter-completed': 'completed'
      };
      Object.keys(filterClicks).forEach(function (id) {
        var link = doc.getElementById(id);
        if (link) {
          link.addEventListener('click', function (ev) {
            ev.preventDefault();
            App.setFilter(filterClicks[id]);
          });
        }
      });
      var clearButton = doc.getElementById('clear-completed');
      if (clearButton) {
        clearButton.addEventListener('click', function () {
          App.clearCompleted();
        });
      }
    }
  };

  // Composition root: wires model, persistence and presentation,
  // and exposes the public API the page and the tests use.
  var App = {
    initialized: false,
    filter: 'all',

    load: function () {
      UI.editingId = null;
      App.filter = Storage.loadFilter();
      taskList.load(Storage.loadTasks());
    },

    save: function () {
      Storage.saveTasks(taskList.tasks());
    },

    addTask: function (text) {
      return taskList.addTask(text);
    },

    toggleTask: function (id) {
      return taskList.toggleTask(id);
    },

    editTask: function (id, newText) {
      if (!taskList.findTask(id)) {
        return null;
      }
      UI.editingId = null;
      return taskList.editTask(id, newText);
    },

    deleteTask: function (id) {
      if (!taskList.findTask(id)) {
        return null;
      }
      if (UI.editingId === id) {
        UI.editingId = null;
      }
      return taskList.deleteTask(id);
    },

    startEdit: function (id) {
      if (!taskList.findTask(id)) {
        return;
      }
      UI.editingId = id;
      App.render();
    },

    cancelEdit: function () {
      UI.editingId = null;
      App.render();
    },

    pendingCount: function () {
      return taskList.pendingCount();
    },

    visibleTasks: function () {
      return taskList.visibleTasks(App.filter);
    },

    setFilter: function (name) {
      if (FILTERS.indexOf(name) === -1) {
        return;
      }
      App.filter = name;
      Storage.saveFilter(name);
      App.render();
    },

    clearCompleted: function () {
      taskList.clearCompleted();
    },

    reset: function () {
      taskList.reset();
    },

    render: function () {
      UI.render(App);
    },

    init: function () {
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
    get: function () { return taskList.tasks(); }
  });
  Object.defineProperty(App, 'nextId', {
    get: function () { return taskList.nextId(); }
  });
  Object.defineProperty(App, 'editingId', {
    get: function () { return UI.editingId; },
    set: function (value) { UI.editingId = value; }
  });

  taskList.subscribe(function () {
    App.save();
    App.render();
  });

  global.App = App;

  if (global.document) {
    global.document.addEventListener('DOMContentLoaded', App.init);
  }
})(typeof window !== 'undefined' ? window : this);
