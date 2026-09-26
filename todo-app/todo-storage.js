((global) => {
  'use strict';

  const { STORAGE_KEY, FILTER_KEY, ACTIVE_LIST_KEY, VIEW_KEY,
    FILTERS, VIEWS } = global.Todo;

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

    loadView() {
      let stored;
      try {
        stored = global.localStorage.getItem(VIEW_KEY);
      } catch (e) {
        stored = null;
      }
      return VIEWS.includes(stored) ? stored : 'main';
    },

    saveView(name) {
      try {
        global.localStorage.setItem(VIEW_KEY, name);
      } catch (e) {
        // Persistence unavailable: the view still applies in memory.
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

  global.Todo.Storage = Storage;
})(typeof window !== 'undefined' ? window : this);
