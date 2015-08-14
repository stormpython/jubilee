define(function (require) {
  var d3 = require("d3");
  var events = require("src/modules/component/events");

  return function line() {
    var x1 = null;
    var x2 = null;
    var y1 = null;
    var y2 = null;
    var color = d3.scale.category10();
    var values = null;

    var cssClass = "line";
    var stroke = null;
    var strokeWidth = 2;
    var opacity = null;
    var listeners = {};

    function element(selection) {
      selection.each(function (data, index) {
        var lineEvents = events().listeners(listeners);

        var lines = d3.select(this).selectAll("lines")
          .data(values ? values : data);

        // Exit
        lines.exit().remove();

        // Enter
        lines.enter().append("line");

        // Update
        lines
          .attr("class", cssClass)
          .attr("x1", x1)
          .attr("x2", x2)
          .attr("y1", y1)
          .attr("y2", y2)
          .attr("stroke", stroke ? stroke : colorFill)
          .attr("stroke-width", strokeWidth)
          .style("opacity", opacity);

        lines.call(lineEvents);
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
    
    element.x1 = function (_) {
      if (!arguments.length) { return x1; }
      x1 = _;
      return element;
    };

    element.x2 = function (_) {
      if (!arguments.length) { return x2; }
      x2 = _;
      return element;
    };

    element.y1 = function (_) {
      if (!arguments.length) { return y1; }
      y1 = _;
      return element;
    };

    element.y2 = function (_) {
      if (!arguments.length) { return y2; }
      y2 = _;
      return element;
    };

    element.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return element;
    };

    element.cssClass = function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
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