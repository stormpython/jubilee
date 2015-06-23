define(function (require) {
  var d3 = require("d3");
  var path = require("src/modules/element/svg/path");
  var axis = require("src/modules/component/axis/axis");

  return function areaChart() {
    // Chart options
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760;
    var height = 120;
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var color = d3.scale.category20c();
    var interpolate = "linear";

    // Stack options
    var stackOptions = {
      offset: "zero",
      order: "default",
      out: function (d, y0, y) {
        d.y0 = y0;
        d.y = y;
      }
    };

    var xScale = null;
    var yScale = null;
    var dispatch = d3.dispatch("brush", "hover", "mouseover", "mouseout");

    // Axis options
    var showXAxis = true;
    var showYAxis = true;
    var xAxisTitle = "";
    var yAxisTitle = "";

    // Area options
    var areas = {
      areaClass: "area",
      stroke: function (d, i) { return color(i); },
      fill: function (d, i) { return color(i); },
      opacity: 1
    };

    // Line options
    var lines = {
      show: true,
      lineClass: "line",
      stroke: function (d, i) { return color(i); },
      strokeWidth: 3,
      opacity: 1
    };

    function chart(selection) {
      selection.each(function (data) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var stack = d3.layout.stack()
          .x(xValue)
          .y(yValue)
          .offset(stackOptions.offset)
          .order(stackOptions.order)
          .out(stackOptions.out);

        var layers = stack(data);

        var svg = d3.select(this).selectAll("svg")
          .data([layers])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        var area = d3.svg.area()
          .x(X)
          .y0(Y0)
          .y1(Y1)
          .interpolate(interpolate);

        var line = d3.svg.line()
          .x(X)
          .y(Y1)
          .interpolate(interpolate);

        var areaPath = path()
          .pathGenerator(area)
          .cssClass(areas.areaClass)
          .stroke(areas.stroke)
          .fill(areas.fill)
          .opacity(areas.opacity);

        xScale = xScale ? xScale : d3.time.scale.utc()
          .domain(d3.extent(mapDomain(data), xValue))
          .range([0, width]);

        yScale = yScale ? yScale : d3.scale.linear()
          .domain([
            Math.min(0, d3.min(mapDomain(data), Y)),
            Math.max(0, d3.max(mapDomain(data), Y))
          ])
          .range([height, 0])
          .nice();

        g.append("g").call(areaPath);

        if (lines.show) {
          var linePath = path()
            .pathGenerator(line)
            .cssClass(lines.lineClass)
            .stroke(lines.stroke)
            .strokeWidth(lines.strokeWidth)
            .opacity(lines.opacity);

          g.append("g").call(linePath);
        }

        if (showXAxis) {
          var xAxis = axis()
            .scale(xScale)
            .gClass("x axis")
            .transform("translate(0," + yScale.range()[0] + ")")
            .titleY(6)
            .titleDY(".71em")
            .titleAnchor("end")
            .title(xAxisTitle);

          g.call(xAxis);
        }

        if (showYAxis) {
          var yAxis = axis()
            .scale(yScale)
            .orient("left")
            .gClass("y axis")
            .titleY(6)
            .titleDY(".71em")
            .titleAnchor("end")
            .title(yAxisTitle);

          g.call(yAxis);
        }
      });
    }

    function X(d, i) {
      return xScale(xValue.call(null, d, i));
    }

    function Y(d, i) {
      if (stackOptions.offset === "overlap") { return d.y; }
      return d.y0 + yValue.call(null, d, i);
    }

    function Y0(d) {
      if (stackOptions.offset === "overlap") { return yScale(0); }
      return yScale(d.y0);
    }

    function Y1(d, i) {
      if (stackOptions.offset === "overlap") { return yScale(d.y); }
      return yScale(d.y0 + yValue.call(null, d, i));
    }

    function mapDomain (data) {
      return data.reduce(function (a, b) {
        return a.concat(b);
      });
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

    chart.x = function (_) {
      if (!arguments.length) { return xValue; }
      xValue = _;
      return chart;
    };

    chart.y = function (_) {
      if (!arguments.length) { return yValue; }
      yValue = _;
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

    chart.dispatch = function (_) {
      if (!arguments.length) { return dispatch; }
      dispatch = _;
      return chart;
    };

    chart.showXAxis = function (_) {
      if (!arguments.length) { return showXAxis; }
      showXAxis = _;
      return chart;
    };

    chart.showYAxis = function (_) {
      if (!arguments.length) { return showYAxis; }
      showYAxis = _;
      return chart;
    };

    chart.xAxisTitle = function (_) {
      if (!arguments.length) { return xAxisTitle; }
      xAxisTitle = _;
      return chart;
    };

    chart.yAxisTitle = function (_) {
      if (!arguments.length) { return yAxisTitle; }
      yAxisTitle = _;
      return chart;
    };

    chart.interpolate = function (_) {
      if (!arguments.length) { return interpolate; }
      interpolate = _;
      return chart;
    };

    chart.stack = function (_) {
      if (!arguments.length) { return stackOptions; }
      stackOptions.offset = typeof _.offset !== "undefined" ? _.offset : stackOptions.offset;
      stackOptions.order = typeof _.order !== "undefined" ? _.order : stackOptions.order;
      stackOptions.out = typeof _.out !== "undefined" ? _.out : stackOptions.out;
      return chart;
    };

    chart.area = function (_) {
      if (!arguments.length) { return areas; }
      areas.areaClass = typeof _.areaClass !== "undefined" ? _.areaClass : areas.areaClass;
      areas.stroke = typeof _.stroke !== "undefined" ? _.stroke : areas.stroke;
      areas.fill = typeof _.fill !== "undefined" ? _.fill : areas.fill;
      areas.opacity = typeof _.opacity !== "undefined" ? _.opacity : areas.opacity;
      return chart;
    };

    chart.line = function (_) {
      if (!arguments.length) { return lines; }
      lines.show = typeof _.show !== "undefined" ? _.show : lines.show;
      lines.lineClass = typeof _.lineClass !== "undefined" ? _.lineClass : lines.lineClass;
      lines.stroke = typeof _.stroke !== "undefined" ? _.stroke : lines.stroke;
      lines.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : lines.strokeWidth;
      lines.opacity = typeof _.opacity !== "undefined" ? _.opacity : lines.opacity;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});