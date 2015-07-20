define(function (require) {
  var d3 = require("d3");
  var path = require("src/modules/element/svg/path");

  return function pieChart() {
    var width = 300;
    var height = 300;
    var color = d3.scale.category10();
    var outerRadius = null;
    var innerRadius = 0;
    var sort = null;
    var value = function (d) { return d.x; };
    var label = function (d) { return d.name; };
    var arc = d3.svg.arc();

    var pieFill = function (d, i) { return color(i); };
    var pieClass = "pie";

    // Text options
    var textFill = "white";
    var textAnchor = "middle";
    var textDY = ".35em";
    var textTransform = function (d) { return "translate(" + arc.centroid(d) + ")"; };

    function chart (selection) {
      selection.each(function (data, index) {
        var pie = d3.layout.pie().sort(sort).value(value);
        var radius = Math.min(width, height) / 2;

        var svg = d3.select(this).append("svg")
          .attr("width", width)
          .attr("height", height);

        var g = svg.append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        arc.outerRadius(outerRadius || radius).innerRadius(innerRadius);

        var piePath = path()
          .pathGenerator(arc)
          .accessor(pie(data))
          .cssClass(pieClass)
          .fill(pieFill);

        g.call(piePath);

        g.selectAll("g")
          .data(pie(data))
          .append("text")
          .attr("transform", textTransform)
          .attr("dy", textDY)
          .style("text-anchor", textAnchor)
          .style("fill", textFill)
          .text(function (d) {
            return label.call(this, d.data);
          });
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

    chart.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return chart;
    };

    chart.outerRadius = function (_) {
      if (!arguments.length) { return outerRadius; }
      outerRadius = _;
      return chart;
    };

    chart.innerRadius = function (_) {
      if (!arguments.length) { return innerRadius; }
      innerRadius = _;
      return chart;
    };

    chart.sort = function (_) {
      if (!arguments.length) { return sort; }
      sort = _;
      return chart;
    };

    chart.value = function (_) {
      if (!arguments.length) { return value; }
      value = _;
      return chart;
    };

    chart.label = function (_) {
      if (!arguments.length) { return label; }
      label = _;
      return chart;
    };

    chart.dispatch = function (_) {
      if (!arguments.length) { return dispatch; }
      dispatch = _;
      return chart;
    };

    chart.pieFill = function (_) {
      if (!arguments.length) { return pieFill; }
      pieFill = _;
      return chart;
    };

    chart.pieClass = function (_) {
      if (!arguments.length) { return pieClass; }
      pieClass = _;
      return chart;
    };

    chart.textFill = function (_) {
      if (!arguments.length) { return textFill; }
      textFill = _;
      return chart;
    };

    chart.textAnchor = function (_) {
      if (!arguments.length) { return textAnchor; }
      textAnchor = _;
      return chart;
    };

    chart.textDY = function (_) {
      if (!arguments.length) { return textDY; }
      textDY = _;
      return chart;
    };

    chart.textTransform = function (_) {
      if (!arguments.length) { return textTransform; }
      textTransform = _;
      return chart;
    };

    return chart;
  };
});