// Shared harness for the QUnit suite: each module gets the same
// clean App state and a fresh fixture, and DOM helpers live here
// once instead of being redefined per module. Classic script —
// the suite must keep running over file:// without a build.
const TestKit = {
  STORAGE_KEYS: [
    'todoapp-tasks',
    'todoapp-filter',
    'todoapp-active-list',
    'todoapp-view'
  ],

  resetApp() {
    TestKit.STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    window.App.reset();
    window.App.initialized = false;
    window.App.editingId = null;
    window.App.filter = 'all';
    window.App.view = 'main';
  },

  fixture(html) {
    document.getElementById('qunit-fixture').innerHTML = html;
  },

  texts() {
    return [...document.querySelectorAll('#todo-list li label')]
      .map((label) => label.textContent);
  },

  // ISO day string offset from the real today, for date tests.
  day(offset) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
};
