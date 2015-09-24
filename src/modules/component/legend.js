define(function (require) {
  var d3 = require("d3");

  return function legend() {
    // Private variables
    var color = d3.scale.category10();
    var symbol = { type: "circle", size: 3 };
    var cell = { width: 50, padding: 5 };
    var values = [];
    var orientation = "horizontal";
    var position = "nw";
    var fill = function (d) { return color(d); };
    var stroke = "#000000";
    var strokeWidth = 1;
    var text = "";

    function component(g) {
      g.each(function () {
        var shape = d3.svg.symbol()
          .type(symbol.type)
          .size(symbol.size);

        g.selectAll("g.legend-cells")
          .data(values)
          .enter().append("g")
          .attr("class", "legend-cells")
          .attr("transform", function (d, i) {
            return "translate(" + (i * (cell.width + cell.padding)) + ",0)";
          });

        g.selectAll("g.legend-cells")
          .append("path")
          .attr("d", shape)
          .style("fill", fill)
          .style("stroke", stroke)
          .style("stroke-width", strokeWidth);

        g.selectAll("g.legend-cells")
          .append("text")
          .attr("class", "legend-labels")
          .attr("y", -7)
          .style("pointer-events", "none")
          .text(text);
      });
    }

    return component;
  };
});