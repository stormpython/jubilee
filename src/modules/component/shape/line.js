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

    function shape(selection) {
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

    shape.x1 = function (_) {
      if (!arguments.length) { return x1; }
      x1 = _;
      return shape;
    };

    shape.x2 = function (_) {
      if (!arguments.length) { return x2; }
      x2 = _;
      return shape;
    };

    shape.y1 = function (_) {
      if (!arguments.length) { return y1; }
      y1 = _;
      return shape;
    };

    shape.y2 = function (_) {
      if (!arguments.length) { return y2; }
      y2 = _;
      return shape;
    };

    shape.lineClass = function (_) {
      if (!arguments.length) { return lineClass; }
      lineClass = _;
      return shape;
    };

    shape.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = _;
      return shape;
    };

    shape.strokeWidth = function (_) {
      if (!arguments.length) { return strokeWidth; }
      strokeWidth = _;
      return shape;
    };

    return shape;
  };
});