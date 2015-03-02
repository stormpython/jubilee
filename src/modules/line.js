define(function (require) {
  var d3 = require("d3");
  var circles = require("circles");

  return function lineChart() {
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760 - margin.left - margin.right;
    var height = 120 - margin.top - margin.bottom;
    var color = d3.scale.category20c();
    var interpolate = "linear";
    var xValue = function (d) { return d[0]; };
    var yValue = function (d) { return d[1]; };
    var xAxis = d3.svg.axis().orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().orient("left");
    var xScale = d3.time.scale.utc().range([0, width]);
    var yScale = d3.scale.linear().range([height, 0]).nice();
    var xDomain = function (data) {
      return d3.extent(data, function (d) { return d[0]; });
    };
    var yDomain = function (data) {
      return [
        Math.min(0, d3.min(data, function (d) { return d[1]; })),
        Math.max(0, d3.max(data, function (d) { return d[1]; }))
      ];
    };

    // Axis options
    var showXAxis = true;
    var showYAxis = true;
    var xAxisTitle = "";
    var yAxisTitle = "";

    // Line Options
    var lineClass = function (d, i) { return "line" + i; };
    var lineStroke = function (d) { return color(d.label); };

    // Circle Options
    var addCircles = true;
    var circleClass = function (d, i) { return "circle" + i; };
    // TODO: change the circles so that labels are not needed on all data objects.
    var circleFill = function (d) { return color(d[2]); };
    var circleStroke = function (d) { return color(d[2]); };
    var circleRadius = 5;
    var circleStrokeWidth = 3;

    function chart(selection) {
      selection.each(function (data) {
        var line = d3.svg.line().x(X).y(Y);
        var svg;
        var g;

        data = data.map(function (d) {
          return d.map(function (e, i) {
            return [xValue.call(d, e, i), yValue.call(d, e, i)];
          });
        });

        xScale.domain(xDomain.call(mapDomain(data)));
        yScale.domain(yDomain.call(mapDomain(data)));

        line.interpolate(interpolate);

        svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width)
          .attr("height", height);

        g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        g.selectAll("g")
          .data(data, function (d) { return d; })
          .enter().append("g")
          .append("path")
          .attr("class", lineClass)
          .attr("stroke", lineStroke)
          .attr("d", line);

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

        if (addCircles) {
          var points = circles()
            .xScale(xScale)
            .yScale(yScale)
            .cx(xValue)
            .cy(yValue)
            .color(color)
            .radius(circleRadius)
            .circleClass(circleClass)
            .fill(circleFill)
            .stroke(circleStroke)
            .strokeWidth(circleStrokeWidth);

          svg.call(points);
        }
      });
    }

    function mapDomain(data) {
      return data.reduce(function (a, b) {
        return a.concat(b);
      });
    }

    function X(d) {
      return xScale(d[0]);
    }

    function Y(d) {
      return yScale(d[1]);
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

    chart.interpolate = function (_) {
      if (!arguments.length) { return interpolate; }
      interpolate = _;
      return chart;
    };

    chart.lineStroke = function (_) {
      if (!arguments.length) { return lineStroke; }
      lineStroke = _;
      return chart;
    };

    chart.lineClass = function (_) {
      if (!arguments.length) { return lineClass; }
      lineClass = _;
      return chart;
    };

    chart.addCircles = function (_) {
      if (!arguments.length) { return addCircles; }
      addCircles = _;
      return chart;
    };

    chart.circleClass = function (_) {
      if (!arguments.length) { return circleClass; }
      circleClass = _;
      return chart;
    };

    chart.circleRadius = function (_) {
      if (!arguments.length) { return circleRadius; }
      circleRadius = _;
      return chart;
    };

    chart.circleFill = function (_) {
      if (!arguments.length) { return circleFill; }
      circleFill = _;
      return chart;
    };

    chart.circleStroke = function (_) {
      if (!arguments.length) { return circleStroke; }
      circleStroke = _;
      return chart;
    };

    chart.circleStrokeWidth = function (_) {
      if (!arguments.length) { return circleStrokeWidth; }
      circleStrokeWidth = _;
      return chart;
    };

    return chart;
  };
});
