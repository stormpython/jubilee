define(function (require) {
  var d3 = require("d3");

  var addEventListener = require("src/modules/helpers/add_event_listener");
  var axis = require("src/modules/component/axis");
  var brushComponent = require("src/modules/component/brush");
  var circle = require("src/modules/element/svg/circle");
  var clip = require("src/modules/element/svg/clipPath");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var path = require("src/modules/element/svg/path");
  var mapDomain = require("src/modules/helpers/map_domain");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");
  var scaleValue = require("src/modules/helpers/scale_value");
  var zeroAxisLine = require("src/modules/element/svg/line");
  var clipPathOptions = require("src/modules/helpers/options/clippath");
  var axisAPI = require("src/modules/helpers/api/axis");
  var circlesAPI = require("src/modules/helpers/api/circles");
  var clippathAPI = require("src/modules/helpers/api/clippath");
  var linesAPI = require("src/modules/helpers/api/lines");
  var marginAPI = require("src/modules/helpers/api/margin");
  var scaleAPI = require("src/modules/helpers/api/scale");
  var zeroLineAPI = require("src/modules/helpers/api/zero_line");

  return function () {
    var Series = require("src/modules/chart/series");

    function LineChart(selection) {
      if (!(this instanceof LineChart)) {
        return new LineChart(selection);
      }
      Series.apply(this, selection);

      var xScale = this.xScale();
      var yScale = this.yScale();
      var xValue = this.x();
      var yValue = this.y();
      var color = this.color();
      var interpolate = this.interpolate();
      var tension = this.tension();
      var defined = this.defined();
      var listeners = this.listeners();
      var clipPath = deepCopy(clipPathOptions, {});

      // Line Options
      var lines = {
        groupClass: "paths",
        lineClass: "line",
        stroke: function (d, i, j) { return i; },
        strokeWidth: 3,
        opacity: 1
      };

      // Circle Options
      var circles = {
        show: false,
        groupClass: "circle layer",
        circleClass: "circle",
        fill: function (d, i, j) { return j; },
        stroke: null,
        radius: 5,
        strokeWidth: 3
      };

      selection.each(function (data, index) {
        var X = scaleValue(xScale, xValue);
        var Y = scaleValue(yScale, yValue);
        var line = d3.svg.line().x(X).y(Y)
          .interpolate(interpolate)
          .tension(tension)
          .defined(defined);

        var linePath = path()
          .pathGenerator(line)
          .cssClass(lines.lineClass)
          .stroke(function (d, i, j) {
            return color(lines.stroke.call(null, d, i, j));
          })
          .strokeWidth(lines.strokeWidth)
          .opacity(lines.opacity)
          .listeners(listeners);

        g.append("g")
          .attr("class", lines.groupClass)
          .call(linePath);

        if (circles.show) {
          var clippath = clip()
            .width(clipPath.width || xScale.range()[1])
            .height(clipPath.height || yScale.range()[0]);

          var points = circle()
            .cx(X)
            .cy(Y)
            .color(color)
            .radius(circles.radius)
            .cssClass(circles.circleClass)
            .fill(function (d, i, j) {
              return circles.fill.call(null, d, i, j);
            })
            .stroke(circles.stroke ? circles.stroke : circles.fill)
            .strokeWidth(circles.strokeWidth)
            .listeners(listeners);

          g.call(clippath)
            .append("g")
            .attr("clip-path", "url(#" + clippath.id() + ")")
            .selectAll("gCircles")
            .data(function (d) { return d; })
            .enter().append("g")
            .attr("class", circles.groupClass)
            .datum(function (d) { return d; })
            .call(points);
        }
      });

      // Public API
      this.clipPath = function (_) {
        if (!arguments.length) { return clipPath; }
        clipPath = clippathAPI(_, clipPath);
        return this;
      };

      this.lines = function (_) {
        if (!arguments.length) { return lines; }
        lines = linesAPI(_, lines);
        return this;
      };

      this.circles = function (_) {
        if (!arguments.length) { return circles; }
        circles = circlesAPI(_, circles);
        return this;
      };
    }

    debugger;
    LineChart.prototype = Object.create(Series.prototype);

    return LineChart;
  };
});
