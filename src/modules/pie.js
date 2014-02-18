kbn.pie = function (args) {
  "use strict";

  var width = args.width,
      height = args.height,
      radius = Math.min(width, height)/ 2,
      outerRadius = args.outerRadius,
      innterRadius = args.innerRadius,
      el = args.element,
      data = args.data,
      labels = args.labels,
      values = args.values,
      color = d3.scale.category10(),
      arc, pie, svg, g;

  arc = d3.svg.arc()
    .outerRadius(radius - 60) // add options to change
    .innerRadius(120); // add options to change

  pie = d3.layout.pie()
    .sort(null)
    .value(function (d) { return d[values]; });

  svg = d3.select(el).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/1.4 + "," + height/2 + ")");

  g = svg.selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function (d, i) {
      return color[i];
    });

  g.append("text")
    .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text(function (d) { return d.data[labels]; });

  return svg;
};