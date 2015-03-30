define(function (require) {
  var d3 = require("d3");

  return function circles() {
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

    function shapes(selection) {
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

    function X(d, i) {
      return xScale(xValue.call(this, d, i));
    }

    function Y(d, i) {
      return yScale(yValue.call(this, d, i));
    }

    shapes.x = function (_) {
      if (!arguments.length) { return xValue; }
      xValue = _;
      return shapes;
    };

    shapes.y = function (_) {
      if (!arguments.length) { return yValue; }
      yValue = _;
      return shapes;
    };

    shapes.barWidth = function (_) {
      if (!arguments.length) { return barWidth; }
      barWidth = _;
      return shapes;
    };

    shapes.barHeight = function (_) {
      if (!arguments.length) { return barHeight; }
      barHeight = _;
      return shapes;
    };

    shapes.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return shapes;
    };

    shapes.barClass = function (_) {
      if (!arguments.length) { return barClass; }
      barClass = _;
      return shapes;
    };

    shapes.barFill = function (_) {
      if (!arguments.length) { return barFill; }
      barFill = _;
      return shapes;
    };

    shapes.xScale = function (_) {
      if (!arguments.length) { return xScale; }
      xScale = _;
      return shapes;
    };

    shapes.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale = _;
      return shapes;
    };

    return shapes;
  };
});
