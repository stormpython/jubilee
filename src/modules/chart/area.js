define(function (require) {
  var d3 = require("d3");
  var path = require("src/modules/element/svg/path");
  var axis = require("src/modules/component/axis/axis");
  var clip = require("src/modules/element/svg/clipPath");
  var mapDomain = require("src/modules/helpers/map_domain");
  var scaleValue = require("src/modules/helpers/scale_value");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var marginOptions = require("src/modules/helpers/chart/options/margin");
  var scaleOptions = require("src/modules/helpers/chart/options/scale");
  var stackOptions = require("src/modules/helpers/chart/options/stack");
  var clipPathOptions = require("src/modules/helpers/chart/options/clippath");
  var xAxisOptions = require("src/modules/helpers/chart/options/x_axis");
  var yAxisOptions = require("src/modules/helpers/chart/options/y_axis");
  var axisAPI = require("src/modules/helpers/chart/api/axis");
  var areaAPI = require("src/modules/helpers/chart/api/area");
  var linesAPI = require("src/modules/helpers/chart/api/lines");
  var marginAPI = require("src/modules/helpers/chart/api/margin");
  var scaleAPI = require("src/modules/helpers/chart/api/scale");
  var stackAPI = require("src/modules/helpers/chart/api/stack");
  var clippathAPI = require("src/modules/helpers/chart/api/clippath");

  return function areaChart() {
    // Chart options
    var margin = marginOptions;
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var dispatch = d3.dispatch("brush");
    var interpolate = "linear";

    // Scale options
    var xScaleOpts = deepCopy(scaleOptions, {});
    var yScaleOpts = deepCopy(scaleOptions, {});
    var xScale;
    var yScale;

    // Other options
    var stackOpts = deepCopy(stackOptions, {});
    var axisX = deepCopy(xAxisOptions, {});
    var axisY = deepCopy(yAxisOptions, {});
    var clipPath = deepCopy(clipPathOptions, {});

    // Area options
    var areas = {
      groupClass: "paths",
      areaClass: "area",
      fill: function (d, i) { return color(i); },
      stroke: function (d, i) { return color(i); },
      strokeWidth: 0,
      opacity: 1,
      defined: function () { return true; },
      events: {
        mouseover: function () {},
        mouseout: function () {},
        click: function () {}
      }
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
      tension:  0.7,
      defined: function () { return true; }
    };


    function chart(selection) {
      selection.each(function (data) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var stack = d3.layout.stack().x(xValue).y(yValue)
          .offset(stackOpts.offset)
          .order(stackOpts.order)
          .out(stackOpts.out);

        var layers = stack(data);

        xScale = xScaleOpts.scale || d3.time.scale.utc();
        xScale.domain(xScaleOpts.domain || d3.extent(mapDomain(layers), xValue));

        if (xScale.rangeBands) {
          xScale.rangeBands([0, width], 0.1);
        } else {
          xScale.range([0, width]);
        }

        yScale = yScaleOpts.scale || d3.scale.linear();
        yScale.domain(yScaleOpts.domain || [
            Math.min(0, d3.min(mapDomain(layers), Y)),
            Math.max(0, d3.max(mapDomain(layers), Y))
          ])
          .range([height, 0]);

        if (xScaleOpts.nice) { xScale.nice(); }
        if (yScaleOpts.nice) { yScale.nice(); }

        var svg = d3.select(this).selectAll("svg")
          .data([layers])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        if (axisX.show) {
          var xAxis = axis()
            .scale(xScale)
            .gClass(axisX.gClass)
            .transform(axisX.transform || "translate(0," + (yScale.range()[0] + 1) + ")")
            .tick({
              number: axisX.tick.number,
              values: axisX.tick.values,
              size: axisX.tick.size,
              padding: axisX.tick.padding,
              format: axisX.tick.format,
              rotate: axisX.tick.rotate,
              innerTickSize: axisX.tick.innerTickSize,
              outerTickSize: axisX.tick.outerTickSize,
              text: {
                x: axisX.tick.text.x,
                y: axisX.tick.text.y,
                dx: axisX.tick.text.dx,
                dy: axisX.tick.text.dy,
                anchor: axisX.tick.text.anchor
              }
            })
            .title({
              titleClass: axisX.title.titleClass,
              x: width / 2,
              y: axisX.title.y,
              dx: axisX.title.dx,
              dy: axisX.title.dy,
              anchor: axisX.title.anchor,
              text: axisX.title.text
            });

          g.call(xAxis);
        }

        if (axisY.show) {
          var yAxis = axis()
            .scale(yScale)
            .orient("left")
            .gClass(axisY.gClass)
            .transform(axisY.transform || "translate(-1,0)")
            .tick({
              number: axisY.tick.number,
              values: axisY.tick.values,
              size: axisY.tick.size, padding: axisY.tick.padding, format: axisY.tick.format,
              rotate: axisY.tick.rotate,
              innerTickSize: axisY.tick.innerTickSize,
              outerTickSize: axisY.tick.outerTickSize,
              text: {
                x: axisY.tick.text.x,
                y: axisY.tick.text.y,
                dx: axisY.tick.text.dx,
                dy: axisY.tick.text.dy,
                anchor: axisY.tick.text.anchor
              }
            })
            .title({
              titleClass: axisY.title.titleClass,
              x: axisY.title.x,
              y: axisY.title.y,
              dx: axisY.title.dx,
              dy: axisY.title.dy,
              transform: "translate(0," + height / 2 + ")rotate(" + axisY.title.rotate + ")",
              anchor: axisY.title.anchor,
              text: axisY.title.text
            });

          g.call(yAxis);
        }

        var clippath = clip()
          .width(clipPath.width || width)
          .height(clipPath.height || height);

        var X = scaleValue(xScale, xValue);

        var area = d3.svg.area().x(X).y0(Y0).y1(Y1)
          .interpolate(interpolate)
          .defined(areas.defined);

        var line = d3.svg.line().x(X).y(Y1)
          .interpolate(interpolate)
          .defined(lines.defined);

        var areaPath = path()
          .pathGenerator(area)
          .cssClass(areas.areaClass)
          .stroke(areas.stroke)
          .strokeWidth(areas.strokeWidth)
          .fill(areas.fill)
          .opacity(areas.opacity)
          .events({
            mouseover: areas.events.mouseover,
            mouseout: areas.events.mouseout,
            click: areas.events.click
          });

        g.call(clippath);
        g.append("g")
          .attr("clip-path", "url(#" + clippath.id() + ")")
          .attr("class", areas.groupClass)
          .call(areaPath);

        if (lines.show) {
          var linePath = path()
            .pathGenerator(line)
            .cssClass(lines.lineClass)
            .stroke(lines.stroke)
            .strokeWidth(lines.strokeWidth)
            .opacity(lines.opacity);

          g.append("g").call(linePath);
        }
      });
    }

    function Y(d, i) {
      if (stackOpts.offset === "overlap") { return d.y; }
      return d.y0 + yValue.call(null, d, i);
    }

    function Y0(d) {
      var min = Math.max(0, yScale.domain()[0]);
      if (stackOpts.offset === "overlap") { return yScale(min); }
      return yScale(d.y0);
    }

    function Y1(d, i) {
      if (stackOpts.offset === "overlap") { return yScale(d.y); }
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

    chart.dispatch = function (_) {
      if (!arguments.length) { return dispatch; }
      dispatch = _;
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
      if (!arguments.lenth) { return clipPath; }
      clipPath = clippathAPI(_, clipPath);
      return chart;
    };

    chart.area = function (_) {
      if (!arguments.length) { return areas; }
      areas = areaAPI(_, areas);
      return chart;
    };

    chart.line = function (_) {
      if (!arguments.length) { return lines; }
      lines = linesAPI(_, lines);
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});