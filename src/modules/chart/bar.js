define(function (require) {
  var d3 = require("d3");
  var axis = require("src/modules/component/axis/axis");
  var clip = require("src/modules/element/svg/clipPath");
  var clippathAPI = require("src/modules/helpers/api/clippath");
  var clipPathOptions = require("src/modules/helpers/options/clippath");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var rect = require("src/modules/element/svg/rect");
  var zeroAxisLine = require("src/modules/element/svg/line");
  var eventOptions = require("src/modules/helpers/options/events");
  var mapDomain = require("src/modules/helpers/map_domain");
  var scaleValue = require("src/modules/helpers/scale_value");
  var marginOptions = require("src/modules/helpers/options/margin");
  var scaleOptions = require("src/modules/helpers/options/scale");
  var xAxisOptions = require("src/modules/helpers/options/x_axis");
  var yAxisOptions = require("src/modules/helpers/options/y_axis");
  var axisAPI = require("src/modules/helpers/api/axis");
  var marginAPI = require("src/modules/helpers/api/margin");
  var rectAPI = require("src/modules/helpers/api/rect");
  var scaleAPI = require("src/modules/helpers/api/scale");
  var stackAPI = require("src/modules/helpers/api/stack");
  var stackOptions = require("src/modules/helpers/options/stack");
  var zeroAxisLine = require("src/modules/element/svg/line");
  var zeroLineOptions = require("src/modules/helpers/options/zero_line");
  var zeroLineAPI = require("src/modules/helpers/api/zero_line");

  return function barChart() {
    // Private variables
    var margin = deepCopy(marginOptions, {});
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var values = function (d) { return d; };
    var dispatch = d3.dispatch("brush");
    var stacked = true;

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
    var zeroLine = deepCopy(zeroLineOptions, {});

    // Rect options
    var rects = {
      groupClass: "rects",
      rectClass: "bars",
      values: function (d) { return d; },
      x: function (d, i, j, scale) {
        return scale(xValue.call(d, i));
      },
      y: function (d, i, j, scale) {
        return scale(yValue.call(d, i));
      },
      width: function (d, i, j, scale, data) {
        return scale.range()[1] / data.length - 5;
      },
      height: function (d, i, j, scale) {
        return scale.range()[0] - scale(yValue.call(null, d, i));
      },
      rx: 0,
      ry: 0,
      fill: function (d, i, j) { return color(i); },
      stroke: function (d, i) { return color(i); },
      strokeWidth: 0,
      opacity: 1,
      events: deepCopy(eventOptions, {})
    };

    function chart(selection) {
      selection.each(function (data, index) {
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

        var X = scaleValue(xScale, xValue);
        var Y = scaleValue(yScale, yValue);

        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        var clippath = clip()
          .width(clipPath.width || width)
          .height(clipPath.height || height);

        var bars = rect()
          .data(barData)
          .cssClass(rects.rectClass)
          .fill(rects.fill)
          .stroke(rects.stroke)
          .strokeWidth(rects.strokeWidth)
          .opacity(rects.opacity)
          .rx(rects.rx)
          .ry(rects.ry)
          .x(function (d, i, j) {
            return rects.x.call(null, d, i, j, xScale, data);
          })
          .width(function (d, i, j) {
            return rects.width.call(null, d, i, j, xScale, data);
          })
          .y(function (d, i, j) {
            return rects.y.call(null, d, i, j, yScale, data);
          })
          .height(function (d, i, j) {
            return rects.height.call(null, d, i, j, yScale, data);
          });

        //g.call(clippath)
        //  .append("g")
        //  .attr("clip-path", "url(#" + clippath.id() + ")")
        //  .attr("class", rects.groupClass)
        //  .call(bars);

        if (stacked) {
          g.selectAll("g")
            .data(values)
            .enter().append("g")
            .attr("class", rects.groupClass);
        }

        g.call(bars);

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

        if (zeroLine.add) {
          var zLine = zeroAxisLine()
            .cssClass(zeroLine.lineClass)
            .x1(function () { return xScale.range()[0]; })
            .x2(function () { return xScale.range()[1]; })
            .y1(function () { return yScale(0); })
            .y2(function () { return yScale(0); })
            .stroke(zeroLine.stroke)
            .strokeWidth(zeroLine.strokeWidth)
            .opacity(zeroLine.opacity);

          g.call(zLine);
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

    chart.stacked = function (_) {
      if (!arguments.length) { return stacked; }
      stacked = _;
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

    chart.zeroLine = function (_) {
      if (!arguments.length) { return zeroLine; }
      zeroLine = zeroLineAPI(_, zeroLine);
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) { return zeroLine; }
      zeroLine = zeroLineAPI(_, zeroLine);
      return chart;
    };

    chart.rects = function (_) {
      if (!arguments.length) { return rects; }
      rects = rectAPI(_, rects);
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});