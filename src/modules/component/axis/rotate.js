define(function (require) {
  var d3 = require("d3");
  var truncate = require("src/modules/component/axis/truncate");

  return function rotate() {
    // Private variables
    var axisWidth = 100;
    var labelPadding = 5;
    var truncateLength = 10;
    var text = {
      transform: "translate(0,0)",
      x: 9,
      y: 0,
      dx: "",
      dy: ".71em",
      anchor: "middle"
    };
    var rotatedText = {
      transform: "translate(12,3)rotate(45)",
      x: 9,
      y: 0,
      dx: "",
      dy: ".71em",
      anchor: "start"
    };

    function component(g) {
      g.each(function () {
        var ticks = d3.select(this).selectAll(".tick text");
        var numOfTicks = ticks[0].length;
        var maxTickLabelLength = (axisWidth / numOfTicks) - labelPadding;
        var isRotated;

        ticks.each(function () {
          var labelLength = this.getComputedTextLength();
          if (labelLength >= maxTickLabelLength) { isRotated = true; }
        });

        if (!isRotated) {
          ticks
            .attr("transform", text.transform)
            .attr("x", text.x)
            .attr("y", text.y)
            .attr("dx", text.dx)
            .attr("dy", text.dy)
            .style("text-anchor", text.anchor);
        }

        // Rotate and truncate
        if (isRotated) {
          ticks
            .attr("transform", rotatedText.transform)
            .attr("x", rotatedText.x)
            .attr("y", rotatedText.y)
            .attr("dx", rotatedText.dx)
            .attr("dy", rotatedText.dy)
            .style("text-anchor", rotatedText.anchor);

          // Truncation logic goes here
          ticks.each(function () {
            d3.select(this).call(truncate().maxCharLength(truncateLength));
          });
        }
      });
    }

    // Public API
    component.axisWidth = function (_) {
      if (!arguments.length) { return axisWidth; }
      axisWidth = typeof _ !== "number" ? axisWidth : _;
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

    component.rotatedText = function (_) {
      if (!arguments.length) { return rotatedText; }
      rotatedText.transform = typeof _.transform !== "undefined" ? _.transform : rotatedText.transform;
      rotatedText.x = typeof _.x !== "undefined" ? _.x : rotatedText.x;
      rotatedText.y = typeof _.y !== "undefined" ? _.y : rotatedText.y;
      rotatedText.dx = typeof _.dx !== "undefined" ? _.dx : rotatedText.dx;
      rotatedText.dy = typeof _.dy !== "undefined" ? _.dy : rotatedText.dy;
      rotatedText.anchor = typeof _.anchor !== "undefined" ? _.anchor : rotatedText.anchor;
      return component;
    };

    return component;
  };
});
