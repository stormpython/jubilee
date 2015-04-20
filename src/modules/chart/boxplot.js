define(function (require) {
  var d3 = require("d3");
  var box = require("src/modules/layout/box");
  var boxPlot = require("src/modules/component/boxplot/boxplot");
  var axis = require("src/modules/component/axis/axis");

  return function boxplot() {
    var margin = { top:20, right: 20, bottom: 50, left: 50 };
    var width = 760;
    var height = 400;
    var xValue = function (d) { return d.x; };
    var values = function (d) { return d.values; };
    var accessor = function (d) { return d; };
    var xScale = d3.time.scale().range([0, width]);
    var yScale = d3.scale.linear().range([height, 0]);
    var dispatch = d3.dispatch("hover", "mouseover", "mouseout");

    // X Axis
    var showXAxis = true;
    var xAxisClass = "x axis";
    var xAxisTextX = function () { return width / 2; };
    var xAxisTextY = 30;
    var xAxisTextDY = ".71em";
    var xAxisTextAnchor = "middle";
    var xAxisTitle = "";

    // Y Axis
    var showYAxis = true;
    var yAxisClass = "y axis";
    var yAxisTextX = -height / 2;
    var yAxisTextY = -60;
    var yAxisTextDY = ".71em";
    var yAxisTextAnchor = "middle";
    var yAxisTitle = "";

    // Box Options
    var boxWidth = 20;

    function chart(selection) {
      selection.each(function (data) {
        var boxData = box().values(values).accessor(accessor);

        data = boxData(data);

        var svg = d3.select(this).append("svg")
          .data([data])
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var mapData = mapDomain(data);
        var xDomain = d3.extent(data, xValue);
        var yDomain = [
          d3.min(mapData),
          d3.max(mapData)
        ];

        xScale.domain(xDomain);
        yScale.domain(yDomain);

        var boxPlotFunc = boxPlot()
          .gTransform(transform)
          .boxWidth(boxWidth)
          .boxHeight(boxHeight)
          .boxY(boxY)
          .rangeY1(Y1)
          .rangeY2(Y2)
          .maxY1(Y1)
          .maxY2(Y1)
          .minY1(Y2)
          .minY2(Y2);

        g.call(boxPlotFunc);

        if (showXAxis) {
          var xAxis = axis()
            .scale(xScale)
            .gClass(xAxisClass)
            .transform("translate(0," + yScale.range()[0] + ")")
            .titleX(xAxisTextX)
            .titleY(xAxisTextY)
            .titleDY(xAxisTextDY)
            .titleAnchor(xAxisTextAnchor)
            .title(xAxisTitle);

          g.call(xAxis);
        }

        if (showYAxis) {
          var yAxis = axis()
            .scale(yScale)
            .orient("left")
            .gClass(yAxisClass)
            .titleX(yAxisTextX)
            .titleY(yAxisTextY)
            .titleDY(yAxisTextDY)
            .titleAnchor(yAxisTextAnchor)
            .title(yAxisTitle);

          g.call(yAxis);
        }
      });
    }

    function transform(d, i) {
      return "translate(" + xScale(xValue.call(this, d, i)) + "," + yScale(d.median) + ")";
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

    function mapDomain(data) {
      return data.map(function (d, i) {
        return accessor.call(this, values.call(this, d, i));
      }).reduce(function (a, b) {
        return a.concat(b);
      });
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

    chart.dispatch = function (_) {
      if (!arguments.length) { return dispatch; }
      dispatch = _;
      return chart;
    };

    chart.showXAxis = function (_) {
      if (!arguments.length) { return showXAxis; }
      showXAxis = _;
      return chart;
    };

    chart.showYAxis = function (_) {
      if (!arguments.length) { return showYAxis; }
      showYAxis = _;
      return chart;
    };

    chart.xAxisTitle = function (_) {
      if (!arguments.length) { return xAxisTitle; }
      xAxisTitle = _;
      return chart;
    };

    chart.yAxisTitle = function (_) {
      if (!arguments.length) { return yAxisTitle; }
      yAxisTitle = _;
      return chart;
    };

    chart.xAxisClass = function (_) {
      if (!arguments.length) { return xAxisClass; }
      xAxisClass = _;
      return chart;
    };

    chart.yAxisClass = function (_) {
      if (!arguments.length) { return yAxisClass; }
      yAxisClass = _;
      return chart;
    };

    chart.xAxisTextX = function (_) {
      if (!arguments.length) { return xAxisTextX; }
      xAxisTextX = _;
      return chart;
    };

    chart.yAxisTextX = function (_) {
      if (!arguments.length) { return yAxisTextX; }
      yAxisTextX = _;
      return chart;
    };

    chart.xAxisTextY = function (_) {
      if (!arguments.length) { return xAxisTextY; }
      xAxisTextY = _;
      return chart;
    };

    chart.yAxisTextY = function (_) {
      if (!arguments.length) { return yAxisTextY; }
      yAxisTextY = _;
      return chart;
    };

    chart.xAxisTextDY = function (_) {
      if (!arguments.length) { return xAxisTextDY; }
      xAxisTextDY = _;
      return chart;
    };

    chart.yAxisTextDY = function (_) {
      if (!arguments.length) { return yAxisTextDY; }
      yAxisTextDY = _;
      return chart;
    };

    chart.xAxisTextAnchor = function (_) {
      if (!arguments.length) { return xAxisTextAnchor; }
      xAxisTextAnchor = _;
      return chart;
    };

    chart.yAxisTextAnchor = function (_) {
      if (!arguments.length) { return yAxisTextAnchor; }
      yAxisTextAnchor = _;
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