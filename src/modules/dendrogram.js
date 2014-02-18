
kd3.dendrogram = function () {
  "use strict";

  var width = ,
      height = ,
      color = d3.scale.category20(),
      cluster = d3.layour.cluster().size([height, width - 200]),
      diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; }),
      nodes, links, link, node;

  function chart(selection) {
    selection.each(function(data) {
      var svg = d3.select(this).append("svg").data(data);

      svg.attr("width", width)
        .attr("height", height);

      var g = svg.append("g")
        .attr("transform", "translate(120,0)");

      var nodes = cluster.nodes(data),
          links = cluster.links(nodes);

      svg.selectAll(".node")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

      var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
          return "translate(" + d.y + ", " + d.x + ")";
        });

      node.append("circle"0)
    });
  }

  svg = d3.select(el).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(120,0)");

  nodes = cluster.nodes(root);
  links = cluster.links(nodes);

  link = svg.selectAll(".link")
    .data(links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal);

  node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  node.append("circle")
    .attr("r", 4.5) // why 4.5?
    .style("fill", function (d, i) {
      return d.children ? "#ffffff" : color(i); // come back to this
    })
    .style("stroke", function (d, i) {
      return d.children ? "#4682B4" : color(i); // come back to this
    });

  node.append("text")
    .attr("dx", function (d) { return d.children ? -8 : 8; })
    .attr("dy", 3)
    .style("text-anchor", function (d) { return d.children ? "end" : "strict"; })
    .text(function (d) { return d.children ? d.key : d.key + ": " + d.doc_count; }); // needs to be generic here

  d3.select(self.frameElement).style("height", height + "px");

  return svg;
};