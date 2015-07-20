/**
 * Adds event listeners to DOM elements
 */
define(function (require) {
  var d3 = require("d3");

  return function events() {
    var listeners = {};

    function component(selection) {
      selection.each(function (data, index) {
        var element = d3.select(this);

        Object.keys(listeners).forEach(function (eventType) {

          // Stop listening for event types that have an empty listeners
          // array or are set to null
          if (!listeners[eventType] || !listeners[eventType].length) {
            return element.on(eventType, null);
          }

          element.on(eventType, function (d, i) {
            d3.event.stopPropagation(); // => event.stopPropagation()
            listeners[eventType].forEach(function (listener) {
              listener.call(this, d3.event, d, i);
            });
          });
        });
      });
    }

    // Public API
    component.listeners = function (_) {
      if (!arguments.length) { return listeners; }
      listeners = _;
      return component;
    };

    return component;
  };
});