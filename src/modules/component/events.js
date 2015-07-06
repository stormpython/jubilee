define(function (require) {
  var d3 = require("d3");

  return function events() {
    var listeners = {};

    function component(selection) {
      selection.each(function (data, index) {
        var element = d3.select(this);

        Object.keys(listeners).forEach(function (event) {
          if (!listeners[event] || !listeners[event].length) {
            return element.on(event, null);
          }

          element.on(event, function (d, i) {
            d3.event.stopPropagation();
            listeners[event].forEach(function (listener) {
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