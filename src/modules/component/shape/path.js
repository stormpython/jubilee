define(function (require) {
  var d3 = require("d3");

  return function path() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var y0 = function (d) { return d.y0; }
    var color = d3.scale.category10();
    var interpolate = "basis";
    var pathFunction = d3.svg.line().interpolate(interpolate).x(x).y(y);

    // Options
    var gClass = "layer";
    var pathClass = "line";
    var fill = function (d, i) { return color(i); };
    var stroke = 3;
    var strokeWidth = 1;

    function shape(selection) {
      selection.each(function () {
        var layer = d3.select(this).selectAll("layer")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", gClass);

        layer.append("path")
          .attr("class", lineClass)
          .attr("d", function (d) { return pathFunction(d); })
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth);
      });
    }

    shape.x = function (_) {
      if (!arguments.length) { return x; }
      x = _;
      return shape;
    };

    shape.y = function (_) {
      if (!arguments.length) { return y; }
      y = _;
      return shape;
    };

    shape.y0 = function (_) {
      if (!arguments.length) { return y0; }
      y0 = _;
      return shape;
    };

    shape.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return shape;
    };

    shape.interpolate = function (_) {
      if (!arguments.length) { return interpolate; }
      interpolate = _;
      return shape;
    };

    shape.pathFunction = function (_) {
      if (!arguments.length) { return pathFunction; }
      pathFunction = _;
      return shape;
    };

    shape.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return shape;
    };

    shape.pathClass = function (_) {
      if (!arguments.length) { return pathClass; }
      pathClass = _;
      return shape;
    };

    shape.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
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
