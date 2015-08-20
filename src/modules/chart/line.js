define(function (require) {
  var d3 = require("d3");
  var events = require("src/modules/component/events");

  var addEventListener = require("src/modules/helpers/add_event_listener");
  var axis = require("src/modules/component/axis");
  var brushComponent = require("src/modules/component/brush");
  var circle = require("src/modules/element/svg/circle");
  var clip = require("src/modules/element/svg/clipPath");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var path = require("src/modules/element/svg/path");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");
  var scaleValue = require("src/modules/helpers/scale_value");
  var zeroAxisLine = require("src/modules/element/svg/line");

  var clipPathOptions = require("src/modules/helpers/options/clippath");
  var marginOptions = require("src/modules/helpers/options/margin");
  var scaleOptions = require("src/modules/helpers/options/scale");
  var xAxisOptions = require("src/modules/helpers/options/x_axis");
  var yAxisOptions = require("src/modules/helpers/options/y_axis");
  var zeroLineOptions = require("src/modules/helpers/options/zero_line");

  var axisAPI = require("src/modules/helpers/api/axis");
  var circlesAPI = require("src/modules/helpers/api/circles");
  var clippathAPI = require("src/modules/helpers/api/clippath");
  var linesAPI = require("src/modules/helpers/api/lines");
  var marginAPI = require("src/modules/helpers/api/margin");
  var scaleAPI = require("src/modules/helpers/api/scale");
  var zeroLineAPI = require("src/modules/helpers/api/zero_line");

  return function lineChart() {
    // Chart options
    var margin = deepCopy(marginOptions, {});
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var accessor = function (d) { return d; };
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var defined = function () { return true; };
    var interpolate = "linear";
    var tension = 0.7;

    // Scale options
    var xScaleOpts = deepCopy(scaleOptions, {});
    var yScaleOpts = deepCopy(scaleOptions, {});
    var xScale;
    var yScale;

    // Other options
    var axisX = deepCopy(xAxisOptions, {});
    var axisY = deepCopy(yAxisOptions, {});
    var clipPath = deepCopy(clipPathOptions, {});
    var zeroLine = deepCopy(zeroLineOptions, {});
    var listeners = {};

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
      strokeWidth: 3,
      opacity: 1
    };

    function chart(selection) {
      selection.each(function (data, index) {
        // Allows chart to accept an array or object
        data = accessor.call(this, data, index);

        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        xScale = xScaleOpts.scale || d3.time.scale.utc();
        xScale.domain(xScaleOpts.domain || d3.extent(d3.merge(data), xValue));

        if (typeof xScale.rangeBands === "function") {
          xScale.rangeBands([0, adjustedWidth, 0.1]);
        } else {
          xScale.range([0, adjustedWidth]);
        }

        yScale = yScaleOpts.scale || d3.scale.linear();
        yScale.domain(yScaleOpts.domain || d3.extent(d3.merge(data), yValue))
          .range([adjustedHeight, 0]);

        if (xScaleOpts.nice) { xScale.nice(); }
        if (yScaleOpts.nice) { yScale.nice(); }

        var svgEvents = events().listeners(listeners).accessor(xValue);

        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width)
          .attr("height", height);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
          .call(svgEvents);

        // Brush
        if (listeners.brush && listeners.brush.length) {
          var brush = brushComponent()
            .height(adjustedHeight)
            .xScale(xScale)
            .brushend(listeners.brush);

          g.call(brush);
        }

        var X = scaleValue(xScale, xValue);
        var Y = scaleValue(yScale, yValue);
        var line = d3.svg.line().x(X).y(Y)
          .interpolate(interpolate)
          .tension(tension)
          .defined(defined);

        var linePath = path()
          .pathGenerator(line)
          .class(lines.lineClass)
          .stroke(function (d, i, j) {
            return color(lines.stroke.call(null, d, i, j));
          })
          .strokeWidth(lines.strokeWidth)
          .opacity(lines.opacity);

        if (axisX.show) {
          var xAxis = axis()
            .scale(xScale)
            .class(axisX.gClass)
            .transform(axisX.transform || "translate(0," + (yScale.range()[0] + 1) + ")")
            .tick(axisX.tick)
            .title(axisX.title);

          g.call(xAxis);
        }

        if (axisY.show) {
          var yAxis = axis()
            .scale(yScale)
            .orient("left")
            .class(axisY.gClass)
            .transform(axisY.transform || "translate(-1,0)")
            .tick(axisY.tick)
            .title(axisY.title);

          g.call(yAxis);
        }

        g.append("g")
          .attr("class", lines.groupClass)
          .call(linePath);

        if (zeroLine.add) {
          var zLine = zeroAxisLine()
            .class(zeroLine.lineClass)
            .x1(function () { return xScale.range()[0]; })
            .x2(function () { return xScale.range()[1]; })
            .y1(function () { return yScale(0); })
            .y2(function () { return yScale(0); })
            .stroke(zeroLine.stroke)
            .strokeWidth(zeroLine.strokeWidth)
            .opacity(zeroLine.opacity);

          g.call(zLine);
        }

        if (circles.show) {
          var clippath = clip()
            .width(clipPath.width || adjustedWidth)
            .height(clipPath.height || adjustedHeight);

          var points = circle()
            .cx(X)
            .cy(Y)
            .radius(circles.radius)
            .class(circles.circleClass)
            .fill(function (d, i, j) {
              return circles.fill.call(null, d, i, j);
            })
            .stroke(circles.stroke ? circles.stroke : circles.fill)
            .strokeWidth(circles.strokeWidth)
            .opacity(circles.opacity);

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
    }

    // Public API
    chart.margin = function (_) {
      if (!arguments.length) { return margin; }
      margin = marginAPI(_, margin);
      return chart;
    };

    chart.width = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return chart;
    };

    chart.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return chart;
    };

    chart.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return chart;
    };

    chart.x = function (_) {
      if (!arguments.length) { return xValue; }
      xValue = _;
      return chart;
    };

    chart.y = function (_) {
      if (!arguments.length) { return yValue; }
      yValue = _;
      return chart;
    };

    chart.defined = function (_) {
      if (!arguments.length) { return defined; }
      defined = _;
      return chart;
    };

    chart.interpolate = function (_) {
      if (!arguments.length) { return interpolate; }
      interpolate = _;
      return chart;
    };

    chart.tension = function (_) {
      if (!arguments.length) { return tension; }
      tension = _;
      return chart;
    };

    chart.xScale = function (_) {
      if (!arguments.length) { return xScaleOpts; }
      xScaleOpts = scaleAPI(_, xScaleOpts);
      return chart;
    };

    chart.yScale = function (_) {
      if (!arguments.length) { return yScaleOpts; }
      yScaleOpts = scaleAPI(_, yScaleOpts);
      return chart;
    };

    chart.xAxis = function (_) {
      if (!arguments.length) { return axisX; }
      axisX = axisAPI(_, axisX);
      return chart;
    };

    chart.yAxis = function (_) {
      if (!arguments.length) { return axisY; }
      axisY = axisAPI(_, axisY);
      return chart;
    };

    chart.clipPath = function (_) {
      if (!arguments.length) { return clipPath; }
      clipPath = clippathAPI(_, clipPath);
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) { return zeroLine; }
      zeroLine = zeroLineAPI(_, zeroLine);
      return chart;
    };

    chart.lines = function (_) {
      if (!arguments.length) { return lines; }
      lines = linesAPI(_, lines);
      return chart;
    };

    chart.circles = function (_) {
      if (!arguments.length) { return circles; }
      circles = circlesAPI(_, circles);
      return chart;
    };

    chart.listeners = function (_) {
      if (!arguments.length) { return listeners; }
      listeners = _;
      return chart;
    };

    chart.on = addEventListener(chart);

    chart.off = removeEventListener(chart);

    return chart;
  };
});
