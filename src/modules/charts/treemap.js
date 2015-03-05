define(function (require) {
  var d3 = require("d3");

  return function treemap() {
    var margin = {top: 40, right: 10, bottom: 10, left: 10};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var color = d3.scale.category20c();
    var sticky = true;
    var value = function (d) { return d.size; };
    var children = function (d) { return d.children; };
    var dispatch = d3.dispatch("hover", "mouseover", "mouseout");

    var nodeClass = "node";
    var nodeColor = function (d, i) { return d.children ? color(i) : null; };
    var label = function (d) { return d.children ? null : d.name; };

    function chart(selection) {
      selection.each(function (data) {
        var treemap = d3.layout.treemap()
          .size([width, height])
          .sticky(sticky)
          .children(children)
          .value(value);

        var div = d3.select(this).append("div")
          .style("position", "relative")
          .style("width", (width + margin.left + margin.right) + "px")
          .style("height", (height + margin.top + margin.bottom) + "px")
          .style("left", margin.left + "px")
          .style("top", margin.top + "px");

        div.datum(data).selectAll(".node")
          .data(treemap.nodes)
          .enter().append("div")
          .attr("class", nodeClass)
          .call(position)
          .style("background", nodeColor)
          .text(label);
      });
    }

    function position() {
      this.style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
        .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
        .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
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

    return chart;
  };
});
