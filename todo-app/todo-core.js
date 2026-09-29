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

  // The export document is a second data contract — versioned and
  // self-contained — distinct from the persisted state. Its marker
  // and version let imports reject foreign or future payloads.
  Todo.EXPORT_APP = 'todo-app';
  Todo.EXPORT_VERSION = 1;
  Todo.IMPORT_MODES = ['replace', 'copy'];

  // The portable link carries the document in the fragment under its
  // own key — the '#/…' hrefs of filters and views are only action
  // triggers and are never read back. The whole URL is bounded so
  // the link survives chat and mail clients that break long URLs.
  Todo.EXPORT_HASH = 'export';
  Todo.EXPORT_LINK_MAX = 8000;

  // base64url keeps the document compact and fragment-safe, and the
  // TextEncoder detour lets non-ASCII task text survive btoa.
  Todo.encodeDocument = function encodeDocument(doc) {
    const bytes = new TextEncoder().encode(JSON.stringify(doc));
    let binary = '';
    bytes.forEach((b) => { binary += String.fromCharCode(b); });
    return btoa(binary)
      .replaceAll('+', '-')
      .replaceAll('/', '_')
      .replace(/=+$/, '');
  };

  // Undecodable payloads degrade to null; the caller reports the
  // link as invalid instead of throwing mid-render.
  Todo.decodeDocument = function decodeDocument(payload) {
    try {
      const base64 = payload
        .replaceAll('-', '+')
        .replaceAll('_', '/');
      const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
      const binary = atob(padded);
      const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch (e) {
      return null;
    }
  };

  // The limit applies to the complete URL, base included: the
  // receiver's address bar has to hold all of it.
  Todo.documentLink = function documentLink(doc, base) {
    const url = `${base}#${Todo.EXPORT_HASH}=${Todo.encodeDocument(doc)}`;
    return url.length <= Todo.EXPORT_LINK_MAX
      ? { ok: true, url }
      : { ok: false, reason: 'link-too-large' };
  };

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
