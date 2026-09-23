(function (global) {
  'use strict';

  var STORAGE_KEY = 'todoapp-tasks';
  var FILTER_KEY = 'todoapp-filter';
  var FILTERS = ['all', 'active', 'completed'];

  // Domain model: the task list, its invariants and its operations.
  // It knows nothing about localStorage or the DOM; it notifies
  // subscribers when the state changes.
  var TaskList = {
    tasks: [],
    nextId: 1,
    listeners: [],

    subscribe: function (fn) {
      TaskList.listeners.push(fn);
    },

    notify: function () {
      TaskList.listeners.forEach(function (fn) {
        fn();
      });
    },

    load: function (data) {
      TaskList.tasks = data;
      TaskList.nextId = data.reduce(function (max, t) {
        return Math.max(max, t.id || 0);
      }, 0) + 1;
    },

    findTask: function (id) {
      return TaskList.tasks.filter(function (t) { return t.id === id; })[0] || null;
    },

    addTask: function (text) {
      var clean = (text || '').trim();
      if (!clean) {
        return null;
      }
      var task = { id: TaskList.nextId++, text: clean, done: false };
      TaskList.tasks.push(task);
      TaskList.notify();
      return task;
    },

    toggleTask: function (id) {
      var task = TaskList.findTask(id);
      if (!task) {
        return null;
      }
      task.done = !task.done;
      TaskList.notify();
      return task;
    },

    editTask: function (id, newText) {
      var task = TaskList.findTask(id);
      if (!task) {
        return null;
      }
      var clean = (newText || '').trim();
      if (!clean) {
        return TaskList.deleteTask(id);
      }
      task.text = clean;
      TaskList.notify();
      return task;
    },

    deleteTask: function (id) {
      var task = TaskList.findTask(id);
      if (!task) {
        return null;
      }
      TaskList.tasks = TaskList.tasks.filter(function (t) { return t.id !== id; });
      TaskList.notify();
      return task;
    },

    pendingCount: function () {
      return TaskList.tasks.filter(function (t) { return !t.done; }).length;
    },

    visibleTasks: function (filter) {
      if (filter === 'active') {
        return TaskList.tasks.filter(function (t) { return !t.done; });
      }
      if (filter === 'completed') {
        return TaskList.tasks.filter(function (t) { return t.done; });
      }
      return TaskList.tasks;
    },

    clearCompleted: function () {
      TaskList.tasks = TaskList.tasks.filter(function (t) { return !t.done; });
      TaskList.notify();
    }
  };

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
      TaskList.load(Storage.loadTasks());
    },

    save: function () {
      Storage.saveTasks(TaskList.tasks);
    },

    addTask: function (text) {
      return TaskList.addTask(text);
    },

    toggleTask: function (id) {
      return TaskList.toggleTask(id);
    },

    editTask: function (id, newText) {
      if (!TaskList.findTask(id)) {
        return null;
      }
      UI.editingId = null;
      return TaskList.editTask(id, newText);
    },

    deleteTask: function (id) {
      if (!TaskList.findTask(id)) {
        return null;
      }
      if (UI.editingId === id) {
        UI.editingId = null;
      }
      return TaskList.deleteTask(id);
    },

    startEdit: function (id) {
      if (!TaskList.findTask(id)) {
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
      return TaskList.pendingCount();
    },

    visibleTasks: function () {
      return TaskList.visibleTasks(App.filter);
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
      TaskList.clearCompleted();
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

  // The state fields live in the components; the facade delegates
  // so existing callers keep working unchanged.
  Object.defineProperty(App, 'tasks', {
    get: function () { return TaskList.tasks; },
    set: function (value) { TaskList.tasks = value; }
  });
  Object.defineProperty(App, 'nextId', {
    get: function () { return TaskList.nextId; },
    set: function (value) { TaskList.nextId = value; }
  });
  Object.defineProperty(App, 'editingId', {
    get: function () { return UI.editingId; },
    set: function (value) { UI.editingId = value; }
  });

  TaskList.subscribe(function () {
    App.save();
    App.render();
  });

  global.App = App;
  global.TaskList = TaskList;

  if (global.document) {
    global.document.addEventListener('DOMContentLoaded', App.init);
  }
})(typeof window !== 'undefined' ? window : this);
