
kd3.area = function () {
  "use strict";

  var margin = {top: 20, right: 20, bottom: 20, left: 50};
  var width = 760;
  var height = 120;
  var color = d3.scale.category20c();
  var xValue = function (d) { return d[0]; };
  var yValue = function (d) { return d[1]; };
  var interpolate = "linear";
  var xScale = d3.time.scale();
  var yScale = d3.scale.linear();
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
  var yAxis = d3.svg.axis().scale(yScale).orient("left");
  var area = d3.svg.area().x(X).y0(Y0).y1(Y);
  var line = d3.svg.line().x(X).y(Y);

  function chart(selection) {
    selection.each(function (data) {

      data = data.map(function (d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });

      xScale
        .domain(d3.extent(data, function (d) { return d[0]; }))
        .range([0, width - margin.left - margin.right]);

      yScale
        .domain([
          Math.min(0, d3.min(data, function (d) { return d[1]; })),
          Math.max(0, d3.max(data, function (d) { return d[1]; }))
        ])
        .range([height - margin.top - margin.bottom, 0]);

      area.interpolate(interpolate);
      line.interpolate(interpolate);

      var svg = d3.select(this).selectAll("svg").data([data]);

      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("path").attr("class", "area");
      gEnter.append("path").attr("class", "line");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis");

      svg.attr("width", width)
        .attr("height", height);

      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

      g.select(".area")
        .attr("d", color(area));

      g.select(".line")
        .attr("d", color(line));

      g.select(".x.axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis);

      g.select(".y.axis")
        .call(yAxis);
    });
  }

  function X(d) {
    return xScale(d[0]);
  }

  function Y0(d) {
    return yScale(0);
  }

  function Y(d) {
    return yScale(d[1]);
  }

  chart.margin = function (_) {
    if (!arguments.length) { return margin; }
    console.log(_.top);
    margin.top = typeof _.top != 'undefined' ? _.top : margin.top;
    margin.right = typeof _.right != 'undefined' ? _.right : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left = typeof _.left != 'undefined' ? _.left : margin.left;
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
  }

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

  chart.interpolate = function (_) {
    if (!arguments.length) { return interpolate; }
    interpolate = _;
    return chart;
  };

  return chart;
};
