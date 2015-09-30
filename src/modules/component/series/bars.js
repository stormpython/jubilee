define(function (require) {
  var d3 = require("d3");
  var rect = require("src/modules/element/svg/rect");
  var builder = require("builder");
  var valuator = require("valuator");
  var parseTime = require("src/modules/helpers/timeparser");

  return function points() {
    // Private variables
    var color = d3.scale.category10();
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y0 + d.y; };
    var xScale = d3.time.scale.utc();
    var yScale = d3.scale.linear();
    var rx = 0;
    var ry = 0;
    var offset = "zero";
    var order = "default";
    var out = function (d, y0, y) {
      d.y0 = y0;
      d.y = y;
    };
    var domain = { xMin: null, xMax: null, yMin: null, yMax: null };
    var group = false;
    var interval = "30s";
    var padding = 0.1;
    var groupPadding = 0;
    var properties = {
      class: "point",
      fill: function (d, i) { return color(i); },
      stroke: function (d, i) { return color(i); },
      strokeWidth: 0,
      opacity: 1
    };

    function component(selection) {
      selection.each(function (data) {
        var stack = d3.layout.stack()
          .x(x)
          .y(y)
          .offset(offset)
          .order(order)
          .out(out);

        data = stack(data);

        var timeNotation = parseTime(interval);
        var extent = d3.extent(d3.merge(data), x);
        var step = parseFloat(interval);
        var start = extent[0];
        var stop = d3.time[timeNotation].offset(extent[1], step);

        xScale.domain([
          domain.xMin || d3.min(d3.merge(data), x),
          domain.xMax || d3.time[timeNotation]
            .offset(d3.max(d3.merge(data), x), offset)
        ]);

        yScale.domain([
          domain.yMin || Math.min(0, d3.min(d3.merge(data), accessor)),
          domain.yMax || Math.max(0, d3.max(d3.merge(data), accessor))
        ]);

        // Used only to determine the width of bars for time scales
        var timeScale = d3.scale.ordinal()
          .domain(d3.time[timeNotation].range(start, stop, step))
          .rangeBands(xScale.range(), padding, 0);

        var groupScale = d3.scale.ordinal()
          .domain(d3.range(data.length))
          .rangeRoundBands([0, timeScale.rangeBand()], groupPadding, 0);

        var j = -1;

        var rects = rect()
          .x(function (d, i) {
            if (group) {
              if (i === 0) { j++; }
              return xScale(x.call(this, d, i)) + groupScale(j);
            }
            return xScale(x.call(this, d, i));
          })
          .y(function (d, i) {
            if (group) {
              return yScale(y.call(this, d, i));
            }
            return yScale(d.y0 + Math.abs(y.call(this, d, i)));
          })
          .width(function () {
            if (group) {
              return groupScale.rangeBand();
            }
            return timeScale.rangeBand();
          })
          .height(function (d, i) {
            return yScale(d.y0) - yScale(d.y0 + Math.abs(y.call(this, d, i)));
          })
          .rx(rx)
          .ry(ry);

        d3.select(this).append("g")
          .selectAll("g")
          .data(data)
          .enter().append("g")
          .call(builder(properties, rects));
      });
    }

    function accessor(d, i) {
      if (group) { return y.call(this, d, i); }
      return d.y0 + y.call(this, d, i);
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

    component.offset = function (_) {
      if (!arguments.length) { return offset; }
      offset = _;
      return component;
    };

    component.order = function (_) {
      if (!arguments.length) { return order; }
      order = _;
      return component;
    };

    component.out = function (_) {
      if (!arguments.length) { return out; }
      out = _;
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

    component.domain = function (_) {
      if (!arguments.length) { return domain; }
      domain.xMin = typeof _.xMin !== "undefined" ? _.xMin : domain.xMin;
      domain.xMax = typeof _.xMax !== "undefined" ? _.xMax : domain.xMax;
      domain.yMin = typeof _.yMin !== "undefined" ? _.yMin : domain.yMin;
      domain.yMax = typeof _.yMax !== "undefined" ? _.yMax : domain.yMax;
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