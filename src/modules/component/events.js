/**
 * Adds event listeners to DOM elements
 */
define(function (require) {
  var d3 = require("d3");
  var targetIndex = require("src/modules/helpers/target_index");

  return function events() {
    // Private variables
    var listeners = {};
    var xScale = null;
    var threshold = 30000;

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
              var datum = target.datum();
              var index = targetIndex(parent, target) || 0;

              var chart = parent.select("g").node();
              var coordinate = xScale.invert(d3.mouse(chart)[0]).getTime();
              var range = [coordinate - threshold, coordinate + threshold];

              var values = parent.datum().map(function (datum) {
                return binarySearch(datum)
                //return datum.filter(function (d, i) {
                //  var date = function (d, i) { return d.x; }.call(this, d, i);
                //  return date > range[0] && date < range[1];
                //});
              });
              console.log(values);
              function comparator (find) {
                var threshold = 30000;

                return function (val) {
                  return val > (find - threshold) && val < (find + threshold);
                };
              }

              function binarySearch(arr, comparator, accessor) {
                if (!arr.length) { return null; }

                var index = Math.floor(arr.length / 2);
                var midPoint = accessor(arr[index]);

                if (comparator()) {
                  return binarySearch(arr.slice(0, index), find, accessor);
                }

                if (midPoint < find) {
                  return binarySearch(arr.slice(index + 1), find, accessor);
                }

                return arr[index];
              }


              listener.call(this, d3.event, datum, index);
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

    component.threshold = function (_) {
      if (!arguments.length) { return threshold; }
      threshold = _;
      return component;
    }

    return component;
  };
});