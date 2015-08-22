define(function (require) {
  var d3 = require("d3");
  var path = require("src/modules/element/svg/path");
  var constructor = require("src/modules/component/build");

  return function line() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var xScale = d3.time.scale.utc();
    var yScale = d3.scale.linear();
    var interpolate = "linear";
    var tension = 0.7;
    var defined = function (d) { return d.y !== null; };
    var properties = {
      class: "line",
      fill: "none",
      stroke: function (d, i) { return d3.scale.category10()(i); },
      strokeWidth: 3,
      opacity: 1
    };

    function component(selection) {
      selection.each(function (data, index) {
        var lines = d3.svg.line().x(X).y(Y)
          .interpolate(interpolate)
          .tension(tension)
          .defined(defined);

        var linePath = path().pathGenerator(lines);

        var build = constructor()
          .function(linePath)
          .options(properties);

        d3.select(this).append("g").call(build);
      });
    }

    function X(d, i) {
      return xScale(x.call(this, d, i));
    }

    function Y(d, i) {
      return yScale(y.call(this, d, i));
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
