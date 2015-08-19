define(function (require) {
  var d3 = require("d3");

  return function circle() {
    var accessor = function (d) { return d; };
    var cx = function (d) { return d.x; };
    var cy = function (d) { return d.y; };
    var radius = 5;

    // Options
    var cssClass = "circles";
    var fill = colorFill;
    var stroke = colorFill;
    var strokeWidth = 0;
    var opacity = null;

    function element(selection) {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var circles = d3.select(this).selectAll("circle")
          .data(data);

        // Exit
        circles.exit().remove();

        // Enter
        circles
          .enter().append("circle");

        // Update
        circles
          .attr("class", cssClass)
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("r", radius)
          .attr("cx", cx)
          .attr("cy", cy)
          .style("opacity", opacity);
      });
    }

    function colorFill (d, i) {
      return d3.scale.category10()(i);
    }

    // Public API
    element.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return element;
    };

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

    element.class = function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
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
