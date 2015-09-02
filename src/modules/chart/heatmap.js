define(function (require) {
  var d3 = require("d3");
  var svgRect = require("src/modules/element/svg/rect");
  var canvasRect = require("src/modules/element/canvas/rect");
  var axis = require("src/modules/component/axis/axis");
  var events = require("src/modules/component/events/events");
  var valuator = require("src/modules/valuator");
  var addEventListener = require("src/modules/helpers/add_event_listener");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");

  return function heatmap() {
    // Private variables
    var margin = { top: 20, right: 20, bottom: 20, left: 50 };
    var width = 960;
    var height = 500;
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var rectPadding = 0.1;
    var isCanvas = false;

    var xScale = {
      domain: null,
      reverse: false,
      sort: false
    };

    var yScale = {
      domain: null,
      reverse: false,
      sort: false
    };

    var rect = {
      class: "rect",
      fill: function (d) { return d.fill; },
      opacity: function () { return 1; },
      strokeWidth: 0
    };

    var xAxis = {
      show: true,
      class: "x axis",
      title: { class: "x-label", text: "" },
      tick: {},
      tickText: {
        x: 0,
        y: 9,
        dy: ".71em",
        anchor: "middle"
      },
      filterTicksBy: 1,
      tickRotate: 270
    };

    var yAxis = {
      show: true,
      class: "y axis",
      title: { class: "y-label", text: "" },
      tick: {},
      tickText: {
        x: -9,
        y: 0,
        dy: ".35em",
        anchor: "end"
      },
      filterTicksBy: 1
    };

    var listeners = {};

    function chart(selection) {
      selection.each(function (data, index) {
        var canvas;

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var xDomain = xScale.domain || getDomain(data, xValue);
        var yDomain = yScale.domain || getDomain(data, yValue);

        if (xScale.sort) {
          xDomain.sort(typeof xScale.sort === "function" ? xScale.sort : ascending);
        }
        if (yScale.sort) {
          yDomain.sort(typeof yScale.sort === "function" ? yScale.sort : ascending);
        }
        if (xScale.reverse) { xDomain.reverse(); }
        if (yScale.reverse) { yDomain.reverse(); }

        var x = d3.scale.ordinal()
          .domain(xDomain)
          .rangeBands([0, width], rectPadding);

        var y = d3.scale.ordinal()
          .domain(yDomain)
          .rangeBands([0, height], rectPadding);

        data.forEach(function (d, i) {
          d.dx = xValue.call(data, d, i);
          d.dy = yValue.call(data, d, i);
          d.fill = rect.fill.call(data, d, i);
          d.opacity = rect.opacity.call(data, d, i);
        });

        var padding = Object.keys(margin)
          .map(function (key) {
            return margin[key];
          }).join("px ") + "px";

        if (isCanvas) {
          var canvasRects = canvasRect()
            .class(rect.class)
            .x(function (d) { return x(d.dx); })
            .y(function (d) { return y(d.dy); })
            .width(x.rangeBand())
            .height(y.rangeBand())
            .fillStyle(rect.fill)
            .strokeStyle(rect.stroke)
            .lineWidth(rect.strokeWidth)
            .opacity(rect.opacity);

          canvas = d3.select(this).append("canvas")
            .attr("width", width)
            .attr("height", height)
            .style("padding", padding);

          canvas.datum(data).call(canvasRects);
        }

        var svgEvents = events().listeners(listeners);

        var svg = d3.select(this).append("svg")
          .attr("width", width)
          .attr("height", height)
          .style("padding", padding)
          .call(svgEvents);

        var g = svg.append("g").attr("transform", "translate(0,0)");

        if (!isCanvas) {
          var svgRects = svgRect()
            .class(rect.class)
            .x(function (d) { return x(d.dx); })
            .y(function (d) { return y(d.dy); })
            .width(x.rangeBand())
            .height(y.rangeBand())
            .fill(rect.fill)
            .stroke(rect.stroke)
            .strokeWidth(rect.strokeWidth)
            .opacity(rect.opacity);

          g.append("g")
            .attr("class", "heat-rect")
            .datum(data).call(svgRects);
        }

        if (xAxis.show) {
          var axisX = axis()
            .scale(x)
            .class(xAxis.class)
            .transform(xAxis.transform || "translate(0," + height + ")")
            .tick({
              values: x.domain()
                .filter(function (d, i) {
                  return (i % xAxis.filterTicksBy) === 0;
                })
            })
            .tickText(xAxis.tickText)
            .title(xAxis.title);

          g.call(axisX);

          // Modifying the x axis tick labels
          g.selectAll(".tick text")
            .attr("x", -10)
            .attr("y", -4)
            .attr("transform", "rotate(" + xAxis.tickRotate + ")")
            .style("text-anchor", "end");
        }

        if (yAxis.show) {
          var axisY = axis()
            .scale(y)
            .class(yAxis.class)
            .orient("left")
            .tick({
              values: y.domain()
                .filter(function (d, i) {
                  return (i % yAxis.filterTicksBy) === 0;
                })
            })
            .tickText(yAxis.tickText)
            .title(yAxis.title);

          g.call(axisY);
        }
      });
    }

    // Sort ascending
    function ascending(prev, cur) {
      if (prev > cur) { return 1; }
      if (prev < cur) { return -1; }
      return 0;
    }

    // Creates a unique array of items
    function getDomain(data, accessor) {
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
      width = typeof _ !== "number" ? width : _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) { return height; }
      height = typeof _ !== "number" ? height : _;
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
      xScale.domain = typeof _.domain !== "undefined" ? _.domain : xScale.domain;
      xScale.reverse = typeof _.reverse !== "undefined" ? _.reverse : xScale.reverse;
      xScale.sort = typeof _.sort !== "undefined" ? _.sort : xScale.sort;
      return chart;
    };

    chart.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale.domain = typeof _.domain !== "undefined" ? _.domain : yScale.domain;
      yScale.reverse = typeof _.reverse !== "undefined" ? _.reverse : yScale.reverse;
      yScale.sort = typeof _.sort !== "undefined" ? _.sort : yScale.sort;
      return chart;
    };

    chart.padding = function (_) {
      if (!arguments.length) { return rectPadding; }
      rectPadding = typeof _ !== "number" ? rectPadding : _;
      return chart;
    };

    chart.canvas = function (_) {
      if (!arguments.length) { return isCanvas; }
      isCanvas = typeof _ === "boolean" ? _ : false;
      return chart;
    };

    chart.rect = function (_) {
      if (!arguments.length) { return rect; }
      rect.class = typeof _.class !== "undefined" ? _.class : rect.class;
      rect.stroke = typeof _.stroke !== "undefined" ? _.stroke : rect.stroke;
      rect.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : rect.strokeWidth;
      rect.fill = typeof _.fill !== "undefined" ? d3.functor(_.fill) : rect.fill;
      rect.opacity = typeof _.opacity !== "undefined" ? d3.functor(_.opacity) : rect.opacity;
      return chart;
    };

    chart.xAxis = function (_) {
      if (!arguments.length) { return xAxis; }
      xAxis.show = typeof _.show !== "undefined" ? _.show : xAxis.show;
      xAxis.class = typeof _.class !== "undefined" ? _.class : xAxis.class;
      xAxis.transform = typeof _.transform !== "undefined" ? _.transform : xAxis.transform;
      xAxis.tick = typeof _.tick !== "undefined" ? _.tick : xAxis.tick;
      xAxis.tickText = typeof _.tickText!== "undefined" ? _.tickText: xAxis.tickText;
      xAxis.title = typeof _.title !== "undefined" ? _.title : xAxis.title;
      xAxis.filterTicksBy = typeof _.filterTicksBy !== "undefined" ? _.filterTicksBy : xAxis.filterTicksBy;
      xAxis.tickRotate = typeof _.tickRotate !== "undefined" ? _.tickRotate : xAxis.tickRotate;
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
      yAxis.filterTicksBy = typeof _.filterTicksBy !== "undefined" ? _.filterTicksBy : yAxis.filterTicksBy;
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
