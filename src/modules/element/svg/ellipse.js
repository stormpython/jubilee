define(function (require) {
  var d3 = require("d3");
  var events = require("src/modules/component/events");

  return function ellipse() {
    var cx = function (d) { return d.x; };
    var cy = function (d) { return d.y; };
    var rx = 20;
    var ry = 20;
    var color = d3.scale.category20c();
    var values = null;

    // Options
    var cssClass = "ellipses";
    var fill = null;
    var stroke = null;
    var strokeWidth = 0;
    var opacity = null;
    var listeners = {};

    function element(selection) {
      selection.each(function (data, index) {
        var ellipseEvents = events()
          .listeners(listeners);

        var ellipses = d3.select(this).selectAll("ellipses")
          .data(values ? values : data);

        // Exit
        ellipses.exit().remove();

        // Enter
        ellipses.enter().append("ellipse");

        // Update
        ellipses
          .attr("class", cssClass)
          .attr("fill", fill ? fill : colorFill)
          .attr("stroke", stroke ? stroke : colorFill)
          .attr("stroke-width", strokeWidth)
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("rx", rx)
          .attr("ry", ry)
          .style("opacity", opacity);

        ellipses.call(ellipseEvents);
      });
    }

    function colorFill(d, i) {
      return color(i);
    }

    // Public API
    element.data = function (_) {
      if (!arguments.length) { return values; }
      values = _;
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

    element.cssClass = function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
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

    element.listeners = function (_) {
      if (!arguments.length) { return listeners; }
      listeners = _;
      return element;
    };

    return element;
  };
});
