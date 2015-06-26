define(function (require) {
  var d3 = require("d3");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var axis = require("src/modules/component/axis/axis");
  var rect = require("src/modules/element/svg/rect");
  var zeroAxisLine = require("src/modules/element/svg/line");
  var eventOptions = require("src/modules/helpers/options/events");
  var mapDomain = require("src/modules/helpers/map_domain");
  var scaleValue = require("src/modules/helpers/scale_value");
  var marginOptions = require("src/modules/helpers/options/margin");
  var scaleOptions = require("src/modules/helpers/options/scale");
  var xAxisOptions = require("src/modules/helpers/options/x_axis");
  var yAxisOptions = require("src/modules/helpers/options/y_axis");
  var axisAPI = require("src/modules/helpers/api/axis");
  var marginAPI = require("src/modules/helpers/api/margin");
  var rectAPI = require("src/modules/helpers/api/rect");
  var scaleAPI = require("src/modules/helpers/api/scale");

  return function barChart() {
    // Private variables
    var margin = marginOptions;
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var dispatch = d3.dispatch("brush");

    // Scale options
    var xScaleOpts = deepCopy(scaleOptions, {});
    var yScaleOpts = deepCopy(scaleOptions, {});
    var xScale;
    var yScale;

    // Other options
    var axisX = deepCopy(xAxisOptions, {});
    var axisY = deepCopy(yAxisOptions, {});

    // Zero-line options
    var zeroLine = {
      add: true,
      lineClass: "zero-line",
      stroke: "black",
      strokeWidth: 1,
      opacity: 0.5,
      x1: function () { return xScale.range()[0]; },
      x2: function () { return xScale.range()[1]; },
      y1: function () { return yScale(0); },
      y2: function () { return yScale(0); }
    };

    // Line Options
    var lines = {
      groupClass: "paths",
      lineClass: "line",
      stroke: function (d, i) { return color(i); },
      strokeWidth: 3,
      opacity: 1,
      interpolate: "linear",
      tension:  0.7,
      defined: function () { return true; },
      events: deepCopy(eventOptions, {})
    };

    // Circle Options
    var circles = {
      show: true,
      groupClass: "circle layer",
      circleClass: "circle",
      fill: function (d, i, j) { return color(j); },
      stroke: null,
      radius: 5,
      strokeWidth: 3,
      events: deepCopy(eventOptions, {})
    };

    function chart(selection) {
      selection.each(function (data, index) {

      });
    }

    // Public API

    return chart;
  };
});