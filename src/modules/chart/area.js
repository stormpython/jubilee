define(function (require) {
  var d3 = require("d3");
  var path = require("src/modules/element/path");
  var axis = require("src/modules/component/axis/axis");

  return function areaChart() {
    // Chart options
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var interpolate = "linear";
    var offset = "zero";
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var xScale = null;
    var yScale = null;
    var dispatch = d3.dispatch("brush", "hover", "mouseover", "mouseout");

    // Axis options
    var showXAxis = true;
    var showYAxis = true;
    var xAxisTitle = "";
    var yAxisTitle = "";

    // Area options
    var areaClass = "area";
    var areaStroke = function (d, i) { return color(i); };
    var areaFill = function (d, i) { return color(i); };

    // Line options
    var addLines = true;
    var lineClass = "line";
    var lineStroke = function (d, i) { return color(i); };

    function chart(selection) {
      selection.each(function (data) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var stack = d3.layout.stack().x(xValue).y(yValue).offset(offset);
        var layers = stack(data);

        var svg = d3.select(this).selectAll("svg")
          .data([layers])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        var area = d3.svg.area().x(X).y0(Y0).y1(Y1).interpolate(interpolate);
        var line = d3.svg.line().x(X).y(Y1).interpolate(interpolate);

        var areaPath = path()
          .pathGenerator(area)
          .cssClass(areaClass)
          .stroke(areaStroke)
          .fill(areaFill);

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

        if (addLines) {
          var linePath = path()
            .pathGenerator(line)
            .cssClass(lineClass)
            .stroke(lineStroke);

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
      if (offset === "overlap") { return d.y; }
      return d.y0 + yValue.call(null, d, i);
    }

    function Y0(d) {
      if (offset ==="overlap") { return yScale(0); }
      return yScale(d.y0);
    }

    function Y1(d, i) {
      if (offset === "overlap") { return yScale(d.y); }
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

    chart.offset = function (_) {
      if (!arguments.length) { return offset; }
      offset = _;
      return chart;
    };

    chart.areaClass = function (_) {
      if (!arguments.length) { return areaClass; }
      areaClass = _;
      return chart;
    };

    chart.areaStroke = function (_) {
      if (!arguments.length) { return areaStroke; }
      areaStroke = _;
      return chart;
    };

    chart.areaFill = function (_) {
      if (!arguments.length) { return areaFill; }
      areaFill = _;
      return chart;
    };

    chart.addLines = function (_) {
      if (!arguments.length) { return addLines; }
      addLines = _;
      return chart;
    };

    chart.lineStroke = function (_) {
      if (!arguments.length) { return lineStroke; }
      lineStroke = _;
      return chart;
    };

    chart.lineClass = function (_) {
      if (!arguments.length) { return lineClass; }
      lineClass = _;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});