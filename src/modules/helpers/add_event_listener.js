define(function () {
  return function (listeners, chart) {
    return function (event, listener) {
      if (arguments.length === 1 && listeners[event]) {
        return listeners[event];
      }
      if (arguments.length === 2 && typeof listener === "function") {
        if (!listeners[event]) { listeners[event] = []; }
        listeners[event].push(listener);
      }
      return chart;
    };
  };
});