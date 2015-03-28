define(function (require) {
  var d3 = require("d3");

  return function dendrogram() {
    var marginFactor = 0.5;
    var width = 300;
    var height = 800;
    var color = d3.scale.category20b();
    var value = function (d) { return d.size; };
    var projection = function (d) { return [d.y, d.x]; };
    var transform = "translate(20,0)";
    var dispatch = d3.dispatch("hover", "mouseover", "mouseout");

    // Node options
    var nodeRadius = 4.5;
    var nodeTransform = function (d) { return "translate(" + d.y + "," + d.x + ")"; };
    var nodeFill = function (d, i) { return color(i); };
    var nodeStroke = function (d, i) { return color(i); };
    var nodeClass = "node";

    // Link options
    var linkClass = "link";

    // Text options
    var label = function (d) { return d.children ? d.name : d.name + ": " + d.size; };
    var textDX = function (d) { return d.children ? -8 : 8; };
    var textDY = 3;
    var textAnchor = function (d) { return d.children ? "end" : "start"; };

    function chart(selection) {
      selection.each(function (data) {
        var cluster = d3.layout.cluster()
          .size([height, width - (width * marginFactor)])
          .value(value);

        var diagonal = d3.svg.diagonal().projection(projection);
        var nodes = cluster.nodes(data);
        var links = cluster.links(nodes);

        var svg = d3.select(this).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", transform);


        var link = svg.selectAll(".link")
          .data(links)
          .enter().append("path")
          .attr("class", linkClass)
          .attr("d", diagonal);

        var node = svg.selectAll(".node")
          .data(nodes)
          .enter().append("g")
          .attr("class", nodeClass)
          .attr("transform", nodeTransform);

        node.append("circle")
          .attr("r", nodeRadius)
          .style("fill", nodeFill)
          .style("stroke", nodeStroke);

        node.append("text")
          .attr("dx", textDX)
          .attr("dy", textDY)
          .style("text-anchor", textAnchor)
          .text(label);

        d3.select(this.frameElement).style("height", height + "px");
      });
    }

    chart.marginFactor = function (_) {
      if (!arguments.length) { return marginFactor; }
      marginFactor = _;
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

    chart.value = function (_) {
      if (!arguments.length) { return value; }
      value = _;
      return chart;
    };

    chart.projection = function (_) {
      if (!arguments.length) { return projection; }
      projection = _;
      return chart;
    };

    chart.transform = function (_) {
      if (!arguments.length) { return transform; }
      transform = _;
      return chart;
    };

    chart.dispatch = function (_) {
      if (!arguments.length) { return dispatch;}
      dispatch = _;
      return chart;
    };

    chart.nodeRadius = function (_) {
      if (!arguments.length) { return nodeRadius; }
      nodeRadius = _;
      return chart;
    };

    chart.nodeFill = function (_) {
      if (!arguments.length) { return nodeFill; }
      nodeFill = _;
      return chart;
    };

    chart.nodeStroke = function (_) {
      if (!arguments.length) { return nodeStroke; }
      nodeStroke = _;
      return chart;
    };

    chart.nodeClass = function (_) {
      if (!arguments.length) { return nodeClass; }
      nodeClass = _;
      return chart;
    };

    chart.linkClass = function (_) {
      if (!arguments.length) { return linkClass; }
      linkClass = _;
      return chart;
    };

    chart.label = function (_) {
      if (!arguments.length) { return label; }
      label = _;
      return chart;
    };

    chart.textDX = function (_) {
      if (!arguments.length) { return textDX; }
      textDX = _;
      return chart;
    };

    chart.textDY = function (_) {
      if (!arguments.length) { return textDY; }
      textDY = _;
      return chart;
    };

    chart.textAnchor = function (_) {
      if (!arguments.length) { return textAnchor; }
      textAnchor = _;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});
