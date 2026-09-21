(function (global) {
  'use strict';

  var STORAGE_KEY = 'todoapp-tasks';

  var App = {
    tasks: [],
    nextId: 1,
    initialized: false,
    editingId: null,

    load: function () {
      App.editingId = null;
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

    render: function () {
      var doc = global.document;
      if (!doc) {
        return;
      }
      var list = doc.getElementById('todo-list');
      if (list) {
        list.innerHTML = '';
        App.tasks.forEach(function (t) {
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
      }
      App.render();
    }
  };

  global.App = App;

  if (global.document) {
    global.document.addEventListener('DOMContentLoaded', App.init);
  }
})(typeof window !== 'undefined' ? window : this);
