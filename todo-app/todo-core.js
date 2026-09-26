((global) => {
  'use strict';

  // Shared namespace: the layers publish here what the other layers
  // need. Classic scripts keep the app working over file://, where
  // ES modules do not load.
  const Todo = global.Todo || (global.Todo = {});

  Todo.STORAGE_KEY = 'todoapp-tasks';
  Todo.FILTER_KEY = 'todoapp-filter';
  Todo.ACTIVE_LIST_KEY = 'todoapp-active-list';
  Todo.VIEW_KEY = 'todoapp-view';
  Todo.FILTERS = ['all', 'active', 'completed'];
  Todo.VIEWS = ['main', 'today'];
  Todo.RECURS = ['weekly', 'monthly'];
  Todo.INBOX = { id: 'inbox', name: 'Entrada', archived: false };

  // Task dates are calendar days as ISO strings ('YYYY-MM-DD'):
  // comparing them as strings orders like dates, so classification
  // needs no Date arithmetic and the reference day is injectable.
  Todo.currentDay = function currentDay() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}` +
      `-${pad(now.getDate())}`;
  };

  // A valid date is a real calendar day, not just a matching shape:
  // '2026-02-30' parses but does not exist.
  Todo.isValidDate = function isValidDate(candidate) {
    if (typeof candidate !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(candidate)) {
      return false;
    }
    const [year, month, day] = candidate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 &&
      date.getDate() === day;
  };
})(typeof window !== 'undefined' ? window : this);
