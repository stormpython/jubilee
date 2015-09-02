define(function (require) {
  var d3 = require("d3");
  var valuator = require("src/modules/valuator");
  var scaletor = require("src/modules/helpers/scaletor");
  var clip = require("src/modules/element/svg/clipPath");
  var axis = require("src/modules/component/axis/axis");
  var brushComponent = require("src/modules/component/events/brush");
  var events = require("src/modules/component/events/events");
  var rect = require("src/modules/element/svg/rect");
  var zeroAxisLine = require("src/modules/element/svg/line");
  var addEventListener = require("src/modules/helpers/add_event_listener");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");

  return function barChart() {
    // Private variables
    var margin = { top: 20, right: 20, bottom: 20, left: 50 };
    var width = 960;
    var height = 500;
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var xScale = {
      scale: d3.scale.ordinal(),
      domain: null,
      nice: false,
      clamp: false
    };
    var yScale = {
      scale: d3.scale.linear(),
      domain: null,
      nice: true,
      clamp: false
    };
    var xAxis = {
      show: true,
      gridlines: false,
      class: "x axis",
      transform: null,
      tick: {},
      tickText: { anchor: "middle", x: 0, y: 9, dx: "", dy: ".71em" },
      title: { anchor: "middle" }
    };
    var yAxis = {
      show: true,
      gridlines: false,
      class: "y axis",
      transform: null,
      tick: {},
      tickText: { anchor: "end", x: -9, y: 0, dy: ".32em" },
      title: { x: 0, y: -40, anchor: "middle" }
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
    var brushOpts = {
      class: "brush",
      x: true,
      y: false,
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

    var color = d3.scale.category10();

    var cssClass = "bar";
    var fill = function (d, i) { return color(i); };
    var stroke = function (d, i) { return color(i); };
    var strokeWidth = 1;
    var opacity = 1;

    var group = false;
    var barPadding = 0.1;
    var groupPadding = 0;
    var listeners = {};

    function chart(selection) {
      selection.each(function (data, index) {
        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;

        /* Stacking Options ******************************** */
        var stack = d3.layout.stack()
          .x(xValue)
          .y(yValue)
          .offset(stacks.offset)
          .order(stacks.order)
          .out(stacks.out);

        data = stack(data);
        /* ******************************** */

        var x = xScale.scale
          .domain(xScale.domain || getXDomain(d3.merge(data), xValue));

        var y = yScale.scale
          .domain(yScale.domain ||
          [
            0,
            d3.max(d3.merge(data), function (d) {
              if (group) { return d.y; }
              return d.y0 + d.y;
            })
          ]);

        if (typeof x.rangeRoundBands === "function") {
          x.rangeRoundBands([0, adjustedWidth], barPadding, 0);
        } else {
          x.range([0, adjustedWidth]);
        }

        if (typeof y.rangeRoundBands === "function") {
          y.rangeRoundBands([0, adjustedHeight], barPadding, 0);
        } else {
          y.range([adjustedHeight, 0]);
        }

        if (typeof x.clamp === "function" && xScale.clamp) { x.clamp(); }
        if (typeof x.nice === "function" && xScale.nice) { x.nice(); }
        if (typeof y.clamp === "function" && yScale.clamp) { y.clamp(); }
        if (typeof y.nice === "function" && yScale.nice) { y.nice(); }

        /* Canvas ******************************** */
        var svgEvents = events().listeners(listeners);

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
            .class(zeroLine.class)
            .x1(function () { return x.range()[0]; })
            .x2(function () { return x.range()[1]; })
            .y1(function () { return y(0); })
            .y2(function () { return y(0); })
            .stroke(zeroLine.stroke)
            .strokeWidth(zeroLine.strokeWidth)
            .opacity(zeroLine.opacity);

          g.append("g").datum([{}]).call(zLine);
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
            .transform(xAxis.transform || "translate(0," + adjustedHeight + ")")
            .tick(xAxis.tick)
            .tickText(xAxis.tickText)
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
        /* ******************************** */

        /* ClipPath ******************************** */
        var clippath = clip().width(adjustedWidth).height(adjustedHeight);
        var clippedG = g.call(clippath).append("g")
          .attr("clip-path", "url(#" + clippath.id() + ")");
        /* ******************************** */

        if (group) {
          var groupScale = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeRoundBands([0, x.rangeBand()], groupPadding, 0);
        }

        var j = -1;

        var rects = rect()
          .x(rect.x || function (d, i) {
            if (group) {
              if (i === 0) { j++; }
              return x(xValue.call(this, d, i)) + groupScale(j);
            }
            return x(xValue.call(this, d, i));
          })
          .y(rect.y || function (d, i) {
            if (group) { return y(yValue.call(this, d, i)); }
            return y(d.y0 + Math.abs(yValue.call(this, d, i)));
          })
          .width(rect.width || function (d, i) {
            if (group) { return groupScale.rangeBand(); }
            return x.rangeBand();
          })
          .height(rect.height || function (d, i) {
            return y(d.y0) - y(d.y0 + Math.abs(yValue.call(this, d, i)));
          })
          .rx(rect.rx)
          .ry(rect.ry)
          .class(rect.class)
          .fill(rect.fill)
          .stroke(rect.stroke)
          .strokeWidth(rect.strokeWidth)
          .opacity(rect.opacity);

        clippedG.append("g").selectAll("g")
          .data(data)
          .enter().append("g")
          .call(rects);
      });
    }

    // Creates a unique array of items
    function getXDomain(data, accessor) {
      return data
        .map(function (item) {
          return accessor.call(this, item);
        })
        .filter(function (item, index, array) {
          return array.indexOf(item) === index;
        });
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

    chart.xAxis = function (_) {
      if (!arguments.length) { return xAxis; }
      xAxis.show = typeof _.show !== "undefined" ? _.show : xAxis.show;
      xAxis.gridlines = typeof _.gridlines !== "undefined" ? _.gridlines : xAxis.gridlines;
      xAxis.class = typeof _.class !== "undefined" ? _.class : xAxis.class;
      xAxis.transform = typeof _.transform !== "undefined" ? _.transform : xAxis.transform;
      xAxis.tick = typeof _.tick !== "undefined" ? _.tick : xAxis.tick;
      xAxis.tickText = typeof _.tickText!== "undefined" ? _.tickText: xAxis.tickText;
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

    chart.zeroLine = function (_) {
      if (!arguments.length) { return zeroLine; }
      zeroLine.show = typeof _.show !== "undefined" ? _.show : margin.show;
      zeroLine.class = typeof _.class !== "undefined" ? _.class : margin.class;
      zeroLine.stroke = typeof _.stroke !== "undefined" ? _.stroke : margin.stroke;
      zeroLine.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : margin.strokeWidth;
      zeroLine.opacity = typeof _.opacity !== "undefined" ? _.opacity : margin.opacity;
      return chart;
    };

    chart.group = function (_) {
      if (!arguments.length) { return group; }
      group = typeof _ !== "boolean" ? group : _;
      return chart;
    };

    chart.barPadding = function (_) {
      if (!arguments.length) { return barPadding; }
      barPadding = typeof _ !== "number" ? barPadding : _;
      return chart;
    };

    chart.groupPadding = function (_) {
      if (!arguments.length) { return groupPadding; }
      groupPadding = typeof _ !== "number" ? groupPadding : _;
      return chart;
    };

    chart.rect = function (_) {
      if (!arguments.length) { return rect; }
      rect.x = typeof _.x !== "undefined" ? _.x : rect.x;
      rect.y = typeof _.y !== "undefined" ? _.y : rect.y;
      rect.fill = typeof _.fill !== "undefined" ? _.fill : rect.fill;
      rect.stroke = typeof _.stroke !== "undefined" ? _.stroke : rect.stroke;
      rect.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : rect.strokeWidth;
      rect.opacity = typeof _.opacity !== "undefined" ? _.opacity : rect.opacity;
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