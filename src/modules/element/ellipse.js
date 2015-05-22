define(function (require) {
  var d3 = require("d3");

  return function ellipse() {
    var cx = function (d) { return d.x; };
    var cy = function (d) { return d.y; };
    var rx = 20;
    var ry = 20;
    var color = d3.scale.category20c();

    // Options
    var ellipseClass = "ellipses";
    var fill = function (d, i) { return color(i); };
    var stroke = null;
    var strokeWidth = 0;

    function element(selection) {
      selection.each(function (data, i) {
        var ellipses = d3.select(this).selectAll("ellipsePoints")
          .data(data);

        // Exit
        ellipses.exit().remove();

        // Enter
        ellipses
          .enter().append("ellipse")
          .attr("class", ellipseClass);

        // Update
        ellipses
          .attr("fill", fill)
          .attr("stroke", stroke ? stroke : fill)
          .attr("stroke-width", strokeWidth)
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("rx", rx)
          .attr("ry", ry);
      });
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

    element.rx = function (_) {
      if (!arguments.length) { return rx; }
      rx = _;
      return element;
    };

    element.ry = function (_) {
      if (!arguments.length) { return ry; }
      ry = _;
      return element;
    };

    element.ellipseClass = function (_) {
      if (!arguments.length) { return ellipseClass; }
      ellipseClass = _;
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
