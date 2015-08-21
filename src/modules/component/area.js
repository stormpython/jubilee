define(function (require) {
  var d3 = require("d3");
  var path = require("src/modules/element/svg/path");
  var constructor = require("src/modules/component/build");

  return function area() {
    var x = function (d) { return d.x; };
    var y0 = function (d) { return d.y0; };
    var y1 = function (d) { return d.y; };
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
      selection.each(function (data, index) {
        var areas = d3.svg.area().x(x).y0(y0).y1(y1)
          .interpolate(interpolate)
          .tension(tension)
          .defined(defined);

        var areaPath = path().pathGenerator(areas);

        var build = constructor()
          .function(areaPath)
          .options(properties);

        d3.select(this).append("g").call(build);
      });
    }

    component.x = function (_) {
      if (!arguments.length) { return x; }
      x = _;
      return component;
    };

    component.y0 = function (_) {
      if (!arguments.length) { return y0; }
      y0 = _;
      return component;
    };

    component.y1 = function (_) {
      if (!arguments.length) { return y1; }
      y1 = _;
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