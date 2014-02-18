
kd3.area = function () {
  "use strict";

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 760,
      height = 120,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.time.scale(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(),
      yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(),
      area = d3.svg.area().x(X).y0(height).y1(Y),
      line = d3.svg.line().x(X).y(Y);

  function chart(selection) {
    selection.each(function(data) {

      xScale
        .domain(d3.extent(data, function(d) { return d[0]; }))
        .range([0, width - margin.left - margin.right]);

      yScale
        .domain([0, d3.max(data, function(d) { return d[1]; })])
        .range([height - margin.top - margin.bottom, 0]);

      var svg = d3.select(this).selectAll("svg")
        .data([data])
        .enter()
        .append("svg").appeng("g")

    });
  }

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  return chart;

  // Axes scale
  // need to determine whether x axis is time scale or linear scale
  x = d3.time.scale()
    .domain(d3.extent(data, function(d) { return parseDate(d[xValue]); }))
    .range([0, width]);

  // need to give option for the type of y axis to use or at least think about it
  y = d3.scale.linear()
    .domain(d3.extent(data, function(d) { return d[yValue]; }))
    .range([height, 0]);

  // Axes
  // add options for adjusting ticks and formats and the orientation of the axes
  xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks()
    .tickFormat();

  yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks()
    .tickSize()
    .tickPadding()
    .tickFormat();

  // D3 area function.
  area = d3.svg.area()
    .x(function(d) { return x(d[xValue]); })
    .y0(height)
    .y1(function(d) { return y(d[yValue]); });

  // SVG
  svg = d3.select(el).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // give option for having x axis on top of svg or bottom, perhaps middle
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // give option for having y axis on left or right or middle
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("");

  groups = svg.selectAll("")
    .data(data)
    .enter()
    .append("g");

  groups.append("path")
    .attr("class", "area")
    .attr("d", function(d) { return area(d[yValue]); });

  return svg;
};