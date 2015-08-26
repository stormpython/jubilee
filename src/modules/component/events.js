/**
 * Adds event listeners to DOM elements
 */
define(function (require) {
  var d3 = require("d3");
  var targetIndex = require("src/modules/helpers/target_index");

  function comparator(target) {
    var threshold = 100;

    return function (val) {
      var isWithinThreshold = (val - threshold) < target && (val + threshold) > target;
      if (isWithinThreshold) {
        return 0;
      }
      return val > threshold ? 1 : -1;
    };
  }

  function makeBinarySearch(arr, comparator, accessor) {
    if (arr.length === 1) { return null; }
    var midPoint = Math.floor(arr.length / 2);
    var midValue = accessor(arr[midPoint]);

    if (comparator(midValue) === 1) {
      return makeBinarySearch(arr.slice(midPoint), comparator, accessor);
    }
    if (comparator(midValue) === -1) {
      return makeBinarySearch(arr.slice(0, midPoint), comparator, accessor);
    }

    return arr[midPoint];
  }

  return function events() {
    // Private variables
    var listeners = {};
    var xScale = null;

    function component(selection) {
      selection.each(function () {
        var element = d3.select(this);

        d3.entries(listeners).forEach(function (e) {
          // Stop listening for event types that have
          // an empty listeners array or that is set to null
          if (!e.value || !e.value.length) {
            return element.on(e.key, null);
          }

          element.on(e.key, function () {
            d3.event.stopPropagation(); // => event.stopPropagation()

            e.value.forEach(function (listener) {
              // References the data point to calculate the correct index value
              var svg = d3.event.target.farthestViewportElement;
              var target = d3.select(d3.event.target);
              var parent = !svg ? d3.select(d3.event.target) : d3.select(svg);
              //var datum = target.datum();
              var index = targetIndex(parent, target) || 0;

              var parentDatum = parent.datum();
              var coordinates = d3.mouse(parent.select("g").node());
              var tart = xScale.invert(coordinates[0]).getTime();

              var accessor = function (d) { return d.x; };
              var comp = comparator(tart);
              var chaChing = parentDatum.map(function (datum) {
                return makeBinarySearch(datum, comp, accessor);
              });
              console.log(chaChing);

              //listener.call(this, d3.event, datum, index);
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

    component.xScale = function (_) {
      if (!arguments.length) { return xScale; }
      xScale = _;
      return component;
    };

    return component;
  };
});