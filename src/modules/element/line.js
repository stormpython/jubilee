define(function (require) {
  var d3 = require("d3");

  return function line() {
    var x1 = null;
    var x2 = null;
    var y1 = null;
    var y2 = null;
    var gClass;
    var lineClass;
    var stroke;
    var strokeWidth;

    function element(selection) {
      selection.each(function () {
        var layer = d3.select(this).selectAll("lineG")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", gClass);

        var lines = layer.selectAll("lines")
          .data(function (d) { return d; });

        // Exit
        lines.exit().remove();

        // Enter
        lines
          .enter().append("line")
          .attr("class", lineClass);

        // Update
        lines
          .attr("x1", x1)
          .attr("x2", x2)
          .attr("y1", y1)
          .attr("y2", y2)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth);
      });
    }

    element.x1 = function (_) {
      if (!arguments.length) { return x1; }
      x1 = _;
      return element;
    };

    element.x2 = function (_) {
      if (!arguments.length) { return x2; }
      x2 = _;
      return element;
    };

    element.y1 = function (_) {
      if (!arguments.length) { return y1; }
      y1 = _;
      return element;
    };

    element.y2 = function (_) {
      if (!arguments.length) { return y2; }
      y2 = _;
      return element;
    };

    element.lineClass = function (_) {
      if (!arguments.length) { return lineClass; }
      lineClass = _;
      return element;
    };

    element.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = _;
      return element;
    };

    element.strokeWidth = function (_) {
      if (!arguments.length) { return strokeWidth; }
      strokeWidth = _;
      return element;
    };

    return element;
  };
});