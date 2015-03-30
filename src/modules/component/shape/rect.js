define(function (require) {
  var d3 = require("d3");

  return function rect() {
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

    function X(d, i) {
      return xScale(xValue.call(this, d, i));
    }

    function Y(d, i) {
      return yScale(yValue.call(this, d, i));
    }

    shape.x = function (_) {
      if (!arguments.length) { return xValue; }
      xValue = _;
      return shape;
    };

    shape.y = function (_) {
      if (!arguments.length) { return yValue; }
      yValue = _;
      return shape;
    };

    shape.barWidth = function (_) {
      if (!arguments.length) { return barWidth; }
      barWidth = _;
      return shape;
    };

    shape.barHeight = function (_) {
      if (!arguments.length) { return barHeight; }
      barHeight = _;
      return shape;
    };

    shape.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return shape;
    };

    shape.barClass = function (_) {
      if (!arguments.length) { return barClass; }
      barClass = _;
      return shape;
    };

    shape.barFill = function (_) {
      if (!arguments.length) { return barFill; }
      barFill = _;
      return shape;
    };

    shape.xScale = function (_) {
      if (!arguments.length) { return xScale; }
      xScale = _;
      return shape;
    };

    shape.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale = _;
      return shape;
    };

    return shape;
  };
});
