define(function (require) {
  var d3 = require("d3");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var event = require("src/modules/component/events/events");
  var eventOptions = require("src/modules/helpers/options/events");
  var eventAPI = require("src/modules/helpers/api/events");

  return function rect() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var rx = 0;
    var ry = 0;
    var width = null;
    var height = null;
    var values = null;

    // Options
    var color = d3.scale.category10();
    var cssClass = "bar";
    var fill = null;
    var stroke = null;
    var strokeWidth = 0;
    var opacity = null;
    var events = deepCopy(eventOptions, {});

    function element(selection) {
      selection.each(function (data, index) {
        var bars = d3.select(this).selectAll("rect")
          .data(values ? values : data);

        var rectEvents = event()
          .mouseover(events.mouseover)
          .mouseout(events.mouseout)
          .click(events.click);

        bars.exit().remove();

        bars.enter().append("rect");

        bars
          .attr("class", cssClass)
          .attr("fill", fill ? fill : colorFill)
          .attr("stroke", stroke ? stroke : colorFill)
          .attr("stroke-width", strokeWidth)
          .attr("x", x)
          .attr("y", y)
          .attr("rx", rx)
          .attr("ry", ry)
          .attr("width", width)
          .attr("height", height)
          .style("opacity", opacity);

        bars.call(rectEvents);
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

    element.x = function (_) {
      if (!arguments.length) { return x; }
      x = _;
      return element;
    };

    element.y = function (_) {
      if (!arguments.length) { return y; }
      y = _;
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

    element.width = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return element;
    };

    element.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return element;
    };

    element.cssClass= function (_) {
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

    element.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
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
