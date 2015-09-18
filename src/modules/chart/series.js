define(function (require) {
  var d3 = require("d3");
  var builder = require("builder");
  var functor = require("functor");
  var valuator = require("valuator");
  var scaletor = require("src/modules/helpers/scaletor");
  var parseTime = require("src/modules/helpers/timeparser");
  var clip = require("src/modules/component/clippath");
  var axis = require("src/modules/component/axis/axis");
  var brushComponent = require("src/modules/component/events/brush");
  var events = require("src/modules/component/events/events");
  var addEventListener = require("src/modules/helpers/add_event_listener");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");
  var zeroAxisLine = require("src/modules/element/svg/line");
  var areas = require("src/modules/component/series/area");
  var bars = require("src/modules/component/series/bars");
  var circles = require("src/modules/component/series/points");
  var lines = require("src/modules/component/series/line");

  return function series() {
    var margin = {top: 20, right: 50, bottom: 50, left: 50};
    var width = 960;
    var height = 500;
    var accessor = function (d) { return d; };
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var zValue = function (d) { return d.z; };
    var xScale = {
      scale: d3.time.scale.utc(),
      domain: null,
      clamp: false,
      nice: false
    };
    var yScale = {
      scale: d3.scale.linear(),
      domain: null,
      clamp: false,
      nice: false
    };
    var zScale = {
      scale: d3.scale.linear(),
      domain: null,
      clamp: false,
      nice: false
    };
    var xAxis = {
      show: true,
      gridlines: false,
      class: "x axis",
      transform: null,
      tick: {},
      tickText: { anchor: "middle", x: 0, y: 9, dx: "", dy: ".71em" },
      rotateLabels: { allow: true },
      title: { anchor: "middle" }
    };
    var yAxis = {
      show: true,
      gridlines: false,
      class: "y axis",
      transform: null,
      tick: {},
      tickText: { anchor: "end", x: -9, y: 0, dy: ".32em" },
      rotateLabels: {},
      title: { x: 0, y: -40, anchor: "middle" }
    };
    var zAxis = {
      show: false,
      gridlines: false,
      class: "z axis",
      transform: null,
      tick: {},
      tickText: { anchor: "start", x: 9, y: 0, dy: ".32em" },
      rotateLabels: {},
      title: {}
    };
    var brushOpts = {
      class: "brush",
      x: true,
      y: false,
      opacity: 0.2,
      extent: null,
      clamp: false
    };
    var zeroLine = {
      show: false,
      class: "zero-line",
      stroke: "#000000",
      strokeWidth: 1,
      opacity: 0.5
    };
    var stacks = {
      scale: "y",
      offset: "zero",
      order: "default",
      out: function stackOut(d, y0, y) {
        d.y0 = y0;
        d.y = y;
      }
    };
    var bar = {};
    var line = {};
    var area = {};
    var points = {};
    var listeners = {};

    function chart(selection)  {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;
        var svgEvents = events().listeners(listeners);

        /* Stacking Options ******************************** */
        var stack = d3.layout.stack()
          .x(xValue)
          .y(stacks.scale === "z" ? zValue : yValue)
          .offset(stacks.offset)
          .order(stacks.order)
          .out(stacks.out);

        data = stack(data);
        /* ******************************** */

        /* Scales ******************************** */
        var x = xScale.scale
          .domain(xScale.domain ? xScale.domain.call(this, d3.merge(data)) : xDomain(data, xValue))
          .clamp(xScale.clamp)
          .range([0, adjustedWidth]);

        var y = yScale.scale
          .domain(yScale.domain ? yScale.domain.call(this, d3.merge(data)) : domain(data, yValue))
          .clamp(yScale.clamp)
          .range([adjustedHeight, 0]);

        var z = zScale.scale
          .domain(zScale.domain ? zScale.domain.call(this, d3.merge(data)) : domain(data, zValue))
          .clamp(zScale.clamp)
          .range([adjustedHeight, 0]);

        if (xScale.nice) { x.nice(); }
        if (yScale.nice) { y.nice(); }
        if (zScale.nice) { z.nice(); }
        /* ******************************** */

        /* Canvas ******************************** */
        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width)
          .attr("height", height)
          .call(svgEvents);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
        /* ******************************** */

        /* Brush ******************************** */
        if (listeners.brushstart && listeners.brushstart.length ||
            listeners.brush && listeners.brush.length ||
            listeners.brushend && listeners.brushend.length) {
          var brush = brushComponent()
            .class(brushOpts.class)
            .xScale(brushOpts.x ? x : null)
            .yScale(brushOpts.y ? y : null)
            .opacity(brushOpts.opacity)
            .clamp(brushOpts.clamp)
            .extent(brushOpts.extent)
            .height(adjustedHeight)
            .brushstart(listeners.brushstart)
            .brush(listeners.brush)
            .brushend(listeners.brushend);

          g.call(brush);
        }
        /* ******************************** */

        /* Zero-line ******************************** */
        if (zeroLine.show) {
          var zLine = zeroAxisLine()
            .x1(function () { return x.range()[0]; })
            .x2(function () { return x.range()[1]; })
            .y1(function () { return y(0); })
            .y2(function () { return y(0); });

          g.append("g")
            .datum([{}])
            .call(builder(zeroLine, zLine));
        }
        /* ******************************** */

        /* Axes ******************************** */
        if (xAxis.gridlines) {
          xAxis.tick.innerTickSize = -adjustedHeight;
        }
        if (yAxis.gridlines) {
          yAxis.tick.innerTickSize = -adjustedWidth;
        }

        if (xAxis.show) {
          var axisX = axis()
            .scale(x)
            .class(xAxis.class)
            .transform(xAxis.transform || "translate(0," + (y.range()[0]) + ")")
            .tick(xAxis.tick)
            .tickText(xAxis.tickText)
            .rotateLabels(xAxis.rotateLabels)
            .title(xAxis.title);

          g.call(axisX);
        }

        if (yAxis.show) {
          var axisY = axis()
            .scale(y)
            .orient("left")
            .class(yAxis.class)
            .transform(yAxis.transform || "translate(0,0)")
            .tick(yAxis.tick)
            .tickText(yAxis.tickText)
            .title(yAxis.title);

          g.call(axisY);
        }

        if (zAxis.show) {
          var axisZ = axis()
            .scale(z)
            .orient("right")
            .class(zAxis.class)
            .transform(zAxis.transform || "translate(" + x.range()[1] + "," + "0)")
            .tick(zAxis.tick)
            .tickText(zAxis.tickText)
            .title(zAxis.title);

          g.call(axisZ);
        }
        /* ******************************** */

        /* ClipPath ******************************** */
        var clippath = clip().width(adjustedWidth).height(adjustedHeight);
        var clippedG = g.call(clippath).append("g")
          .attr("clip-path", "url(#" + clippath.id() + ")");
        /* ******************************** */

        /* SVG Elements ******************************** */
        var elements = [
          {type: "area", func: areas(), opts: area},
          {type: "bar", func: bars(), opts: bar},
          {type: "line", func: lines(), opts: line},
          {type: "points", func: circles(), opts: points}
        ];

        elements.forEach(function (d) {

          // Only render elements when api called
          if (d3.keys(d.opts).length) {
            var element = functor().function(d.func);

            if (d.type === "area") { d.opts.offset = stacks.offset; }
            d.opts = !Array.isArray(d.opts) ? [d.opts] : d.opts;

            d.opts.forEach(function (props) {
              var isZ = props.scale && props.scale.toLowerCase() === "z";
              props.x = xValue;
              props.y = isZ ? zValue : yValue;
              props.xScale = x;
              props.yScale = isZ ? z : y;

              clippedG.call(element.options(props));
            });
          }
        });
        /* ******************************** */
      });
    }

    function xDomain(data, accessor) {
      if (d3.keys(bar).length) {
        var interval = bar.interval ? bar.interval : "30s";
        var offset = parseFloat(interval);
        var timeInterval = parseTime(interval);

        return [
          d3.min(d3.merge(data), accessor),
          d3.time[timeInterval].offset(d3.max(d3.merge(data), accessor), offset)
        ];
      }
      return d3.extent(d3.merge(data), accessor);
    }

    function domain(data, accessor) {
      return [
        Math.min(0, d3.min(d3.merge(data), getAccessor(accessor))),
        Math.max(0, d3.max(d3.merge(data), getAccessor(accessor)))
      ];
    }

    function getAccessor(accessor) {
      var obj = {y: true, z: false};
      var val = accessor.call(this, obj) ? "y" : "z";

      return function (d, i) {
        var isStacked = !!d3.keys(area).length || !!d3.keys(bar).length;
        var properlyOffset = stacks.offset !== "overlap" && !bar.group;
        var scalesEqual = val === stacks.scale;

        if (isStacked && properlyOffset && scalesEqual) {
          return d.y0 + accessor.call(this, d, i);
        }
        return accessor.call(this, d, i);
      };
    }

    // Public API
    chart.margin = function (_) {
      if (!arguments.length) { return margin; }
      margin.top = typeof _.top !== "undefined" ? _.top : margin.top;
      margin.right = typeof _.right !== "undefined" ? _.right : margin.right;
      margin.bottom = typeof _.bottom !== "undefined" ? _.bottom : margin.bottom;
      margin.left = typeof _.left !== "undefined" ? _.left : margin.left;
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

    chart.brush = function (_) {
      if (!arguments.length) { return brushOpts; }
      brushOpts.class = typeof _.clamp !== "undefined" ? _.clamp : brushOpts.clamp;
      brushOpts.x = typeof _.x !== "undefined" ? _.x : brushOpts.x;
      brushOpts.y = typeof _.y !== "undefined" ? _.y : brushOpts.y;
      brushOpts.opacity = typeof _.opacity !== "undefined" ? _.opacity : brushOpts.opacity;
      brushOpts.clamp = typeof _.clamp !== "undefined" ? _.clamp : brushOpts.clamp;
      brushOpts.extent = typeof _.extent !== "undefined" ? _.extent : brushOpts.extent;
      return chart;
    };

    chart.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = valuator(_);
      return chart;
    };

    chart.stack = function (_) {
      if (!arguments.length) { return stacks; }
      stacks.scale = typeof _.scale !== "undefined" ? _.scale : stacks.scale;
      stacks.offset = typeof _.offset !== "undefined" ? _.offset : stacks.offset;
      stacks.order = typeof _.order !== "undefined" ? _.order : stacks.order;
      stacks.out = typeof _.out !== "undefined" ? _.out : stacks.out;
      return chart;
    };

    chart.x = function (_) {
      if (!arguments.length) { return xValue; }
      xValue = valuator(_);
      return chart;
    };

    chart.y = function (_) {
      if (!arguments.length) { return yValue; }
      yValue = valuator(_);
      return chart;
    };

    chart.z = function (_) {
      if (!arguments.length) { return zValue; }
      zValue = valuator(_);
      return chart;
    };

    chart.xScale = function (_) {
      if (!arguments.length) { return xScale; }
      xScale.scale = typeof _.scale !== "undefined" ? scaletor(_.scale) : xScale.scale;
      xScale.domain = typeof _.domain !== "undefined" ? d3.functor(_.domain) : xScale.domain;
      xScale.clamp = typeof _.clamp !== "undefined" ? _.clamp : xScale.clamp;
      xScale.nice = typeof _.nice !== "undefined" ? _.nice : xScale.nice;
      return chart;
    };

    chart.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale.scale = typeof _.scale !== "undefined" ? scaletor(_.scale) : yScale.scale;
      yScale.domain = typeof _.domain !== "undefined" ? d3.functor(_.domain) : yScale.domain;
      yScale.clamp = typeof _.clamp !== "undefined" ? _.clamp : yScale.clamp;
      yScale.nice = typeof _.nice !== "undefined" ? _.nice : yScale.nice;
      return chart;
    };

    chart.zScale = function (_) {
      if (!arguments.length) { return zScale; }
      zScale.scale = typeof _.scale !== "undefined" ? scaletor(_.scale) : zScale.scale;
      zScale.domain = typeof _.domain !== "undefined" ? d3.functor(_.domain) : zScale.domain;
      zScale.clamp = typeof _.clamp !== "undefined" ? _.clamp : zScale.clamp;
      zScale.nice = typeof _.nice !== "undefined" ? _.nice : zScale.nice;
      return chart;
    };

    chart.xAxis = function (_) {
      if (!arguments.length) { return xAxis; }
      xAxis.show = typeof _.show !== "undefined" ? _.show : xAxis.show;
      xAxis.gridlines = typeof _.gridlines !== "undefined" ? _.gridlines : xAxis.gridlines;
      xAxis.class = typeof _.class !== "undefined" ? _.class : xAxis.class;
      xAxis.transform = typeof _.transform !== "undefined" ? _.transform : xAxis.transform;
      xAxis.tick = typeof _.tick !== "undefined" ? _.tick : xAxis.tick;
      xAxis.tickText = typeof _.tickText!== "undefined" ? _.tickText: xAxis.tickText;
      xAxis.rotateLabels = typeof _.rotateLabels !== "undefined" ? _.rotateLabels : xAxis.rotateLabels;
      xAxis.title = typeof _.title !== "undefined" ? _.title : xAxis.title;
      return chart;
    };

    chart.yAxis = function (_) {
      if (!arguments.length) { return yAxis; }
      yAxis.show = typeof _.show !== "undefined" ? _.show : yAxis.show;
      yAxis.gridlines = typeof _.gridlines !== "undefined" ? _.gridlines : yAxis.gridlines;
      yAxis.class = typeof _.class !== "undefined" ? _.class : yAxis.class;
      yAxis.transform = typeof _.transform !== "undefined" ? _.transform : yAxis.transform;
      yAxis.tick = typeof _.tick !== "undefined" ? _.tick : yAxis.tick;
      yAxis.tickText = typeof _.tickText!== "undefined" ? _.tickText: yAxis.tickText;
      yAxis.title = typeof _.title !== "undefined" ? _.title : yAxis.title;
      return chart;
    };

    chart.zAxis = function (_) {
      if (!arguments.length) { return zAxis; }
      zAxis.show = typeof _.show !== "undefined" ? _.show : zAxis.show;
      zAxis.gridlines = typeof _.gridlines !== "undefined" ? _.gridlines : zAxis.gridlines;
      zAxis.class = typeof _.class !== "undefined" ? _.class : zAxis.class;
      zAxis.transform = typeof _.transform !== "undefined" ? _.transform : zAxis.transform;
      zAxis.tick = typeof _.tick !== "undefined" ? _.tick : zAxis.tick;
      zAxis.tickText = typeof _.tickText!== "undefined" ? _.tickText: zAxis.tickText;
      zAxis.title = typeof _.title !== "undefined" ? _.title : zAxis.title;
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) { return zeroLine; }
      zeroLine.show = typeof _.show !== "undefined" ? _.show : zeroLine.show;
      zeroLine.class = typeof _.class !== "undefined" ? _.class : zeroLine.class;
      zeroLine.stroke = typeof _.stroke !== "undefined" ? _.stroke : zeroLine.stroke;
      zeroLine.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : zeroLine.strokeWidth;
      zeroLine.opacity = typeof _.opacity !== "undefined" ? _.opacity : zeroLine.opacity;
      return chart;
    };

    chart.bar = function (_) {
      if (!arguments.length) { return bar; }
      bar = typeof _ !== "object" ? bar : _;
      return chart;
    };

    chart.line = function (_) {
      if (!arguments.length) { return line; }
      line = typeof _ !== "object" ? line : _;
      return chart;
    };

    chart.area = function (_) {
      if (!arguments.length) { return area; }
      area = typeof _ !== "object" ? area : _;
      return chart;
    };

    chart.points = function (_) {
      if (!arguments.length) { return points; }
      points = typeof _ !== "object" ? points : _;
      return chart;
    };

    chart.listeners = function (_) {
      if (!arguments.length) { return listeners; }
      listeners = typeof _ !== "object" ? listeners : _;
      return chart;
    };

    chart.on = addEventListener(chart);

    chart.off = removeEventListener(chart);

    return chart;
  };
});