(function (global) {
  'use strict';

  var App = {
    init: function () {
      // Punto de entrada: las tareas siguientes cuelgan aquí la lógica.
    }
  };

  global.App = App;

  if (global.document) {
    global.document.addEventListener('DOMContentLoaded', App.init);
  }
})(typeof window !== 'undefined' ? window : this);
