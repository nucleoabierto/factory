(function (global) {
  'use strict';

  var STORAGE_KEY = 'todoapp-tasks';
  var FILTER_KEY = 'todoapp-filter';
  var FILTERS = ['all', 'active', 'completed'];

  var App = {
    tasks: [],
    nextId: 1,
    initialized: false,
    editingId: null,
    filter: 'all',

    load: function () {
      App.editingId = null;
      var storedFilter;
      try {
        storedFilter = global.localStorage.getItem(FILTER_KEY);
      } catch (e) {
        storedFilter = null;
      }
      App.filter = FILTERS.indexOf(storedFilter) !== -1 ? storedFilter : 'all';
      var raw;
      try {
        raw = global.localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        raw = null;
      }
      if (!raw) {
        App.tasks = [];
        App.nextId = 1;
        return;
      }
      try {
        var data = JSON.parse(raw);
        if (!Array.isArray(data)) {
          throw new Error('unexpected format');
        }
        App.tasks = data;
        App.nextId = data.reduce(function (max, t) {
          return Math.max(max, t.id || 0);
        }, 0) + 1;
      } catch (e) {
        App.tasks = [];
        App.nextId = 1;
      }
    },

    save: function () {
      try {
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(App.tasks));
      } catch (e) {
        // Persistence unavailable: the app keeps working in memory.
      }
    },

    findTask: function (id) {
      return App.tasks.filter(function (t) { return t.id === id; })[0] || null;
    },

    addTask: function (text) {
      var clean = (text || '').trim();
      if (!clean) {
        return null;
      }
      var task = { id: App.nextId++, text: clean, done: false };
      App.tasks.push(task);
      App.save();
      App.render();
      return task;
    },

    toggleTask: function (id) {
      var task = App.findTask(id);
      if (!task) {
        return null;
      }
      task.done = !task.done;
      App.save();
      App.render();
      return task;
    },

    editTask: function (id, newText) {
      var task = App.findTask(id);
      if (!task) {
        return null;
      }
      var clean = (newText || '').trim();
      App.editingId = null;
      if (!clean) {
        return App.deleteTask(id);
      }
      task.text = clean;
      App.save();
      App.render();
      return task;
    },

    deleteTask: function (id) {
      var task = App.findTask(id);
      if (!task) {
        return null;
      }
      App.tasks = App.tasks.filter(function (t) { return t.id !== id; });
      if (App.editingId === id) {
        App.editingId = null;
      }
      App.save();
      App.render();
      return task;
    },

    startEdit: function (id) {
      if (!App.findTask(id)) {
        return;
      }
      App.editingId = id;
      App.render();
    },

    cancelEdit: function () {
      App.editingId = null;
      App.render();
    },

    pendingCount: function () {
      return App.tasks.filter(function (t) { return !t.done; }).length;
    },

    visibleTasks: function () {
      if (App.filter === 'active') {
        return App.tasks.filter(function (t) { return !t.done; });
      }
      if (App.filter === 'completed') {
        return App.tasks.filter(function (t) { return t.done; });
      }
      return App.tasks;
    },

    setFilter: function (name) {
      if (FILTERS.indexOf(name) === -1) {
        return;
      }
      App.filter = name;
      try {
        global.localStorage.setItem(FILTER_KEY, name);
      } catch (e) {
        // Persistence unavailable: the filter still applies in memory.
      }
      App.render();
    },

    clearCompleted: function () {
      App.tasks = App.tasks.filter(function (t) { return !t.done; });
      App.save();
      App.render();
    },

    render: function () {
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
          if (App.editingId === t.id) {
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

    init: function () {
      if (App.initialized) {
        return;
      }
      App.initialized = true;
      App.load();
      var doc = global.document;
      if (doc) {
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
      App.render();
    }
  };

  global.App = App;

  if (global.document) {
    global.document.addEventListener('DOMContentLoaded', App.init);
  }
})(typeof window !== 'undefined' ? window : this);
