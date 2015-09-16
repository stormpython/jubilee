define(function (require) {
  var d3 = require("d3");
  var path = require("src/modules/element/svg/path");
  var builder = require("builder");
  var valuator = require("valuator");

  return function area() {
    // Private variables
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.time.scale.utc();
    var yScale = d3.scale.linear();
    var offset = "zero";
    var order = "default";
    var out = function stackOut(d, y0, y) {
      d.y0 = y0;
      d.y = y;
    };
    var interpolate = "linear";
    var tension = 0.7;
    var defined = function (d) { return d.y !== null; };
    var properties = {
      class: "area",
      fill: function (d, i) { return d3.scale.category10()(i); },
      stroke: function (d, i) { return d3.scale.category10()(i); },
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

        xScale.domain(d3.extent(d3.merge(data), xAccessor));

        yScale.domain([
          Math.min(0, d3.min(d3.merge(data), yAccessor)),
          Math.max(0, d3.max(d3.merge(data), yAccessor))
        ]);

        var areas = d3.svg.area()
          .x(X)
          .y0(Y0)
          .y1(Y1)
          .interpolate(interpolate)
          .tension(tension)
          .defined(defined);

        var areaPath = path()
          .pathGenerator(areas);

        d3.select(this)
          .data([data])
          .append("g")
          .call(builder(properties, areaPath));
      });
    }

    function xAccessor(d, i) {
      return x.call(this, d, i);
    }

    function yAccessor(d, i) {
      if (offset === "overlap") {
        return y.call(this, d, i);
      }
      return d.y0 + y.call(this, d, i);
    }

    function X(d, i) {
      return xScale(x.call(this, d, i));
    }

    function Y0(d) {
      var min = Math.max(0, yScale.domain()[0]);
      if (offset === "overlap") {
        return yScale(min);
      }
      return yScale(d.y0);
    }

    function Y1(d, i) {
      if (offset === "overlap") {
        return yScale(y.call(this, d, i));
      }
      return yScale(d.y0 + y.call(this, d, i));
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

    component.offset = function (_) {
      if (!arguments.length) { return offset; }
      offset = _;
      return component;
    };

    component.interpolate = function (_) {
      if (!arguments.length) { return interpolate; }
      interpolate = _;
      return component;
    };

    component.tension = function (_) {
      if (!arguments.length) { return tension; }
      tension = _;
      return component;
    };

    component.defined = function (_) {
      if (!arguments.length) { return defined; }
      defined = _;
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