define(function (require) {
  var d3 = require("d3");
  var box = require("src/modules/layout/box");
  var boxPlot = require("src/modules/component/boxplot");
  var axis = require("src/modules/component/axis");

  return function boxplot() {
    var margin = { top:20, right: 20, bottom: 50, left: 50 };
    var width = 760;
    var height = 400;
    var xValue = function (d) { return d.x; };
    var values = function (d) { return d.values; };
    var accessor = function (d) { return d; };
    var xScale = null;
    var yScale = null;
    var transform = null;
    var dispatch = d3.dispatch("hover", "mouseover", "mouseout");

    // X Axis
    var xAxis = {
      show: true,
      xAxisClass:  "x axis",
      textX: function () { return width / 2; },
      textY: 30,
      textDY: ".71em",
      textAnchor: "middle",
      title: ""
    };

    // Y Axis
    var yAxis = {
      show: true,
      yAxisClass: "y axis",
      textX: -height / 2,
      textY: -60,
      textDY: ".71em",
      textAnchor: "middle",
      title: ""
    };

    // Box Options
    var boxWidth = 20;

    function chart(selection) {
      selection.each(function (data) {
        var boxData = box().values(values).accessor(accessor);

        var svg = d3.select(this).append("svg")
          .datum(boxData(data))
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        xScale = xScale ? xScale : d3.time.scale()
          .domain(d3.extent(data, xValue))
          .range([0, width]);

        yScale = yScale ? yScale : d3.scale.linear()
          .domain([
            Math.min(0, d3.min(d3.merge(data))),
            Math.max(0, d3.max(d3.merge(data)))
          ])
          .range([height, 0]);

        var boxPlotFunc = boxPlot()
          .transform(transform ? transform : gTransform)
          .box({ width: boxWidth, height: boxHeight, y: boxY })
          .range({ y1: Y1, y2: Y2 })
          .max({ y1: Y1, y2: Y1 })
          .min({ y1: Y2, y2: Y2});

        g.call(boxPlotFunc);

        if (xAxis.show) {
          var axisX = axis()
            .scale(xScale)
            .gClass(xAxis.xAxisClass)
            .transform("translate(0," + yScale.range()[0] + ")")
            .titleX(xAxis.textX)
            .titleY(xAxis.textY)
            .titleDY(xAxis.textDY)
            .titleAnchor(xAxis.textAnchor)
            .title(xAxis.title);

          g.call(axisX);
        }

        if (yAxis.show) {
          var axisY = axis()
            .scale(yScale)
            .orient("left")
            .gClass(yAxis.yAxisClass)
            .titleX(yAxis.textX)
            .titleY(yAxis.textY)
            .titleDY(yAxis.textDY)
            .titleAnchor(yAxis.textAnchor)
            .title(yAxis.title);

          g.call(axisY);
        }
      });
    }

    function boxHeight(d) {
      return yScale(d.q1) - yScale(d.q3);
    }

    function boxY(d) {
      return yScale(d.q3) - yScale(d.median);
    }

    function Y1(d) {
      return yScale(d.max) - yScale(d.median);
    }

    function Y2(d) {
      return yScale(d.min) - yScale(d.median);
    }

    function gTransform(d, i) {
      return "translate(" + xScale(xValue.call(this, d, i)) + "," + yScale(d.median) + ")";
    }

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

    chart.x = function (_) {
      if (!arguments.length) { return xValue; }
      xValue = _;
      return chart;
    };

    chart.values = function (_) {
      if (!arguments.length) { return values; }
      values = _;
      return chart;
    };

    chart.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return chart;
    };

    chart.xScale = function (_) {
      if (!arguments.length) { return xScale; }
      xScale = _;
      return chart;
    };

    chart.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale = _;
      return chart;
    };

    chart.transform = function (_) {
      if (!arguments.length) { return transform; }
      transform = _;
      return chart;
    };

    chart.dispatch = function (_) {
      if (!arguments.length) { return dispatch; }
      dispatch = _;
      return chart;
    };

    chart.xAxis = function (_) {
      if (!arguments.length) { return xAxis; }
      xAxis.show = typeof _.show !== "undefined" ? _.show: xAxis.show;
      xAxis.xAxisClass = typeof _.xAxisClass !== "undefined" ? _.xAxisClass : xAxis.xAxisClass;
      xAxis.textX = typeof _.textX !== "undefined" ? _.textX : xAxis.textX;
      xAxis.textY = typeof _.textY !== "undefined" ? _.textY : xAxis.textY;
      xAxis.textDY = typeof _.textDY !== "undefined" ? _.textDY : xAxis.textDY;
      xAxis.textAnchor = typeof _.textAnchor !== "undefined" ? _.textAnchor : xAxis.textAnchor;
      xAxis.title = typeof _.title !== "undefined" ? _.title : xAxis.title;
      return chart;
    };

    chart.yAxis = function (_) {
      if (!arguments.length) { return yAxis; }
      yAxis.show = typeof _.show !== "undefined" ? _.show: yAxis.show;
      yAxis.yAxisClass = typeof _.yAxisClass !== "undefined" ? _.yAxisClass : yAxis.yAxisClass;
      yAxis.textX = typeof _.textX !== "undefined" ? _.textX : yAxis.textX;
      yAxis.textY = typeof _.textY !== "undefined" ? _.textY : yAxis.textY;
      yAxis.textDY = typeof _.textDY !== "undefined" ? _.textDY : yAxis.textDY;
      yAxis.textAnchor = typeof _.textAnchor !== "undefined" ? _.textAnchor : yAxis.textAnchor;
      yAxis.title = typeof _.title !== "undefined" ? _.title : yAxis.title;
      return chart;
    };

    chart.boxWidth = function (_) {
      if (!arguments.length) { return boxWidth; }
      boxWidth = _;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});