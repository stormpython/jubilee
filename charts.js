/* D3 Charts */

var Charts = {};

Charts.margin = { top: 20, right: 20, bottom: 30, left: 50 };
Charts.width = 960;
Charts.height = 500;
Charts.parseDate = d3.time.format("%d-%b-%y").parse;

Charts.lineChart = function(data, xValue, yValue) {
  var that = this;

  var margin = that.margin,
      width = that.width - margin.left - margin.right,
      height = that.height - margin.top - margin.bottom;

  var x = d3.time.scale()
    .domain(d3.extent(data, function(d) { return d[xValue]; }))
    .range([0, width]);

  var y = d3.scale.linear()
    .domain(d3.extent(data, function(d) { return d[yValue]; }))
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) { return x(d[xValue]); })
    .y(function(d) { return y(d[yValue]); })

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  return svg;
};
