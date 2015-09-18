define(function (require) {
  var d3 = require("d3");
  var line = require("src/modules/element/svg/line");
  var getClass = require("src/modules/helpers/get_class");

  return function zeroline() {
    // Private variables
    var xScale = d3.scale.linear();
    var yScale = d3.scale.linear();
    var gClass = "zero-line-group";
    var lineClass = "zero-line";
    var stroke = "#000000";
    var strokeWidth = 1;
    var opacity = 0.5;

    function component(selection) {
      selection.each(function () {
        var g = d3.select(this);
        var min = yScale.domain()[0];
        var max = yScale.domain()[1];
        var isLineDrawn = min < 0 && max > 0;

        // Remove previous line
        g.select("g." + getClass(gClass)).remove();

        if (isLineDrawn) {
          var zeroLine = line()
            .class(lineClass)
            .x1(function () { return xScale.range()[0]; })
            .x2(function () { return xScale.range()[1]; })
            .y1(function () { return yScale(0); })
            .y2(function () { return yScale(0); })
            .stroke(stroke)
            .strokeWidth(strokeWidth)
            .opacity(opacity);

          g.append("g")
            .attr("class", gClass)
            .call(zeroLine);
        }
      });
    }

    // Public API
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

    component.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = typeof _ === "string" ? _ : gClass;
      return component;
    };

    component.lineClass = function (_) {
      if (!arguments.length) { return lineClass; }
      lineClass = typeof _ === "string" ? _ : lineClass;
      return component;
    };

    component.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = typeof _ === "string" ? _ : stroke;
      return component;
    };

    component.strokeWidth = function (_) {
      if (!arguments.length) { return strokeWidth; }
      strokeWidth = typeof _ === "number" ? _ : strokeWidth;
      return component;
    };

    component.opacity = function (_) {
      if (!arguments.length) { return opacity; }
      opacity = typeof _ === "number" ? _ : opacity;
      return component;
    };

    return component;
  };
});