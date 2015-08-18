define(function (require) {
  var d3 = require("d3");
  var God = require("src/modules/chart/chart");
  var axis = require("src/modules/component/axis");
  var brushComponent = require("src/modules/component/brush");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var mapDomain = require("src/modules/helpers/map_domain");
  var zeroAxisLine = require("src/modules/element/svg/line");
  var scaleOptions = require("src/modules/helpers/options/scale");
  var xAxisOptions = require("src/modules/helpers/options/x_axis");
  var yAxisOptions = require("src/modules/helpers/options/y_axis");
  var zeroLineOptions = require("src/modules/helpers/options/zero_line");
  var axisAPI = require("src/modules/helpers/api/axis");
  var scaleAPI = require("src/modules/helpers/api/scale");
  var zeroLineAPI = require("src/modules/helpers/api/zero_line");

  function Series(selection) {
    if (!(this instanceof Series)) {
      return new Series(selection);
    }

    God.apply(this);

    // Chart options
    var margin = this.margin();
    var width = this.width();
    var height = this.height();
    var color = this.color();
    var accessor = this.accessor();
    var xValue = this.x();
    var yValue = this.y();
    var listeners = this.listeners();
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
    var zeroLine = deepCopy(zeroLineOptions, {});

    selection.each(function (data, index) {
      data = accessor.call(this, data, index);

      var adjustedWidth = width - margin.left - margin.right;
      var adjustedHeight = height - margin.top - margin.bottom;

      xScale = xScaleOpts.scale || d3.time.scale.utc();
      xScale.domain(xScaleOpts.domain || d3.extent(mapDomain(data), xValue));

      if (typeof xScale.rangeBands === "function") {
        xScale.rangeBands([0, adjustedWidth, 0.1]);
      } else {
        xScale.range([0, adjustedWidth]);
      }

      yScale = yScaleOpts.scale || d3.scale.linear();
      yScale.domain(yScaleOpts.domain || d3.extent(mapDomain(data), yValue))
        .range([adjustedHeight, 0]);

      if (xScaleOpts.nice) { xScale.nice(); }
      if (yScaleOpts.nice) { yScale.nice(); }

      var svg = d3.select(this).selectAll("svg")
        .data([data])
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height);

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

      // Brush
      if (listeners.brush && listeners.brush.length) {
        var brush = brushComponent()
          .height(adjustedHeight)
          .xScale(xScale)
          .brushend(listeners.brush);

        g.call(brush);
      }

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

    // Public API
    this.defined = function (_) {
      if (!arguments.length) { return defined; }
      defined = _;
      return this;
    };

    this.interpolate = function (_) {
      if (!arguments.length) { return interpolate; }
      interpolate = _;
      return this;
    };

    this.tension = function (_) {
      if (!arguments.length) { return tension; }
      tension = _;
      return this;
    };

    this.xScale = function (_) {
      if (!arguments.length) { return xScaleOpts; }
      xScaleOpts = scaleAPI(_, xScaleOpts);
      return this;
    };

    this.yScale = function (_) {
      if (!arguments.length) { return yScaleOpts; }
      yScaleOpts = scaleAPI(_, yScaleOpts);
      return this;
    };

    this.xAxis = function (_) {
      if (!arguments.length) { return axisX; }
      axisX = axisAPI(_, axisX);
      return this;
    };

    this.yAxis = function (_) {
      if (!arguments.length) { return axisY; }
      axisY = axisAPI(_, axisY);
      return this;
    };

    this.zeroLine = function (_) {
      if (!arguments.length) { return zeroLine; }
      zeroLine = zeroLineAPI(_, zeroLine);
      return this;
    };

    return this;
  }

  Series.prototype = new God();

  return Series;
});
