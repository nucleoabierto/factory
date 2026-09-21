(function (global) {
  'use strict';

  var STORAGE_KEY = 'todoapp-tasks';

  var App = {
    tasks: [],
    nextId: 1,
    initialized: false,

    load: function () {
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
          li.textContent = t.text;
          li.dataset.id = t.id;
          list.appendChild(li);
        });
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
