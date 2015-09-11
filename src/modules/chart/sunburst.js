define(function (require) {
  var d3 = require("d3");
  var path = require("src/modules/element/svg/path");
  var events = require("src/modules/component/events/events");
  var valuator = require("valuator");
  var addEventListener = require("src/modules/helpers/add_event_listener");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");

  return function sunburst() {
    // Private variables
    var width = 500;
    var height = 500;
    var color = d3.scale.category10();
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

    // Pie options
    var pieClass = "slice";
    var stroke = "#ffffff";
    var fill = function (d, i) {
      if (d.depth === 0) { return "none"; }
      return color(i);
    };

    var listeners = {};

    function chart (selection) {
      selection.each(function (data) {
        var radius = Math.min(width, height) / 2;

        var partition = d3.layout.partition()
          .sort(sort)
          .value(value);

        var svgEvents = events().listeners(listeners);

        var svg = d3.select(this).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
          .call(svgEvents);

        yScale.range([0, radius]);

        var arc = d3.svg.arc()
          .startAngle(startAngle)
          .endAngle(endAngle)
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

        var arcPath = path()
          .pathGenerator(arc)
          .accessor(partition.nodes)
          .class(pieClass)
          .stroke(stroke)
          .fill(fill);

        svg.datum(data).call(arcPath);
      });
    }

    // Public API
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
      color = typeof _ !== "function" ? color : _;
      return chart;
    };

    chart.sort = function (_) {
      if (!arguments.length) { return sort; }
      sort = _;
      return chart;
    };

    chart.value = function (_) {
      if (!arguments.length) { return value; }
      value = valuator(_);
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
      startAngle = d3.functor(_);
      return chart;
    };

    chart.endAngle = function (_) {
      if (!arguments.length) { return endAngle; }
      endAngle = d3.functor(_);
      return chart;
    };

    chart.innerRadius = function (_) {
      if (!arguments.length) { return innerRadius; }
      innerRadius = d3.functor(_);
      return chart;
    };

    chart.outerRadius = function (_) {
      if (!arguments.length) { return outerRadius; }
      outerRadius = d3.functor(_);
      return chart;
   };

    chart.class = function (_) {
      if (!arguments.length) { return pieClass; }
      pieClass = typeof _ !== "string" ? pieClass : _;
      return chart;
    };

    chart.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = _;
      return chart;
    };

    chart.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill= _;
      return chart;
    };

    chart.listeners = function (_) {
      if (!arguments.length) { return listeners; }
      listeners = typeof _ !== "object" ? listeners : _;
      return chart;
    };

    chart.on = addEventListener(chart);

    chart.off = removeEventListener(chart);

    return chart;
  };
});
