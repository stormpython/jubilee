define(function (require) {
  var d3 = require("d3");
  var graph = require("src/modules/component/chart/chart");

  return function xzyPlot() {
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760 - margin.left - margin.right;
    var height = 120 - margin.top - margin.bottom;
    var xScale = null;
    var leftScale = null;
    var rightScale = null;
    var shapes = null;
    var graphData = null;
    var graphTransform = null;
    var graphs = null;
    var dispatch = d3.dispatch("brush", "hover", "mouseover", "mouseout");

    // Axis options
    var showXAxis = true;
    var xAxisTitle = "";
    var showLeftAxis = true;
    var leftAxisTitle = "";
    var showRightAxis = true;
    var rightAxisTitle = "";

    function chart(selection) {
      selection.each(function (data) {
        var xAxis = d3.svg.axis().orient("bottom");
        var leftAxis = d3.svg.axis().orient("left");
        var rightAxis = d3.svg.axis().orient("right");
        var chartDraw = graph()
          .transform(graphTransform)
          .datum(graphData)
          .draw(graphs);

        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        if (typeof shapes === "function") { g.call(shapes); }
        if (shapes instanceof Array) {
          shapes.forEach(function (shape) {
            if (typeof shape === "function") { g.call(shape); }
          });
        }

        if (typeof graphs === "function") {
          g.call(chartDraw);
        }

        //if (graphs instanceof Array) {
        //  graphs.forEach(function (graph, i) {
        //    g.datum(graphData[i]).call(chartDraw);
        //  });
        //}

        if (showXAxis) {
          g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + leftScale.range()[0] + ")")
            .call(xAxis.scale(xScale))
            .append("text")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(xAxisTitle);
        }

        if (showLeftAxis) {
          g.append("g")
            .attr("class", "left axis")
            .call(leftAxis.scale(leftScale))
            .append("text")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(leftAxisTitle);
        }

        if (showRightAxis) {
          g.append("g")
            .attr("class", "right axis")
            .attr("transform", "translate(" + xScale.range()[1] + "," + "0)")
            .call(rightAxis.scale(rightScale))
            .append("text")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(rightAxisTitle);
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

    chart.leftScale = function (_) {
      if (!arguments.length) { return leftScale; }
      leftScale = _;
      return chart;
    };

    chart.rightScale = function (_) {
      if (!arguments.length) { return rightScale; }
      rightScale = _;
      return chart;
    };

    chart.shapes = function (_) {
      if (!arguments.length) { return shapes; }
      shapes = _;
      return chart;
    };

    chart.graphs = function (_) {
      if (!arguments.length) { return graphs; }
      graphs = _;
      return chart;
    };

    chart.graphData = function (_) {
      if (!arguments.length) { return graphData; }
      graphData = _;
      return chart;
    };

    chart.graphTransform = function (_) {
      if (!arguments.length) { return graphTransform; }
      graphTransform = _;
      return chart;
    };

    chart.showXAxis = function (_) {
      if (!arguments.length) { return showXAxis; }
      showXAxis = _;
      return chart;
    };

    chart.showLeftAxis = function (_) {
      if (!arguments.length) { return showLeftAxis; }
      showLeftAxis = _;
      return chart;
    };

    chart.showRightAxis = function (_) {
      if (!arguments.length) { return showRightAxis; }
      showRightAxis = _;
      return chart;
    };

    chart.xAxisTitle = function (_) {
      if (!arguments.length) { return xAxisTitle; }
      xAxisTitle = _;
      return chart;
    };

    chart.leftAxisTitle = function (_) {
      if (!arguments.length) { return leftAxisTitle; }
      leftAxisTitle = _;
      return chart;
    };

    chart.rightAxisTitle = function (_) {
      if (!arguments.length) { return rightAxisTitle; }
      rightAxisTitle = _;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});