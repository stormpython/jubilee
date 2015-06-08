define(function (require) {
  var d3 = require("d3");
  var path = require("src/modules/element/svg/path");

  return function sunburst() {
    // Chart options
    var width = 500;
    var height = 500;
    var color = d3.scale.category20c();
    var sort = null;
    var value = function (d) { return d.size; };
    var xScale = d3.scale.linear().range([0, 2 * Math.PI]);
    var yScale = d3.scale.sqrt();
    var startAngle = function (d) {
      return Math.max(0, Math.min(2 * Math.PI, xScale(d.x)));
    };
    var endAngle = function (d) {
      return Math.max(0, Math.min(2 * Math.PI, xScale(d.x + d.dx)));
    };
    var innerRadius = function (d) {
      return Math.max(0, yScale(d.y));
    };
    var outerRadius = function (d) {
      return Math.max(0, yScale(d.y + d.dy));
    };
    var dispatch = d3.dispatch("brush", "hover", "mouseover", "mouseout");

    // Pie options
    var pieClass = "pie";
    var pieStroke = "#fff";
    var pieFill = function (d, i) {
      if (d.depth === 0) { return "none"; }
      return color(i);
    };

    function chart (selection) {
      selection.each(function (data) {
        var radius = Math.min(width, height) / 2;
        var partition = d3.layout.partition().sort(sort).value(value);
        var svg = d3.select(this).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        yScale.range([0, radius]);

        var arc = d3.svg.arc()
          .startAngle(startAngle)
          .endAngle(endAngle)
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

        var arcPath = path()
          .pathGenerator(arc)
          .accessor(partition.nodes)
          .cssClass(pieClass)
          .stroke(pieStroke)
          .fill(pieFill);

        svg.datum(data).call(arcPath);
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

    chart.xScale = function (_) {
      if (!arguments.length) { return xScale; }
      xScale = _;
      return chart;
    };

    chart.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale = _;
      return chart;
    };

    chart.startAngle = function (_) {
      if (!arguments.length) { return startAngle; }
      startAngle = _;
      return chart;
    };

    chart.endAngle = function (_) {
      if (!arguments.length) { return endAngle; }
      endAngle = _;
      return chart;
    };

    chart.innerRadius = function (_) {
      if (!arguments.length) { return innerRadius; }
      innerRadius = _;
      return chart;
    };

    chart.outerRadius = function (_) {
      if (!arguments.length) { return outerRadius; }
      outerRadius = _;
      return chart;
    };

    chart.dispatch = function (_) {
      if (!arguments.length) { return dispatch; }
      dispatch = _;
      return chart;
    };

    chart.pieClass = function (_) {
      if (!arguments.length) { return pieClass; }
      pieClass = _;
      return chart;
    };

    chart.pieStroke = function (_) {
      if (!arguments.length) { return pieStroke; }
      pieStroke = _;
      return chart;
    };

    chart.pieFill = function (_) {
      if (!arguments.length) { return pieFill; }
      pieFill= _;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});
