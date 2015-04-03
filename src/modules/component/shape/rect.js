define(function (require) {
  var d3 = require("d3");

  return function rect() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var rx = 0;
    var ry = 0;
    var width = function () { return 10; };
    var height = function () { return height; };
    var color = d3.scale.category10();
    var xScale = null;
    var yScale = null;

    // Options
    var groupClass = "layer";
    var rectClass = "bar";
    var fill = function (d, i) { return color(i); };
    var stroke;
    var strokeWidth;

    function shape(selection) {
      selection.each(function (data, i) {
        var layer = d3.select(this).selectAll("layer")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", groupClass);

        var bars = layer.selectAll("rect")
          .data(function (d) { return d; });

        bars.exit().remove();

        bars
          .enter().append("rect")
          .attr("class", rectClass)
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("strokeWidth", strokeWidth);

        bars
          .attr("x", x)
          .attr("y", y)
          .attr("rx", rx)
          .attr("ry", ry)
          .attr("height", height)
          .attr("width", width);
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

    shape.rx = function (_) {
      if (!arguments.length) { return rx; }
      rx = _;
      return shape;
    };

    shape.ry = function (_) {
      if (!arguments.length) { return ry; }
      ry = _;
      return shape;
    };

    shape.width = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return shape;
    };

    shape.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return shape;
    };

    shape.groupClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return shape;
    };

    shape.rectClass= function (_) {
      if (!arguments.length) { return rectClass; }
      rectClass = _;
      return shape;
    };

    shape.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return shape;
    };

    shape.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
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
