/**
 * Creates a brush component and binds it to an <svg></svg>.
 */
define(function (require) {
  var d3 = require("d3");

  return function brush() {
    // Private variables
    var cssClass = "brush";
    var margin = { top: 0, right: 0, bottom: 0, left: 0 };
    var width = null;
    var height = null;
    var opacity = 0.2;

    var xScale = null;
    var yScale = null;
    var extent = null;
    var clamp = null;

    var brushStartCallback = [];
    var brushCallback = [];
    var brushEndCallback = [];

    function component(selection) {
      selection.each(function (data, index) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var brush = d3.svg.brush()
          .on("brushstart", function () {
            brushStartCallback.forEach(function (listener) {
              listener.call(this, brush, data, index);
            });
          })
          .on("brush", function () {
            brushCallback.forEach(function (listener) {
              listener.call(this, brush, data, index);
            });
          })
          .on("brushend", function () {
            brushEndCallback.forEach(function (listener) {
              listener.call(this, brush, data, index);
              d3.selectAll("g.brush").call(brush.clear()); // Clear brush
            });
          });

        if (xScale) { brush.x(xScale); }
        if (yScale) { brush.y(yScale); }
        if (extent) { brush.extent(extent); }
        if (clamp) { brush.clamp(clamp); }

        var brushG = d3.select(this).append("g")
          .attr("class", cssClass)
          .attr("opacity", opacity)
          .call(brush)
          .selectAll("rect");

        if (width) { brushG.attr("width", width); }
        if (height) { brushG.attr("height", height); }
      });
    }

    // Public API
    component.margin = function (_) {
      if (!arguments.length) { return margin; }
      margin.top = typeof _.top !== "undefined" ? _.top : margin.top;
      margin.right = typeof _.right !== "undefined" ? _.right : margin.right;
      margin.bottom = typeof _.bottom !== "undefined" ? _.bottom : margin.bottom;
      margin.left = typeof _.left !== "undefined" ? _.left : margin.left;
      return component;
    };

    component.width = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return component;
    };

    component.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return component;
    };

    component.opacity = function (_) {
      if (!arguments.length) { return opacity; }
      opacity = _;
      return component;
    };

    component.class = function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
      return component;
    };

    component.xScale = function (_) {
      if (!arguments.length) { return xScale; }
      xScale = _;
      return component;
    };

    component.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale = _;
      return component;
    };

    component.extent = function (_) {
      if (!arguments.length) { return extent; }
      extent = _;
      return component;
    };

    component.clamp = function (_) {
      if (!arguments.length) { return clamp; }
      clamp = _;
      return component;
    };

    component.brushstart = function (_) {
      if (!arguments.length) { return brushStartCallback; }
      if (typeof _ === "function") { brushStartCallback.push(_); }
      else { brushStartCallback = _; }
      return component;
    };

    component.brush = function (_) {
      if (!arguments.length) { return brushCallback; }
      if (typeof _ === "function") { brushCallback.push(_); }
      else { brushCallback = _; }
      return component;
    };

    component.brushend = function (_) {
      if (!arguments.length) { return brushEndCallback; }
      if (typeof _ === "function") { brushEndCallback.push(_); }
      else { brushEndCallback = _; }
      return component;
    };

    return component;
  };
});