define(function (require) {
  var d3 = require("d3");

  return function circle() {
    var cx = function (d) { return d.x; };
    var cy = function (d) { return d.y; };

    // Options
    var radius = 5;
    var gClass = "layer";
    var circleClass = "circles";
    var color = d3.scale.category20c();
    var fill = function (d, i, j) { return color(j); };
    var stroke = function (d, i, j) { return color(j); };
    var strokeWidth = 3;

    function shape(selection) {
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
          .attr("cx", cx)
          .attr("cy", cy);
      });
    }

    shape.cx = function (_) {
      if (!arguments.length) { return cx; }
      cx = _;
      return shape;
    };

    shape.cy = function (_) {
      if (!arguments.length) { return cy; }
      cy = _;
      return shape;
    };

    shape.radius = function (_) {
      if (!arguments.length) { return radius; }
      radius = _;
      return shape;
    };

    shape.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return shape;
    };

    shape.circleClass = function (_) {
      if (!arguments.length) { return circleClass; }
      circleClass = _;
      return shape;
    };

    shape.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
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
