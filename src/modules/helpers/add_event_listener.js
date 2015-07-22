/**
 * Returns a function that adds an eventType, e.g. click, brush, mouseover
 * and event listener, e.g. function (e) { console.log(e); }
 * to an event object, e.g. { "click": [ listener1, listener2], "brush": [ listener1 ], ... }.
 */
define(function () {
  return function (chart) {
    return function (eventType, listener) {
      var listeners = chart.listeners();

      if (arguments.length === 1 && listeners[eventType]) {
        return listeners[eventType];
      }
      if (arguments.length === 2 && typeof listener === "function") {
        if (!listeners[eventType]) { listeners[eventType] = []; }
        listeners[eventType].push(listener);
      }
      return chart;
    };
  };
});