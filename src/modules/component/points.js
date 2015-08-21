define(function (require) {
  var d3 = require("d3");
  var circle = require("src/modules/element/svg/circle");
  var constructor = require("src/modules/component/build");

  return function points() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var radius = 5;
    var properties = {
      class: "area",
      fill: function (d, i) { return d3.scale.category10()(i); },
      stroke: function (d, i) { return d3.scale.category10()(i); },
      strokeWidth: 0,
      opacity: 1
    };

    function component(selection) {
      selection.each(function (data, index) {
        var circles = circle().cx(x).cy(y).radius(radius);

        var element = constructor()
          .function(circles)
          .options(properties);

        d3.select(this).append("g")
          .datum(d3.merge(data))
          .call(element);
      });
    }

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
