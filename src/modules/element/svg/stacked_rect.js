define(function (require) {
  var d3 = require("d3");
  var rect = require("src/modules/element/svg/rect");

  return function stackedRect() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var rx = 0;
    var ry = 0;
    var width = null;
    var height = null;
    var values = null;

    // Options
    var color = d3.scale.category10();
    var groupClass = "stack";
    var cssClass = "bar";
    var fill = null;
    var stroke = null;
    var strokeWidth = 0;
    var opacity = null;
    var listeners = {};

    function element(selection) {
      selection.each(function (data, index) {
        var bars = rect()
          .cssClass(cssClass)
          .color(color)
          .fill(fill)
          .stroke(stroke)
          .strokeWidth(strokeWidth)
          .opacity(opacity)
          .rx(rx)
          .ry(ry)
          .x(x)
          .y(y)
          .width(width)
          .height(height)
          .listeners(listeners);

        var g = d3.select(this).selectAll("groups")
          .data(values ? values : data);

        // Exit
        g.exit().remove();

        // Enter
        g.enter().append("rect");

        // Update
        g.attr("class", groupClass).call(bars);
      });
    }

    // Public API
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

    element.groupClass= function (_) {
      if (!arguments.length) { return groupClass; }
      groupClass = _;
      return element;
    };

    element.cssClass= function (_) {
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