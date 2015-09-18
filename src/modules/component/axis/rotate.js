define(function (require) {
  var d3 = require("d3");
  var truncate = require("./truncate");

  return function rotate() {
    // Private variables
    var axisLength = 100;
    var measure = "width";
    var labelPadding = 5;
    var truncateLength = 10;
    var text = {
      transform: "translate(0,0)rotate(-45)",
      x: 0,
      y: 6,
      dx: "",
      dy: ".71em",
      anchor: "end"
    };

    function component(g) {
      g.each(function () {
        var ticks = d3.select(this).selectAll(".tick text");
        var numOfTicks = ticks[0].length;
        var maxTickLabelLength = (axisLength / numOfTicks) - labelPadding;
        var isRotated;

        ticks.each(function () {
          var labelLength = this.getBBox()[measure];
          if (labelLength >= maxTickLabelLength) { isRotated = true; }
        });

        // Rotate and truncate
        if (isRotated) {
          ticks
            .attr("transform", text.transform)
            .attr("x", text.x)
            .attr("y", text.y)
            .attr("dx", text.dx)
            .attr("dy", text.dy)
            .style("text-anchor", text.anchor);

          // Truncation logic goes here
          ticks.each(function () {
            d3.select(this)
              .call(truncate().maxCharLength(truncateLength));
          });
        }
      });
    }

    // Public API
    component.axisLength = function (_) {
      if (!arguments.length) { return axisLength; }
      axisLength = typeof _ !== "number" ? axisLength : _;
      return component;
    };

    component.measure = function (_) {
      if (!arguments.length) { return measure; }
      measure = typeof _ !== "string" ? measure : _;
      return component;
    };

    component.labelPadding = function (_) {
      if (!arguments.length) { return labelPadding; }
      labelPadding = typeof _ !== "number" ? labelPadding : _;
      return component;
    };

    component.truncateLength = function (_) {
      if (!arguments.length) { return truncateLength; }
      truncateLength = typeof _ !== "number" ? truncateLength : _;
      return component;
    };

    component.text = function (_) {
      if (!arguments.length) { return text; }
      text.transform = typeof _.transform !== "undefined" ? _.transform : text.transform;
      text.x = typeof _.x !== "undefined" ? _.x : text.x;
      text.y = typeof _.y !== "undefined" ? _.y : text.y;
      text.dx = typeof _.dx !== "undefined" ? _.dx : text.dx;
      text.dy = typeof _.dy !== "undefined" ? _.dy : text.dy;
      text.anchor = typeof _.anchor !== "undefined" ? _.anchor : text.anchor;
      return component;
    };

    return component;
  };
});
