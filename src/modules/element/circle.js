define(function (require) {
  var d3 = require("d3");

  return function circle() {
    var cx = function (d) { return d.x; };
    var cy = function (d) { return d.y; };
    var radius = 5;
    var color = d3.scale.category10();

    // Options
    var circleClass = "circles";
    var fill = null;
    var stroke = null;
    var strokeWidth = 0;
    var opacity = 1;

    function element(selection) {
      selection.each(function (data, i) {
        var circles = d3.select(this).selectAll("circle")
          .data(data);

        // Exit
        circles.exit().remove();

        // Enter
        circles
          .enter().append("circle")
          .attr("class", circleClass);

        // Update
        circles
          .attr("fill", fill ? fill : colorFill)
          .attr("stroke", stroke ? stroke : colorFill)
          .attr("stroke-width", strokeWidth)
          .attr("r", radius)
          .attr("cx", cx)
          .attr("cy", cy)
          .style("opacity", opacity);
      });
    }

    function colorFill (d, i) {
      return color(d, i);
    }

    element.cx = function (_) {
      if (!arguments.length) { return cx; }
      cx = _;
      return element;
    };

    element.cy = function (_) {
      if (!arguments.length) { return cy; }
      cy = _;
      return element;
    };

    element.radius = function (_) {
      if (!arguments.length) { return radius; }
      radius = _;
      return element;
    };

    element.circleClass = function (_) {
      if (!arguments.length) { return circleClass; }
      circleClass = _;
      return element;
    };

    element.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return element;
    };

    element.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return element;
    };

    element.opacity = function (_) {
      if (!arguments.length) { return opacity; }
      opacity = _;
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
