define(function (require) {
  var d3 = require("d3");
  var circle = require("src/modules/element/svg/circle");
  var functor = require("src/modules/functor");

  return function points() {
    // Private variables
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.time.scale.utc();
    var yScale = d3.scale.linear();
    var radius = 5;
    var properties = {
      class: "point",
      fill: function (d, i) { return d3.scale.category10()(i); },
      stroke: function (d, i) { return d3.scale.category10()(i); },
      strokeWidth: 0,
      opacity: 1
    };

    function component(selection) {
      selection.each(function (data, index) {
        var circles = circle().cx(X).cy(Y).radius(radius);

        var element = functor()
          .function(circles)
          .options(properties);

        d3.select(this).append("g")
          .datum(d3.merge(data))
          .call(element);
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
      x = _;
      return component;
    };

    component.y = function (_) {
      if (!arguments.length) { return y; }
      y = _;
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

    component.radius = function (_) {
      if (!arguments.length) { return radius; }
      radius = _;
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
