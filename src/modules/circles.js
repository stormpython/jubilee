define(function (require) {
  var d3 = require('d3');

  return function circles () {
    var cxValue = function (d) { return xScale(d[0]); };
    var cyValue = function (d) { return yScale(d[1]); };
    var xScale;
    var yScale;

    // options
    var radius = 5;
    var circleClass = "circles";
    var color = d3.scale.category20c();
    var fill = function (d) { return color(d[2]); };
    var stroke = function (d) { return color(d[2]); };
    var strokeWidth = 3;

    function shapes(selection) {
      selection.each(function (data, i) {

        var layer = d3.select(this).selectAll("g")
          .data(function (d) { return d; });

        layer.enter().append("g").attr("class", "layer");

        var circles = layer.selectAll("circle")
          .data(function (d) { return d; });

        // Enter
        circles.enter().append("circle")
          .attr("class", circleClass);

        // Update
        circles
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("r", radius)
          .attr("cx", cxValue)
          .attr("cy", cyValue);

        // Exit
        circles.exit().remove(); 
      });
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
