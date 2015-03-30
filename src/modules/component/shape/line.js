define(function (require) {
  var d3 = require("d3");

  return function line() {
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var barHeight;
    var barWidth;
    var xScale;
    var yScale;

    // Options
    var gClass = "layer";
    var barClass = "bar";
    var barFill;

    function shape(selection) {
      selection.each(function () {
        var layer = d3.select(this).selectAll("layer")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", gClass);

        var bars = layer.selectAll("rect")
          .data(function (d) { return d; });

        bars.exit().remove();

        bars
          .enter().append("rect")
          .attr("class", barClass)
          .attr("fill", barFill);

        bars
          .attr("x", X)
          .attr("y", Y)
          .attr("height", barHeight)
          .attr("width", barWidth);
      });
    }

    return shape;
  };
});
