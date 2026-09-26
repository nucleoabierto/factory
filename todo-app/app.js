((global) => {
  'use strict';

  const { INBOX, FILTERS, VIEWS, TaskList, Storage } = global.Todo;
  const UI = global.UI;

  // Composition root: wires model, persistence and presentation,
  // and exposes the public API the page and the tests use.
  const taskList = new TaskList();

  // View state: owned by the composition root, which decides when an
  // operation ends the editing session. The view only reads it
  // through the view-model.
  const viewState = { editingId: null };

  const App = {
    initialized: false,
    filter: 'all',
    view: 'main',
    activeListId: INBOX.id,

    load() {
      viewState.editingId = null;
      App.filter = Storage.loadFilter();
      App.view = Storage.loadView();
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
      return taskList.pendingCount(listId, App.view);
    },

    visibleTasks() {
      return taskList
        .visibleTasks(App.filter, App.activeListId, App.view);
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

    setView(name) {
      if (!VIEWS.includes(name)) {
        return;
      }
      App.view = name;
      viewState.editingId = null;
      Storage.saveView(name);
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

    clearCompleted(today) {
      taskList.clearCompleted(App.activeListId, App.view, today);
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
          dateStatus: taskList.dateStatus(t.date),
          moveTargets: navigableLists
            .filter((l) => l.id !== t.listId)
            .map((l) => ({ id: l.id, name: l.name }))
        })),
        navigableLists,
        archivedLists,
        activeListId: App.activeListId,
        filter: App.filter,
        view: App.view,
        editingId: viewState.editingId,
        pendingCount: taskList
          .pendingCount(App.activeListId, App.view)
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
      setTaskDate: (id, date) => App.setTaskDate(id, date),
      clearTaskDate: (id) => App.clearTaskDate(id),
      setActiveList: (id) => App.setActiveList(id),
      setFilter: (name) => App.setFilter(name),
      setView: (name) => App.setView(name),
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

  if (global.document) {
    global.document.addEventListener('DOMContentLoaded', App.init);
  }
})(typeof window !== 'undefined' ? window : this);
