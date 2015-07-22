/**
 * Returns a function that removes event types, e.g: click, brush, mouseover, etc.
 * and event listeners, e.g. function (e) { console.log(e); }
 * from an event object, e.g. { "click": [ listener1, listener2], "brush": [ listener1 ], ... }.
 * Ability to remove one event listener at a time or all listeners for an event type.
 */
define(function () {
  return function (chart) {
    return function (eventType, listener) {
      var listeners = chart.listeners();

      if (arguments.length === 1 && listeners[eventType]) {
        listeners[eventType] = null;
      }
      if (arguments.length === 2 && typeof listener === "function") {
        if (!listeners[eventType]) { return; }

        listeners[eventType] = listeners[eventType].filter(function (handler) {
          return handler !== listener;
        });
      }

      return chart;
    };
  };
});