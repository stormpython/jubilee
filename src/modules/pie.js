
kbn.pie = function () {
  "use strict";

  var width = 500,
      height = 500,
      radius = Math.min(width, height)/ 2,
      outerRadius = ,
      innterRadius = ,
      color = d3.scale.category10(),
      arc = d3.svg.arc().outerRadius(radius - 60).innerRadius(120),
      pie = d3.layout.pie().sort(null).value(function (d) { return d[0]; });

  function chart(selection) {
    selection.each(function(data) {
      var svg = d3.select(this)


    });
  }

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