/**
 * Adds event listeners to DOM elements
 */
define(function (require) {
  var d3 = require("d3");

  return function events() {
    var accessor = function (d) { return d.x; };
    var listeners = {};

    function component(selection) {
      selection.each(function (data, index) {
        var element = d3.select(this);
        var bisect = d3.bisector(accessor).left;

        d3.entries(listeners).forEach(function (e, i) {

          // Stop listening for event types that have an empty listeners
          // array or are set to null
          if (!e.value || !e.value.length) {
            return element.on(e.key, null);
          }

          element.on(e.key, function (d, i) {
            d3.event.stopPropagation(); // => event.stopPropagation()
            e.value.forEach(function (listener) {
              var target = d3.select(d3.event.target);
              var parent = d3.select(target.node().parentNode);
              var datum = target.datum();
              var parentDatum = parent.datum();
              var index = bisect(parentDatum, accessor.call(null, datum));

              listener.call(this, d3.event, datum, index);
            });
          });
        });
      });
    }

    // Public API
    component.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
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