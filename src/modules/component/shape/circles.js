define(function (require) {
  var d3 = require("d3");

  return function circles() {
    var cxValue = function (d) { return d.x; };
    var cyValue = function (d) { return d.y; };
    var xScale;
    var yScale;

    // Options
    var radius = 5;
    var gClass = "layer";
    var circleClass = "circles";
    var color = d3.scale.category20c();
    var fill = function (d, i, j) { return color(j); };
    var stroke = function (d, i, j) { return color(j); };
    var strokeWidth = 3;

    function shapes(selection) {
      selection.each(function () {
        var layer = d3.select(this).selectAll("circleG")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", gClass);

        var circles = layer.selectAll("circlePoints")
          .data(function (d) { return d; });

        // Exit
        circles.exit().remove();

        // Enter
        circles
          .enter().append("circle")
          .attr("class", circleClass);

        // Update
        circles
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("r", radius)
          .attr("cx", X)
          .attr("cy", Y);
      });
    }

    function X(d, i) {
      return xScale(cxValue.call(this, d, i));
    }

    function Y(d, i) {
      return yScale(cyValue.call(this, d, i));
    }

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

    shapes.cx = function (_) {
      if (!arguments.length) { return cxValue; }
      cxValue = _;
      return shapes;
    };

    shapes.cy = function (_) {
      if (!arguments.length) { return cyValue; }
      cyValue = _;
      return shapes;
    };

    shapes.radius = function (_) {
      if (!arguments.length) { return radius; }
      radius = _;
      return shapes;
    };

    shapes.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return shapes;
    };

    shapes.circleClass = function (_) {
      if (!arguments.length) { return circleClass; }
      circleClass = _;
      return shapes;
    };

    shapes.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return shapes;
    };

    shapes.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return shapes;
    };

    shapes.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = _;
      return shapes;
    };

    shapes.strokeWidth = function (_) {
      if (!arguments.length) { return strokeWidth; }
      strokeWidth = _;
      return shapes;
    };

    return shapes;
  };
});
