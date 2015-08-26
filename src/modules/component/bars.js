define(function (require) {
  var d3 = require("d3");
  var rect = require("src/modules/element/svg/rect");
  var functor = require("src/modules/functor");
  var valuator = require("src/modules/valuator");

  return function points() {
    // Private variables
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y0 + d.y; };
    var xScale = d3.time.scale.utc();
    var yScale = d3.scale.linear();
    var rx = 0;
    var ry = 0;
    var group = false;
    var interval = "30s";
    var padding = 0.1;
    var groupPadding = 0;
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
          .domain(d3.merge(data).map(function (d, i) {
            return x.call(this, d, i);
          }))
          .rangeBands(xScale.range(), padding, 0);

        var groupScale = d3.scale.ordinal()
          .domain(d3.range(data.length))
          .rangeRoundBands([0, timeScale.rangeBand()], groupPadding, 0);

        var j = -1;

        var rects = rect()
          .x(function (d, i) {
            if (i === 0) { j++; }
            if (group) { return xScale(x.call(this, d, i)) + groupScale(j); }
            return xScale(x.call(this, d, i));
          })
          .y(function (d, i) {
            if (group) { return yScale(y.call(this, d, i)); }
            return yScale(d.y0 + y.call(this, d, i));
          })
          .width(function () {
            if (group) { return groupScale.rangeBand(); }
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

        d3.select(this).append("g").selectAll("g")
          .data(data)
          .enter().append("g")
          .call(element);
      });
    }

    // Public API
    component.x = function (_) {
      if (!arguments.length) { return x; }
      x = valuator(_);
      return component;
    };

    component.y = function (_) {
      if (!arguments.length) { return y; }
      y = valuator(_);
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

    component.interval = function (_) {
      if (!arguments.length) { return interval; }
      interval = _;
      return component;
    };

    component.group = function (_) {
      if (!arguments.length) { return group; }
      group = _;
      return component;
    };

    component.padding = function (_) {
      if (!arguments.length) { return padding; }
      padding = _;
      return component;
    };

    component.groupPadding = function (_) {
      if (!arguments.length) { return groupPadding; }
      groupPadding = _;
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