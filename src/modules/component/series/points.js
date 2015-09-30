define(function (require) {
  var d3 = require("d3");
  var circle = require("src/modules/element/svg/circle");
  var builder = require("builder");
  var valuator = require("valuator");

  return function points() {
    // Private variables
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.time.scale.utc();
    var yScale = d3.scale.linear();
    var domain = { xMin: null, xMax: null, yMin: null, yMax: null };
    var radius = 5;
    var properties = {
      class: "point",
      fill: function (d, i) { return d3.scale.category10()(i); },
      stroke: function (d, i) { return d3.scale.category10()(i); },
      strokeWidth: 0,
      opacity: 1
    };

    function component(selection) {
      selection.each(function (data) {
        xScale.domain([
          domain.xMin || d3.min(d3.merge(data), x),
          domain.xMax || d3.max(d3.merge(data), x)
        ]);

        yScale.domain([
          domain.yMin || d3.min(d3.merge(data), y),
          domain.yMax || d3.max(d3.merge(data), y)
        ]);

        var circles = circle()
          .cx(X)
          .cy(Y)
          .radius(radius);

        d3.select(this).append("g")
          .datum(data.reduce(function (a, b) {
            return a.concat(b);
          },[]).filter(y))
          .call(builder(properties, circles));
      });
    }

    function X(d, i) {
      return xScale(x.call(this, d, i));
    }

    function Y(d, i) {
      return yScale(y.call(this, d, i));
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

    component.radius = function (_) {
      if (!arguments.length) { return radius; }
      radius = _;
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
