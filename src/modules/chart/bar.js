define(function (require) {
  var d3 = require("d3");

  var addEventListener = require("src/modules/helpers/add_event_listener");
  var axis = require("src/modules/component/axis");
  var brushComponent = require("src/modules/component/brush");
  var clip = require("src/modules/element/svg/clipPath");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var rect = require("src/modules/element/svg/rect");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");
  var zeroAxisLine = require("src/modules/element/svg/line");

  var scaleOptions = require("src/modules/helpers/options/scale");
  var stackAPI = require("src/modules/helpers/api/stack");
  var stackOptions = require("src/modules/helpers/options/stack");
  var xAxisOptions = require("src/modules/helpers/options/x_axis");
  var yAxisOptions = require("src/modules/helpers/options/y_axis");
  var zeroLineAPI = require("src/modules/helpers/api/zero_line");
  var zeroLineOptions = require("src/modules/helpers/options/zero_line");

  var axisAPI = require("src/modules/helpers/api/axis");
  var clippathAPI = require("src/modules/helpers/api/clippath");
  var clipPathOptions = require("src/modules/helpers/options/clippath");
  var marginAPI = require("src/modules/helpers/api/margin");
  var marginOptions = require("src/modules/helpers/options/margin");
  var rectAPI = require("src/modules/helpers/api/rect");
  var scaleAPI = require("src/modules/helpers/api/scale");

  return function barChart() {
    var margin = deepCopy(marginOptions, {});
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var accessor = function (d) { return d; };
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var values = function (d) { return d; };
    var stacked = "true";

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
    var listeners = {};

    // Rect options
    var rects = {
      groupClass: "rects",
      cssClass: "bars",
      x: function (d, i, j, scale, accessor) {
        return scale(accessor.call(null, d, i));
      },
      y: function (d, i, j, scale, accessor) {
        return scale(accessor.call(null, d, i));
      },
      width: function (d, i, j, scale, data) {
        return scale.range()[1] / data.length;
      },
      height: function (d, i, j, scale, data, accessor) {
        return scale.range()[0] - scale(accessor.call(null, d, i));
      },
      rx: 0,
      ry: 0,
      fill: function (d, i) { return i; },
      stroke: function (d, i) { return i; },
      strokeWidth: 0,
      opacity: 1
    };

    function chart(selection) {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var stack = d3.layout.stack().x(xValue).y(yValue).values(values)
          .offset(stackOpts.offset)
          .order(stackOpts.order)
          .out(stackOpts.out);

        if (stacked) { data = stack(data); }

        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        /* Scales */
        /* ********************************************************* */
        var scaleData = data.map(values);

        xScale = xScaleOpts.scale || d3.time.scale.utc();
        xScale.domain(xScaleOpts.domain || d3.extent(d3.merge(scaleData), xValue));

        if (typeof xScale.rangeBands === "function") {
          xScale.rangeBands([0, adjustedWidth, 0.1]);
        } else {
          xScale.range([0, adjustedWidth]);
        }

        yScale = yScaleOpts.scale || d3.scale.linear();
        yScale.domain(yScaleOpts.domain || [
            Math.min(0, d3.min(d3.merge(scaleData), yStackValue)),
            Math.max(0, d3.max(d3.merge(scaleData), yStackValue))
          ])
          .range([adjustedHeight, 0]);

        if (xScaleOpts.nice) { xScale.nice(); }
        if (yScaleOpts.nice) { yScale.nice(); }
        /* ********************************************************* */

        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width)
          .attr("height", height);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        // Brush
        if (listeners.brush.length) {
          var brush = brushComponent()
            .height(adjustedHeight)
            .xScale(xScale)
            .brushend(listeners.brush);

          g.call(brush);
        }

        var clippath = clip()
          .width(clipPath.width || adjustedWidth)
          .height(clipPath.height || adjustedHeight);

        var bars = rect()
          .data(values)
          .cssClass(rects.cssClass)
          .fill(function (d, i, j) {
            return color(rects.fill.call(this, d, i, j));
          })
          .stroke(function (d, i, j) {
            return color(rects.stroke.call(this, d, i, j));
          })
          .strokeWidth(rects.strokeWidth)
          .opacity(rects.opacity)
          .rx(rects.rx)
          .ry(rects.ry)
          .x(function (d, i, j) {
            return rects.x.call(null, d, i, j, xScale, xValue);
          })
          .width(function (d, i, j) {
            return rects.width.call(null, d, i, j, xScale, data, xValue);
          })
          .y(function (d, i, j) {
            return rects.y.call(null, d, i, j, yScale, yValue);
          })
          .height(function (d, i, j) {
            return rects.height.call(null, d, i, j, yScale, data, yValue);
          })
          .listeners(listeners);

        g.call(clippath)
          .append("g")
          .attr("clip-path", "url(#" + clippath.id() + ")");

        if (stacked) {
          g.selectAll("rectGroup")
            .data(data)
            .enter().append("g")
            .attr("class", rects.groupClass)
            .call(bars);
        } else {
          g.call(bars);
        }

        /* Axes */
        /* ********************************************************* */
        if (axisX.show) {
          var xAxis = axis()
            .scale(xScale)
            .gClass(axisX.gClass)
            .transform(axisX.transform || "translate(0," + (yScale.range()[0] + 1) + ")")
            .tick(axisX.tick)
            .title(axisX.title);

          g.call(xAxis);
        }

        if (axisY.show) {
          var yAxis = axis()
            .scale(yScale)
            .orient("left")
            .gClass(axisY.gClass)
            .transform(axisY.transform || "translate(-1,0)")
            .tick(axisY.tick)
            .title(axisY.title);

          g.call(yAxis);
        }
        /* ********************************************************* */

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

    function yStackValue (d) { return d.y0 + d.y; }

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

    chart.values = function (_) {
      if (!arguments.length) { return values; }
      values = _;
      return chart;
    };

    chart.stacked = function (_) {
      if (!arguments.length) { return stacked; }
      stacked = _;
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
      if (!arguments.length) { return stackOptions; }
      stackOptions = stackAPI(_, stackOptions);
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

    chart.rects = function (_) {
      if (!arguments.length) { return rects; }
      rects = rectAPI(_, rects);
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