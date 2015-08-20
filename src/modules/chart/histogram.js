define(function (require) {
  var d3 = require("d3");

  return function histogram() {
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760 - margin.left - margin.right;
    var height = 120 - margin.top - margin.bottom;
    var color = d3.scale.category20c();
    var xValue = function (d) { return d[0]; };
    var yValue = function (d) { return d[1]; };
    var offset = "zero";
    var xAxis = d3.svg.axis().orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().orient("left");
    var xScale = d3.time.scale.utc().range([0, width]);
    var yScale = d3.scale.linear().range([height, 0]).nice();
    var xDomain = function (data) {
      return d3.extent(data, function (d) { return d[0]; });
    };
    var yDomain = function (data) {
      return [
        Math.min(0, getYStackExtent.call(data, "min")),
        Math.max(0, getYStackExtent.call(data, "max"))
      ];
    };
    var dispatch = d3.dispatch("brush", "hover", "mouseover", "mouseout");

    // Axis options
    var showXAxis = true;
    var showYAxis = true;
    var xAxisTitle = "";
    var yAxisTitle = "";

    // Histogram options
    var stackClass;
    var barClass;
    var barFill;

    function chart(selection) {
      selection.each(function (data) {
        var stack = d3.layout.stack().x(xValue).y(yValue).offset(offset || "zero");
        var layers = stack(data);
        var n = layers.length; // number of layers
        var svg;
        var g;
        var stackLayer;
        var bars;

        layers = layers.map(function (d) {
          return d.map(function (e, i) {
            return [xValue.call(d, e, i), yValue.call(d, e, i), y0.call(d, e, i)];
          });
        });

        xScale.domain(xDomain.call(d3.merge(layers)));
        yScale.domain(yDomain.call(d3.merge(layers)));

        svg = d3.select(this).append("svg")
          .data([layers])
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        stackLayer = g.selectAll(".layer")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", stackClass);

        // Enter
        bars = stackLayer.selectAll("rect")
          .data(function (d) { return d; })
          .enter().append("rect")
          .attr("class", barClass)
          .attr("fill", barFill);

        // Update
        bars.attr("x", function (d, i, j) {
            if (offset === "grouped") {
              return xScale(d[0]) + xScale.rangeBand() / n * j;
            }
            return xScale(d[0]);
          })
          .attr("width", function () {
            if (offset === "grouped") {
              return xScale.rangeBand() / n;
            }
            return xScale.rangeBand();
          })
          .attr("y", function (d) {
            if (offset === "grouped") {
              return yScale(d.y);
            }
            return yScale(d.y0) - yScale(d.y0 + d.y);
          })
          .attr("height", function (d) {
            if (offset === "grouped") {
              return height - yScale(d.y);
            }
            return yScale(d.y0) - yScale(d.y0 + d.y);
          });

        // Exit
        bars.exit().remove();

        g.append("g").attr("class", "x axis");
        g.append("g").attr("class", "y axis");

        if (showXAxis) {
          g.select(".x.axis")
            .attr("transform", "translate(0," + yScale.range()[0] + ")")
            .call(xAxis.scale(xScale))
            .append("text")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(xAxisTitle);
        }

        if (showYAxis) {
          g.select(".y.axis")
            .call(yAxis.scale(yScale))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(yAxisTitle);
        }
      });
    }

    function y0(d) {
      return d.y0;
    }

    function Y(d) {
      return yScale(d.y0 + d.y);
    }

    function getYStackExtent(data, extent) {
      return d3[extent](data, function (d) {
        return d3[extent](d, Y);
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

    chart.offset = function (_) {
      if (!arguments.length) { return offset; }
      offset = _;
      return chart;
    };

    chart.xAxis = function (_) {
      if (!arguments.length) { return xAxis; }
      xAxis = _;
      return chart;
    };

    chart.yAxis = function (_) {
      if (!arguments.length) { return yAxis; }
      yAxis = _;
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

    chart.xDomain = function (_) {
      if (!arguments.length) { return xDomain; }
      xDomain = _;
      return chart;
    };

    chart.yDomain = function (_) {
      if (!arguments.length) { return yDomain; }
      yDomain = _;
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

    return chart;
  };
});