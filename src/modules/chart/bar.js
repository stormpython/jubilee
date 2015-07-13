define(function (require) {
  var d3 = require("d3");
  var addEventListener = require("src/modules/helpers/add_event_listener");
  var axis = require("src/modules/component/axis");
  var brushComponent = require("src/modules/component/brush");
  var clip = require("src/modules/element/svg/clipPath");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var mapDomain = require("src/modules/helpers/map_domain");
  var rect = require("src/modules/element/svg/rect");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");
  var zeroAxisLine = require("src/modules/element/svg/line");

  var axisAPI = require("src/modules/helpers/api/axis");
  var clippathAPI = require("src/modules/helpers/api/clippath");
  var clipPathOptions = require("src/modules/helpers/options/clippath");
  var marginAPI = require("src/modules/helpers/api/margin");
  var marginOptions = require("src/modules/helpers/options/margin");
  var rectAPI = require("src/modules/helpers/api/rect");
  var scaleAPI = require("src/modules/helpers/api/scale");
  var scaleOptions = require("src/modules/helpers/options/scale");
  var stackAPI = require("src/modules/helpers/api/stack");
  var stackOptions = require("src/modules/helpers/options/stack");
  var xAxisOptions = require("src/modules/helpers/options/x_axis");
  var yAxisOptions = require("src/modules/helpers/options/y_axis");
  var zeroLineAPI = require("src/modules/helpers/api/zero_line");
  var zeroLineOptions = require("src/modules/helpers/options/zero_line");

  return function barChart() {
    var margin = deepCopy(marginOptions, {});
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
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
      x: function (d, i, j, scale) {
        return scale(xValue.call(null, d, i));
      },
      y: function (d, i, j, scale) {
        return scale(yValue.call(null, d, i));
      },
      width: function (d, i, j, scale, data) {
        return scale.range()[1] / data.length;
      },
      height: function (d, i, j, scale) {
        return scale.range()[0] - scale(yValue.call(null, d, i));
      },
      rx: 0,
      ry: 0,
      fill: function (d, i) { return color(i); },
      stroke: function (d, i) { return color(i); },
      strokeWidth: 0,
      opacity: 1
    };

    function chart(selection) {
      selection.each(function (data, index) {
        var stack = d3.layout.stack().x(xValue).y(yValue).values(values)
          .offset(stackOpts.offset)
          .order(stackOpts.order)
          .out(stackOpts.out);

        if (stacked) { data = stack(data); }

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var newData = data.map(values);

        xScale = xScaleOpts.scale || d3.time.scale.utc();
        xScale.domain(xScaleOpts.domain || d3.extent(mapDomain(newData), xValue));

        if (typeof xScale.rangeBands === "function") {
          xScale.rangeBands([0, width, 0.1]);
        } else {
          xScale.range([0, width]);
        }

        yScale = yScaleOpts.scale || d3.scale.linear();
        yScale.domain(yScaleOpts.domain || [
            Math.min(0, d3.min(mapDomain(newData), yStackValue)),
            Math.max(0, d3.max(mapDomain(newData), yStackValue))
          ])
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

        // Brush
        if (listeners.brush.length) {
          var brush = brushComponent()
            .height(height)
            .xScale(xScale)
            .brushend(listeners.brush);

          g.call(brush);
        }

        var clippath = clip()
          .width(clipPath.width || width)
          .height(clipPath.height || height);

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

    function yStackValue (d, i) {
      return d.y0 + d.y;
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

    chart.on = addEventListener(listeners, chart);

    chart.off = removeEventListener(listeners, chart);

    return chart;
  };
});