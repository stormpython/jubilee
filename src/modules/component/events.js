/**
 * Adds event listeners to DOM elements
 */
define(function (require) {
  var d3 = require("d3");
  var valuator = require("src/modules/valuator");
  var targetIndex = require("src/modules/helpers/target_index");

  return function events() {
    // Private variables
    var accessor = function (d) { return d.x; };
    var listeners = {};

    function component(selection) {
      selection.each(function (data, index) {
        var element = d3.select(this);

        d3.entries(listeners).forEach(function (e, i) {
          // Stop listening for event types that have
          // an empty listeners array or that is set to null
          if (!e.value || !e.value.length) {
            return element.on(e.key, null);
          }

          element.on(e.key, function (d, i) {
            d3.event.stopPropagation(); // => event.stopPropagation()

            e.value.forEach(function (listener) {
              // References the data point to calculate the correct index value
              var svg = d3.event.target.farthestViewportElement;
              var target = d3.select(d3.event.target);
              var parent = !svg ? d3.select(d3.event.target) : d3.select(svg);

              var datum = target.datum();
              var index = targetIndex(parent, target) || 0;

              listener.call(this, d3.event, datum, index);
            });
          });
        });
      });
    }

    // Public API
    component.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = valuator(_);
      return component;
    };

    component.listeners = function (_) {
      if (!arguments.length) { return listeners; }
      listeners = _;
      return component;
    };

    return component;
  };
});