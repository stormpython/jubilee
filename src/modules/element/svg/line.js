define(function (require) {
  var d3 = require("d3");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var eventOptions = require("src/modules/helpers/options/events");
  var eventAPI = require("src/modules/helpers/api/events");
  var attachEvents = require("src/modules/helpers/attach_events");

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
    var events = deepCopy(eventOptions, {});

    function element(selection) {
      selection.each(function (data, index) {
        var lines = d3.select(this).selectAll("lines")
          .data(values ? values : data);

        var lineEvents = attachEvents(events);

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
      return color(d, i);
    }

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

    element.events = function (_) {
      if (!arguments.length) { return events; }
      events = eventAPI(_, events);
      return element;
    };

    return element;
  };
});