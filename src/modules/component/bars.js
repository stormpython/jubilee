define(function (require) {
  var d3 = require("d3");
  var rect = require("src/modules/element/svg/rect");
  var functor = require("src/modules/functor");

  return function points() {
    // Private variables
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y0 + d.y; };
    var xScale = d3.time.scale.utc();
    var yScale = d3.scale.linear();
    var rx = 0;
    var ry = 0;
    var padding = 0.4;
    var properties = {
      class: "point",
      fill: function (d, i) { return d3.scale.category10()(i); },
      stroke: function (d, i) { return d3.scale.category10()(i); },
      strokeWidth: 0,
      opacity: 1
    };

    function component(selection) {
      selection.each(function (data, index) {
        // Used only to determine the width of bars
        // for time scales
        var timeScale = d3.scale.ordinal()
          .domain(xScale.domain())
          .rangeBands(xScale.range(), padding, 0);

        var rects = rect()
          .x(function (d, i) {
            return xScale(x.call(this, d, i));
          })
          .y(function (d, i) {
            return yScale(d.y0 + y.call(this, d, i));
          })
          .width(function () {
            return timeScale.rangeBand();
          })
          .height(function (d, i) {
            return yScale(d.y0) - yScale(d.y0 + y.call(this, d, i));
          })
          .rx(rx)
          .ry(ry);

        var element = functor()
          .function(rects)
          .options(properties);

        d3.select(this).selectAll("g")
          .data(data)
          .enter().append("g")
          .call(element);
      });
    }

    // Public API
    component.x = function (_) {
      if (!arguments.length) { return x; }
      x = _;
      return component;
    };

    component.y = function (_) {
      if (!arguments.length) { return y; }
      y = _;
      return component;
    };

    component.rx = function (_) {
      if (!arguments.length) { return rx; }
      rx = _;
      return component;
    };

    component.ry = function (_) {
      if (!arguments.length) { return ry; }
      ry = _;
      return component;
    };

    component.padding = function (_) {
      if (!arguments.length) { return padding; }
      padding = _;
      return component;
    };

    component.xScale = function (_) {
      if (!arguments.length) { return xScale; }
      xScale = _;
      return component;
    };

    component.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale = _;
      return component;
    };

    component.properties = function (_) {
      if (!arguments.length) { return properties; }
      properties.class = typeof _.class !== "undefined" ? _.class : properties.class;
      properties.fill = typeof _.fill !== "undefined" ? _.fill : properties.fill;
      properties.stroke = typeof _.stroke !== "undefined" ? _.stroke : properties.stroke;
      properties.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : properties.strokeWidth;
      properties.opacity = typeof _.opacity !== "undefined" ? _.opacity : properties.opacity;
      return component;
    };

    return component;
  };
});