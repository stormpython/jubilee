define(function (require) {
  var d3 = require("d3");

  /**
   * Creates a brush component and binds it to an <svg></svg>.
   */
  return function brush() {
    // Private variables
    var margin = { top: 0, right: 0, bottom: 0, left: 0 };
    var cssClass = "brush";
    var opacity = 0.2;
    var width = null;
    var height = null;
    var xScale = null;
    var yScale = null;
    var extent = null;
    var clamp = false;
    var brushStartCallback = [];
    var brushCallback = [];
    var brushEndCallback = [];

    function component(selection) {
      selection.each(function (data, index) {
        var isBrush = brushStartCallback.length ||
          brushCallback.length || brushEndCallback.length;

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        if (isBrush) {
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

                // Clear brush
                d3.selectAll("g." + cssClass)
                  .call(brush.clear());
              });
            });

          if (xScale) { brush.x(xScale); }
          if (yScale) { brush.y(yScale); }
          if (extent) { brush.extent(extent); }
          if (clamp) { brush.clamp(clamp); }

          var brushG = d3.select(this);

          // Remove previous brush
          brushG.select("g." + cssClass).remove();

          // Attach new brush
          brushG.append("g")
            .attr("class", cssClass)
            .attr("opacity", opacity)
            .call(brush)
            .selectAll("rect");

          if (width) { brushG.attr("width", width); }
          if (height) { brushG.attr("height", height); }
        }
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
      else if (Array.isArray(_)) { brushStartCallback = _; }
      return component;
    };

    component.brush = function (_) {
      if (!arguments.length) { return brushCallback; }
      if (typeof _ === "function") { brushCallback.push(_); }
      else if (Array.isArray(_)) { brushCallback = _; }
      return component;
    };

    component.brushend = function (_) {
      if (!arguments.length) { return brushEndCallback; }
      if (typeof _ === "function") { brushEndCallback.push(_); }
      else if (Array.isArray(_)) { brushEndCallback = _; }
      return component;
    };

    return component;
  };
});