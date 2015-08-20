define(function (require) {
  var d3 = require("d3");
  var events = require("src/modules/component/events");

  var addEventListener = require("src/modules/helpers/add_event_listener");
  var axis = require("src/modules/component/axis");
  var brushComponent = require("src/modules/component/brush");
  var clip = require("src/modules/element/svg/clipPath");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var path = require("src/modules/element/svg/path");
  var scaleValue = require("src/modules/helpers/scale_value");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");
  var zeroAxisLine = require("src/modules/element/svg/line");

  // Options
  var clipPathOptions = require("src/modules/helpers/options/clippath");
  var marginOptions = require("src/modules/helpers/options/margin");
  var scaleOptions = require("src/modules/helpers/options/scale");
  var stackOptions = require("src/modules/helpers/options/stack");
  var xAxisOptions = require("src/modules/helpers/options/x_axis");
  var yAxisOptions = require("src/modules/helpers/options/y_axis");
  var zeroLineOptions = require("src/modules/helpers/options/zero_line");

  // API
  var axisAPI = require("src/modules/helpers/api/axis");
  var areaAPI = require("src/modules/helpers/api/area");
  var linesAPI = require("src/modules/helpers/api/lines");
  var marginAPI = require("src/modules/helpers/api/margin");
  var scaleAPI = require("src/modules/helpers/api/scale");
  var stackAPI = require("src/modules/helpers/api/stack");
  var clippathAPI = require("src/modules/helpers/api/clippath");
  var zeroLineAPI = require("src/modules/helpers/api/zero_line");

  return function areaChart() {
    // Chart options
    var margin = deepCopy(marginOptions, {});
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var accessor = function (d) { return d; };
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var interpolate = "linear";
    var defined = function () { return true; };

    // Scale options
    var xScaleOpts = deepCopy(scaleOptions, {});
    var yScaleOpts = deepCopy(scaleOptions, {});
    var xScale;
    var yScale;

    // Other options
    var axisX = deepCopy(xAxisOptions, {});
    var axisY = deepCopy(yAxisOptions, {});
    var clipPath = deepCopy(clipPathOptions, {});
    var stackOpts = deepCopy(stackOptions, {});
    var zeroLine = deepCopy(zeroLineOptions, {});

    var listeners = {};

    // Area options
    var areas = {
      groupClass: "paths",
      areaClass: "area",
      fill: function (d, i) { return color(i); },
      stroke: function (d, i) { return color(i); },
      strokeWidth: 0,
      opacity: 1
    };

    // Line options
    var lines = {
      show: false,
      groupClass: "paths",
      lineClass: "line",
      stroke: function (d, i) { return color(i); },
      strokeWidth: 3,
      opacity: 1,
      interpolate: interpolate,
      tension:  0.7
    };

    function chart(selection) {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        var stack = d3.layout.stack()
          .x(xValue)
          .y(yValue)
          .offset(stackOpts.offset)
          .order(stackOpts.order)
          .out(stackOpts.out);

        var layers = stack(data);

        // Scales
        xScale = xScaleOpts.scale || d3.time.scale.utc();
        xScale.domain(xScaleOpts.domain || d3.extent(d3.merge(layers), xValue));

        if (xScale.rangeBands) {
          xScale.rangeBands([0, adjustedWidth], 0.1);
        } else {
          xScale.range([0, adjustedWidth]);
        }

        yScale = yScaleOpts.scale || d3.scale.linear();
        yScale.domain(yScaleOpts.domain || [
            Math.min(0, d3.min(d3.merge(layers), Y)),
            Math.max(0, d3.max(d3.merge(layers), Y))
          ])
          .range([adjustedHeight, 0]);

        if (xScaleOpts.nice) { xScale.nice(); }
        if (yScaleOpts.nice) { yScale.nice(); }

        var svgEvents = events().listeners(listeners).accessor(xValue);

        // Canvas
        var svg = d3.select(this).selectAll("svg")
          .data([layers])
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

        // Add clippath and areas
        var X = scaleValue(xScale, xValue);

        var clippath = clip()
          .width(clipPath.width || adjustedWidth)
          .height(clipPath.height || adjustedHeight);

        var area = d3.svg.area().x(X).y0(Y0).y1(Y1)
          .interpolate(interpolate)
          .defined(defined);

        var areaPath = path()
          .pathGenerator(area)
          .class(areas.areaClass)
          .stroke(areas.stroke)
          .strokeWidth(areas.strokeWidth)
          .fill(areas.fill)
          .opacity(areas.opacity);

        g.call(clippath)
          .append("g")
          .attr("clip-path", "url(#" + clippath.id() + ")")
          .attr("class", areas.groupClass)
          .call(areaPath);

        // Add Lines
        if (lines.show) {
          var line = d3.svg.line().x(X).y(Y1)
            .interpolate(interpolate)
            .defined(defined);

          var linePath = path()
            .pathGenerator(line)
            .class(lines.lineClass)
            .stroke(lines.stroke)
            .strokeWidth(lines.strokeWidth)
            .opacity(lines.opacity);

          g.append("g").call(linePath);
        }

        // Zero-line
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

        // X axis
        if (axisX.show) {
          var xAxis = axis()
            .scale(xScale)
            .class(axisX.gClass)
            .transform(axisX.transform || "translate(0," + (yScale.range()[0] + 1) + ")")
            .tick(axisX.tick)
            .title(axisX.title);

          g.call(xAxis);
        }

        // Y axis
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
      });
    }

    function Y(d, i) {
      if (stackOpts.offset === "overlap") {
        return yValue.call(null, d, i);
      }
      return d.y0 + yValue.call(null, d, i);
    }

    function Y0(d) {
      var min = Math.max(0, yScale.domain()[0]);
      if (stackOpts.offset === "overlap") { return yScale(min); }
      return yScale(d.y0);
    }

    function Y1(d, i) {
      if (stackOpts.offset === "overlap") {
        return yScale(yValue.call(null, d, i));
      }
      return yScale(d.y0 + yValue.call(null, d, i));
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

    chart.stack = function (_) {
      if (!arguments.length) { return stackOpts; }
      stackOpts = stackAPI(_, stackOpts);
      return chart;
    };

    chart.clipPath = function (_) {
      if (!arguments.length) { return clipPath; }
      clipPath = clippathAPI(_, clipPath);
      return chart;
    };

    chart.area = function (_) {
      if (!arguments.length) { return areas; }
      areas = areaAPI(_, areas);
      return chart;
    };

    chart.lines = function (_) {
      if (!arguments.length) { return lines; }
      lines = linesAPI(_, lines);
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) { return zeroLine; }
      zeroLine = zeroLineAPI(_, zeroLine);
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