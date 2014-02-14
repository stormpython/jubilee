/**
 * Created by shelbysturgis on 2/13/14.
 */

var kd3 = window.kd3 || {};

kd3.version = '0.1.0';

window.kd3 = kd3;

kd3.namespace = function (ns_string) {
  "use strict";

  var parts = ns_string.split('.'),
      parent = kd3,
      i;

  // strip redundant leading global
  if (parts[0] === "kd3") {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    // create a property if it doesn't exist
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }

  return parent;
};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.area = function (args) {
  "use strict";

  // Margins, Width, and Height
  var margin = args.margin,
    width = args.width,
    height = args.height,
    el = args.element,
    data = args.data,
    xValue = args.x,
    yValue = args.y,
    // Parses date for time series.
    parseDate,
    x, y, xAxis, yAxis, area, svg, groups;

  // Axes scale
  // need to determine whether x axis is time scale or linear scale
  x = d3.time.scale()
    .domain(d3.extent(data, function(d) { return parseDate(d[xValue]); }))
    .range([0, width]);

  y = d3.scale.linear()
    .domain(d3.extent(data, function(d) { return d[yValue]; }))
    .range([height, 0]);

  // Axes
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
    .text("");

 groups = svg.selectAll("")
    .data(data)
    .enter()
    .append("g");

  groups.append("path")
    .attr("class", "area")
    .attr("d", function(d) { return area(d[yValue]); });

  return svg;
};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.dendrogram = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.heatmap = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.histogram = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.horizon = function (args) {
  "use strict";

};/**
 *
 * Created by shelbysturgis on 2/13/14.
 */

kd3.lineChart = function (args) {
  "use strict";

};
/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.map = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */
/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.scatterplot = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.spiderChart = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.sunburst = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */
/**
 *
 * Created by shelbysturgis on 2/13/14.
 */

kd3.treemap = function (args) {
  "use strict";

};
