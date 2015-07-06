define(function () {
  return function (listeners, chart) {
    return function (event, listener) {
      if (arguments.length === 1 && listeners[event]) {
        listeners[event] = null;
      }
      if (arguments.length === 2 && typeof listener === "function") {
        if (!listeners[event]) { return; }

        listeners[event] = listeners[event].filter(function (handler) {
          return handler !== listener;
        });
      }

      return chart;
    };
  };
});