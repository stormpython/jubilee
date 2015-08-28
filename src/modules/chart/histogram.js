define(function (require) {
  var d3 = require("d3");
  var valuator = require("src/modules/valuator");

  return function histogram() {
    // Private variables
    var margin = { top: 20, right: 20, bottom: 20, left: 50 };
    var width = 900;
    var height = 500;
    var bins = null;
    var range = null;
    var frequency = "frequency";
    var value = function (d) { return d.y; };

    var bars = {
      class: "rect",
      fill: "blue",
      stroke: "white",
      strokeWidth: 1,
      opacity: 1
    };

    var text = {
      class: "text",
      dy: "0.71em",
      textAnchor: "middle",
      fill: "black"
    };

    function chart(selection) {
      selection.each(function (data, index) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var histogram = d3.layout.histogram()
          .bins(bins)
          .value(value)
          .frequency(frequency)
          .range(range || d3.extent(data, value));

        data = histogram(data);

        var xScale = d3.scale.linear()
          .domain(d3.extent(bins))
          .range([0, width]);

        var yScale = d3.scale.linear()
          .domain([0, d3.max(data, yValue)])
          .range([height, 0]);

        var svg = d3.select(this).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
        var yAxis = d3.svg.axis().scale(yScale).orient("left");

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .call(xAxis);

        var group = svg.selectAll("groups")
          .data(data);

        // Exit
        group.exit().remove();

        // Enter
        group.enter().append("g");

        // Update
        group.append("rect")
          .attr("class", bars.class)
          .attr("fill", bars.fill)
          .attr("stroke", bars.stroke)
          .attr("stroke-width", bars.strokeWidth)
          .attr("x", function (d) { return xScale(d.x); })
          .attr("y", function (d) { return yScale(d.y); })
          .attr("width", function (d) { return xScale(d.dx); })
          .attr("height", function (d) { return yScale.range()[0] - yScale(d.y); });

        group.append("text")
          .attr("class", text.class)
          .attr("dy", text.dy)
          .attr("y", function (d) { return yScale(d.y - 0.1); })
          .attr("x", function (d) { return xScale(d.x) + (xScale(d.dx) / 2); })
          .attr("text-anchor", text.textAnchor)
          .attr("fill", text.fill)
          .text(function (d) { return !d.y ? "" : d.y; });
      });
    }

    // Public API
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
      width = typeof _ !== "number" ? width : _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) { return height; }
      height = typeof _ !== "number" ? height : _;
      return chart;
    };

    chart.value = function (_) {
      if (!arguments.length) { return value; }
      value = valuator(_);
      return chart;
    };

    chart.bins = function (_) {
      if (!arguments.length) { return bins; }
      bins = _;
      return chart;
    };

    chart.frequency = function (_) {
      if (!arguments.length) { return frequency; }
      frequency = typeof _ !== "string" ? frequency : _;
      return chart;
    };

    chart.range = function (_) {
      if (!arguments.length) return range;
      range = d3.functor(_);
      return chart;
    };

    chart.bars = function (_) {
      if (!arguments.length) { return bars; }
      bars.class = typeof _.class !== "undefined" ? _.class : bars.class;
      bars.fill = typeof _.fill !== "undefined" ? _.fill : bars.fill;
      bars.stroke = typeof _.stroke !== "undefined" ? _.stroke : bars.stroke;
      bars.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : bars.strokeWidth;
      return chart;
    };

    chart.text = function (_) {
      if (!arguments.length) { return text; }
      text.class = typeof _.class !== "undefined" ? _.class : text.class;
      text.fill = typeof _.fill !== "undefined" ? _.fill : text.fill;
      text.dy = typeof _.dy !== "undefined" ? _.dy : text.dy;
      text.textAnchor = typeof _.textAnchor !== "undefined" ? _.textAnchor : text.textAnchor;
      return chart;
    };

    return chart;
  };
});