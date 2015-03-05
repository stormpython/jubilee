define(function (require) {
  var d3 = require("d3");

  return function pieChart() {
    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;
    var color = d3.scale.category10();
    var outerRadius = radius - 60;
    var innerRadius = 0;
    var sort = null;
    var value = function (d) { return d.x; };
    var arc = d3.svg.arc();

    var pieFill = function (d, i) { return color(i); };
    var pieClass = "pie";

    // Text options
    var text = function (d) { return d.data.key; };
    var textFill = "white";
    var textAnchor = "middle";
    var textDY = ".35em";
    var textTransform = function (d) { return "translate(" + arc.centroid(d) + ")"; };

    function chart (selection) {
      selection.each(function (data) {
        var pie = d3.layout.pie().sort(sort).value(value);

        var svg = d3.select(this).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width + "," + height + ")");

        var g = svg.selectAll(".arc")
          .data(pie(data))
          .enter()
          .append("g")
          .attr("class", "arc");

        arc.outerRadius(outerRadius).innerRadius(innerRadius);

        g.append("path")
          .attr("d", arc)
          .attr("class", pieClass)
          .style("fill", pieFill);

        g.append("text")
          .attr("transform", textTransform)
          .attr("dy", textDY)
          .style("text-anchor", textAnchor)
          .style("fill", textFill)
          .text(text);
      });
    }

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

    chart.radius = function (_) {
      if (!arguments.length) { return radius; }
      radius = _;
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