define(function (require) {
  var d3 = require("d3");
  var axis = require("src/modules/component/axis/axis");
  var path = require("src/modules/element/svg/path");
  var clip = require("src/modules/element/svg/clipPath");
  var circle = require("src/modules/element/svg/circle");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var mapDomain = require("src/modules/helpers/map_domain");
  var scaleValue = require("src/modules/helpers/scale_value");
  var marginOptions = require("src/modules/helpers/options/margin");
  var clipPathOptions = require("src/modules/helpers/options/clippath");
  var scaleOptions = require("src/modules/helpers/options/scale");
  var xAxisOptions = require("src/modules/helpers/options/x_axis");
  var yAxisOptions = require("src/modules/helpers/options/y_axis");
  var axisAPI = require("src/modules/helpers/api/axis");
  var linesAPI = require("src/modules/helpers/api/lines");
  var circlesAPI = require("src/modules/helpers/api/circles");
  var marginAPI = require("src/modules/helpers/api/margin");
  var clippathAPI = require("src/modules/helpers/api/clippath");
  var scaleAPI = require("src/modules/helpers/api/scale");

  return function lineChart() {
    // Chart options
    var margin = marginOptions;
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var dispatch = d3.dispatch("brush");

    // Scale options
    var xScaleOpts = deepCopy(scaleOptions, {});
    var yScaleOpts = deepCopy(scaleOptions, {});
    var xScale;
    var yScale;

    // Other options
    var axisX = deepCopy(xAxisOptions, {});
    var axisY = deepCopy(yAxisOptions, {});
    var clipPath = deepCopy(clipPathOptions, {});

    // Line Options
    var lines = {
      groupClass: "paths",
      lineClass: "line",
      stroke: function (d, i) { return color(i); },
      strokeWidth: 3,
      opacity: 1,
      interpolate: "linear",
      tension:  0.7,
      defined: function () { return true; },
      events: {
        mouseover: function () {},
        mouseout: function () {},
        click: function () {}
      }
    };

    // Circle Options
    var circles = {
      show: true,
      groupClass: "circle layer",
      circleClass: "circle",
      fill: function (d, i, j) { return color(j); },
      stroke: null,
      radius: 5,
      strokeWidth: 3,
      events: {
        mouseover: function () {},
        mouseout: function () {},
        click: function () {}
      }
    };

    function chart(selection) {
      selection.each(function (data) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        xScale = xScaleOpts.scale || d3.time.scale.utc();
        xScale.domain(xScaleOpts.domain || d3.extent(mapDomain(data), xValue));

        if (typeof xScale.rangeBands === "function") {
          xScale.rangeBands([0, width, 0.1]);
        } else {
          xScale.range([0, width]);
        }

        yScale = yScaleOpts.scale || d3.scale.linear();
        yScale.domain(yScaleOpts.domain || d3.extent(mapDomain(data), yValue))
          .range([height, 0]);

        if (xScaleOpts.nice) { xScale.nice(); }
        if (yScaleOpts.nice) { yScale.nice(); }

        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        var X = scaleValue(xScale, xValue);
        var Y = scaleValue(yScale, yValue);
        var line = d3.svg.line().x(X).y(Y)
          .interpolate(lines.interpolate)
          .tension(lines.tension)
          .defined(lines.defined);

        var linePath = path()
          .pathGenerator(line)
          .cssClass(lines.lineClass)
          .stroke(lines.stroke)
          .strokeWidth(lines.strokeWidth)
          .opacity(lines.opacity)
          .events({
            mouseover: lines.events.mouseover,
            mouseout: lines.events.mouseout,
            click: lines.events.click
          });

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

        g.append("g")
          .attr("class", lines.groupClass)
          .call(linePath);

        if (circles.show) {
          var clippath = clip()
            .width(clipPath.width || width)
            .height(clipPath.height || height);

          var points = circle()
            .cx(X)
            .cy(Y)
            .color(color)
            .radius(circles.radius)
            .cssClass(circles.circleClass)
            .fill(circles.fill)
            .stroke(circles.stroke ? circles.stroke : circles.fill)
            .strokeWidth(circles.strokeWidth)
            .events({
              mouseover: circles.events.mouseover,
              mouseout: circles.events.mouseout
            });

          g.call(clippath);

          g.append("g")
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

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});
