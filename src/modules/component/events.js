/**
 * Adds event listeners to DOM elements
 */
define(function (require) {
  var d3 = require("d3");
  var addEventListener = require("src/modules/helpers/add_event_listener");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");

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

    function sumListeners(listeners) {
      return Object.keys(listeners).map(function (event) {
        return listeners[event].length;
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
    }

    // Public API
    component.listeners = function (_) {
      if (!arguments.length) { return listeners; }
      listeners = _;
      return component;
    };

    component.listenerCount = function (_) {
      if (!arguments.length) { return sumListeners(listeners); }
      if (!listeners[_]) { return 0; }
      return listeners[_].length;
    };

    component.on = addEventListener(component);

    component.off = removeEventListener(component);

    component.activeEvents = function () {
      return Object.keys(listeners).filter(function (event) {
        return listeners[event].length;
      });
    };

    return component;
  };
});