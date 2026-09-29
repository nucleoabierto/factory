((global) => {
  'use strict';

  const { INBOX, FILTERS, VIEWS } = global.Todo;

  // Presentation: DOM rendering and event dispatch. Each render is a
  // function of the view-model it receives; user events go out through
  // the actions bound at init. It knows nothing about the model or
  // persistence.
  // The single event mechanism: delegated listeners on the document
  // dispatch by data-action. Static controls and dynamic rows share
  // the same contract, so the render attaches no listeners at all.
  const dispatchTable = {
    click: {
      'destroy-task': (el, ev, actions) =>
        actions.deleteTask(Number(el.dataset.id)),
      'reactivate-list': (el, ev, actions) =>
        actions.unarchiveList(el.dataset.id),
      'set-filter': (el, ev, actions) => {
        ev.preventDefault();
        actions.setFilter(el.dataset.filter);
      },
      'set-view': (el, ev, actions) => {
        ev.preventDefault();
        actions.setView(el.dataset.view);
      },
      'clear-completed': (el, ev, actions) => actions.clearCompleted(),
      'export-file': (el, ev, actions) => actions.exportFile(),
      // A prompt, not the clipboard: navigator.clipboard is not
      // guaranteed over file://, and a prompt lets the user copy the
      // link by hand like the other dialogs of the app.
      'export-link': (el, ev, actions) => {
        const result = actions.exportLink();
        if (result.ok) {
          global.prompt('Copia el enlace', result.url);
        } else {
          global.alert('El estado es demasiado grande para un enlace.');
        }
      },
      'add-list': (el, ev, actions) => {
        const name = global.prompt('Nombre de la lista');
        if (name !== null) {
          actions.addList(name);
        }
      },
      'rename-list': (el, ev, actions) => {
        const name = global.prompt('Nuevo nombre de la lista',
          actions.activeListName());
        if (name !== null) {
          actions.renameActiveList(name);
        }
      },
      'archive-list': (el, ev, actions) => actions.archiveActiveList(),
      'delete-list': (el, ev, actions) => actions.deleteActiveList()
    },
    change: {
      'set-active-list': (el, ev, actions) => actions.setActiveList(el.value),
      'toggle-task': (el, ev, actions) =>
        actions.toggleTask(Number(el.dataset.id)),
      'move-task': (el, ev, actions) =>
        actions.moveTask(Number(el.dataset.id), el.value),
      // An emptied date field means removing the date.
      'set-task-date': (el, ev, actions) => el.value
        ? actions.setTaskDate(Number(el.dataset.id), el.value)
        : actions.clearTaskDate(Number(el.dataset.id)),
      // An emptied repeat field means a plain task again.
      'set-task-recur': (el, ev, actions) =>
        actions.setTaskRecur(Number(el.dataset.id), el.value || null)
    },
    keydown: {
      'add-task': (el, ev, actions) => {
        if (ev.key === 'Enter' && actions.addTask(el.value)) {
          el.value = '';
        }
      },
      'edit-task': (el, ev, actions) => {
        if (ev.key === 'Enter') {
          actions.editTask(Number(el.dataset.id), el.value);
        } else if (ev.key === 'Escape') {
          actions.cancelEdit();
        }
      }
    },
    dblclick: {
      'start-edit': (el, ev, actions) =>
        actions.startEdit(Number(el.dataset.id))
    }
  };

  const UI = {
    actions: {},
    bound: false,

    // bind may run again with fresh actions; the document listeners
    // are attached once and always dispatch to the current actions.
    bind(actions) {
      UI.actions = actions;
      const doc = global.document;
      if (!doc || UI.bound) {
        return;
      }
      UI.bound = true;
      Object.entries(dispatchTable).forEach(([type, table]) => {
        doc.addEventListener(type, (ev) => {
          const el = ev.target.closest
            ? ev.target.closest('[data-action]')
            : null;
          const handle = el && table[el.dataset.action];
          if (handle) {
            handle(el, ev, UI.actions);
          }
        });
      });
    },

    render(vm) {
      const doc = global.document;
      if (!doc) {
        return;
      }
      renderTasks(doc, vm);
      renderListBar(doc, vm);
      renderArchived(doc, vm);
      renderFooter(doc, vm);
    },

    // Downloading is a DOM effect like the dialogs: a temporary
    // anchor carries the blob out of the page and nothing renders.
    downloadFile(filename, text) {
      const doc = global.document;
      const URL = global.URL;
      if (!doc || !URL || !URL.createObjectURL || !global.Blob) {
        return;
      }
      const url = URL.createObjectURL(
        new Blob([text], { type: 'application/json' }));
      const anchor = doc.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      doc.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      if (URL.revokeObjectURL) {
        URL.revokeObjectURL(url);
      }
    }
  };

  function renderTasks(doc, vm) {
    const list = doc.getElementById('todo-list');
    if (!list) {
      return;
    }
    list.innerHTML = '';
    vm.tasks.forEach((t) => {
      const li = doc.createElement('li');
      li.dataset.id = t.id;
      if (t.done) {
        li.className = 'done';
      }
      if (t.dateStatus) {
        li.classList.add(`due-${t.dateStatus}`);
      }
      if (vm.editingId === t.id) {
        const editInput = doc.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit';
        editInput.value = t.text;
        editInput.dataset.action = 'edit-task';
        editInput.dataset.id = t.id;
        li.appendChild(editInput);
      } else {
        const toggle = doc.createElement('input');
        toggle.type = 'checkbox';
        toggle.className = 'toggle';
        toggle.checked = t.done;
        toggle.dataset.action = 'toggle-task';
        toggle.dataset.id = t.id;
        const label = doc.createElement('label');
        label.textContent = t.text;
        label.dataset.action = 'start-edit';
        label.dataset.id = t.id;
        const destroy = doc.createElement('button');
        destroy.className = 'destroy';
        destroy.textContent = '×';
        destroy.setAttribute('aria-label', 'Eliminar tarea');
        destroy.title = 'Eliminar tarea';
        destroy.dataset.action = 'destroy-task';
        destroy.dataset.id = t.id;
        const due = doc.createElement('input');
        due.type = 'date';
        due.className = 'due-date';
        due.value = t.date || '';
        due.dataset.action = 'set-task-date';
        due.dataset.id = t.id;
        due.setAttribute('aria-label', 'Fecha de la tarea');
        li.appendChild(toggle);
        li.appendChild(label);
        li.appendChild(due);
        // Recurrence needs a date to repeat from: the control only
        // exists while the task has one.
        if (t.date) {
          li.appendChild(recurSelect(doc, t));
        }
        li.appendChild(moveSelect(doc, t));
        li.appendChild(destroy);
      }
      list.appendChild(li);
    });
    const editing = list.querySelector('input.edit');
    if (editing) {
      editing.focus();
    }
  }

  function recurSelect(doc, t) {
    const recur = doc.createElement('select');
    recur.className = 'recur';
    recur.dataset.action = 'set-task-recur';
    recur.dataset.id = t.id;
    recur.setAttribute('aria-label', 'Repetir');
    [['', 'No repetir'], ['weekly', 'Semanal'], ['monthly', 'Mensual']]
      .forEach(([value, text]) => {
        const option = doc.createElement('option');
        option.value = value;
        option.textContent = text;
        option.selected = (t.recur || null) === (value || null);
        recur.appendChild(option);
      });
    return recur;
  }

  function moveSelect(doc, t) {
    const move = doc.createElement('select');
    move.className = 'move';
    move.dataset.action = 'move-task';
    move.dataset.id = t.id;
    move.setAttribute('aria-label', 'Mover a otra lista');
    const placeholder = doc.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Mover a…';
    placeholder.disabled = true;
    placeholder.selected = true;
    move.appendChild(placeholder);
    t.moveTargets.forEach((l) => {
      const option = doc.createElement('option');
      option.value = l.id;
      option.textContent = l.name;
      move.appendChild(option);
    });
    return move;
  }

  function renderListBar(doc, vm) {
    const select = doc.getElementById('list-select');
    if (select) {
      select.innerHTML = '';
      vm.navigableLists.forEach((l) => {
        const option = doc.createElement('option');
        option.value = l.id;
        option.textContent = `${l.name} (${l.pendingCount})`;
        option.selected = l.id === vm.activeListId;
        select.appendChild(option);
      });
    }
    const inboxActive = vm.activeListId === INBOX.id;
    const renameButton = doc.getElementById('rename-list');
    if (renameButton) {
      renameButton.disabled = inboxActive;
    }
    const archiveButton = doc.getElementById('archive-list');
    if (archiveButton) {
      archiveButton.disabled = inboxActive;
    }
    const deleteButton = doc.getElementById('delete-list');
    if (deleteButton) {
      deleteButton.disabled = inboxActive;
    }
  }

  function renderArchived(doc, vm) {
    const archivedSection = doc.getElementById('archived-section');
    if (!archivedSection) {
      return;
    }
    const archived = vm.archivedLists;
    archivedSection.hidden = archived.length === 0;
    const summary = archivedSection.querySelector('summary');
    if (summary) {
      summary.textContent = `Archivadas (${archived.length})`;
    }
    const archivedItems = doc.getElementById('archived-list');
    if (archivedItems) {
      archivedItems.innerHTML = '';
      archived.forEach((l) => {
        const li = doc.createElement('li');
        const name = doc.createElement('span');
        name.textContent = `${l.name} (${l.pendingCount})`;
        const reactivate = doc.createElement('button');
        reactivate.className = 'reactivate';
        reactivate.textContent = 'Reactivar';
        reactivate.dataset.action = 'reactivate-list';
        reactivate.dataset.id = l.id;
        li.appendChild(name);
        li.appendChild(reactivate);
        archivedItems.appendChild(li);
      });
    }
  }

  function renderFooter(doc, vm) {
    const counter = doc.getElementById('todo-count');
    if (counter) {
      const n = vm.pendingCount;
      counter.textContent = `${n} pendiente${n === 1 ? '' : 's'}`;
    }
    const clearCompleted = doc.getElementById('clear-completed');
    if (clearCompleted) {
      clearCompleted.hidden = !vm.hasCompleted;
    }
    const filterLinks = {
      all: doc.getElementById('filter-all'),
      active: doc.getElementById('filter-active'),
      completed: doc.getElementById('filter-completed')
    };
    FILTERS.forEach((name) => {
      const link = filterLinks[name];
      if (link) {
        link.classList.toggle('selected', name === vm.filter);
      }
    });
    const viewLinks = {
      main: doc.getElementById('view-main'),
      today: doc.getElementById('view-today')
    };
    VIEWS.forEach((name) => {
      const link = viewLinks[name];
      if (link) {
        link.classList.toggle('selected', name === vm.view);
      }
    });
  }

  // The test harness renders UI with literal view-models.
  global.UI = UI;
})(typeof window !== 'undefined' ? window : this);
