define(function (require) {
  var d3 = require("d3");

  return function line() {
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var color = d3.scale.category10();
    var interpolate = "basis";
    var xScale;
    var yScale;

    // Options
    var gClass = "layer";
    var barClass = "bar";
    var barFill;

    function shape(selection) {
      selection.each(function () {
        var line = d3.svg.line()
          .interpolate(interpolate)
          .x(X)
          .y(Y);

        var layer = d3.select(this).selectAll("layer")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", gClass);

        layer.append("path")
          .attr("class", lineClass)
          .attr("d", function (d, i) {
            return line(values.call(null, d, i));
          })
          .attr("fill", lineFill)
          .attr("stroke", lineStroke)
          .attr("stroke-width", strokeWidth);

      });
    }

    function X(d, i) {
      return xScale(xValue(null, d, i));
    }

    function Y(d, i) {
      return yScale(yValue(null, d, i));
    }

    return shape;
  };
});
