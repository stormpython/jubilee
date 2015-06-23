define(function (require) {
  var d3 = require("d3");
  var event = require("src/modules/component/events/events");

  return function circle() {
    var cx = function (d) { return d.x; };
    var cy = function (d) { return d.y; };
    var radius = 5;
    var color = d3.scale.category10();
    var values = null;

    // Options
    var cssClass = "circles";
    var fill = null;
    var stroke = null;
    var strokeWidth = 0;
    var opacity = null;
    var events = {
      mouseover: function () {},
      mouseout: function () {},
      click: function () {}
    };

    function element(selection) {
      selection.each(function (data, index) {
        var circles = d3.select(this).selectAll("circle")
          .data(values ? values : data);

        var circleEvents = event()
          .mouseover(events.mouseover)
          .mouseout(events.mouseout)
          .click(events.click);

        // Exit
        circles.exit().remove();

        // Enter
        circles
          .enter().append("circle");

        // Update
        circles
          .attr("class", cssClass)
          .attr("fill", fill ? fill : colorFill)
          .attr("stroke", stroke ? stroke : colorFill)
          .attr("stroke-width", strokeWidth)
          .attr("r", radius)
          .attr("cx", cx)
          .attr("cy", cy)
          .style("opacity", opacity);

        circles.call(circleEvents);
      });
    }

    function colorFill (d, i) {
      return color(d, i);
    }

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

    element.radius = function (_) {
      if (!arguments.length) { return radius; }
      radius = _;
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

    element.events = function (_) {
      if (!arguments.length) { return events; }
      events.mouseover = typeof _.mouseover !== "undefined" ? _.mouseover : events.mouseover;
      events.mouseout = typeof _.mouseout !== "undefined" ? _.mouseout : events.mouseout;
      events.click = typeof _.click !== "undefined" ? _.click : events.click;
      return element;
    };

    return element;
  };
});
