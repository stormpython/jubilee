define(function (require) {
  var d3 = require("d3");
  var axis = require("src/modules/component/axis/axis");
  var graphFunc = require("src/modules/component/chart/chart");

  return function xzyPlot() {
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760 - margin.left - margin.right;
    var height = 120 - margin.top - margin.bottom;
    var xScale = null;
    var yScale = null;
    var zScale = null;
    var elements = null;
    var dispatch = d3.dispatch("brush", "hover", "mouseover", "mouseout");

    // Axis options
    var showXAxis = true;
    var xAxisTitle = "";
    var showYAxis = true;
    var yAxisTitle = "";
    var showZAxis = true;
    var zAxisTitle = "";

    function chart(selection) {
      selection.each(function (data) {
        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        if (typeof elements === "function") { g.call(elements); }
        if (elements instanceof Array) {
          elements.forEach(function (element) {
            if (typeof element === "function") { g.call(element); }
          });
        }

        if (showXAxis) {
          var xAxis = axis()
            .scale(xScale)
            .gClass("x axis")
            .transform("translate(0," + yScale.range()[0] + ")")
            .titleY(6)
            .titleDY(".71em")
            .titleAnchor("end")
            .title(xAxisTitle);

          g.call(xAxis);
        }

        if (showYAxis) {
          var yAxis = axis()
            .scale(yScale)
            .orient("left")
            .gClass("y axis")
            .titleY(6)
            .titleDY(".71em")
            .titleAnchor("end")
            .title(yAxisTitle);

          g.call(yAxis);
        }

        if (showZAxis) {
          var zAxis = axis()
            .scale(zScale)
            .orient("right")
            .gClass("z axis")
            .transform("translate(" + xScale.range()[1] + "," + "0)")
            .titleY(6)
            .titleDY(".71em")
            .titleAnchor("end")
            .title(zAxisTitle);

          g.call(zAxis);
        }
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

    chart.zScale = function (_) {
      if (!arguments.length) { return zScale; }
      zScale = _;
      return chart;
    };

    chart.elements = function (_) {
      if (!arguments.length) { return elements; }
      elements = _;
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

    chart.showZAxis = function (_) {
      if (!arguments.length) { return showZAxis; }
      showZAxis = _;
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

    chart.zAxisTitle = function (_) {
      if (!arguments.length) { return zAxisTitle; }
      zAxisTitle = _;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});