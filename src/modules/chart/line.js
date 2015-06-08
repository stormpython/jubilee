define(function (require) {
  var d3 = require("d3");
  var axis = require("src/modules/component/axis/axis");
  var path = require("src/modules/element/svg/path");
  var clipPath = require("src/modules/element/svg/clipPath");
  var circle = require("src/modules/element/svg/circle");

  return function lineChart() {
    // Chart options
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var interpolate = "linear";
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

    // Line Options
    var pathGroupClass = "paths";
    var lineClass = "line";
    var lineStroke = function (d, i) { return color(i); };

    // ClipPath Options
    var clipPathWidth = null;
    var clipPathHeight = null;

    // Circle Options
    var addCircles = true;
    var circleGroupClass = "circle layer";
    var circleClass = "circle";
    var circleFill = function (d, i, j) { return color(j); };
    var circleStroke = null;
    var circleRadius = 5;
    var circleStrokeWidth = 3;

    function chart(selection) {
      selection.each(function (data) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        var line = d3.svg.line().x(X).y(Y).interpolate(interpolate);

        var linePath = path()
          .pathGenerator(line)
          .cssClass(lineClass)
          .stroke(lineStroke);

        xScale = xScale ? xScale : d3.time.scale.utc()
          .domain(d3.extent(mapDomain(data), xValue))
          .range([0, width]);

        yScale = yScale ? yScale : d3.scale.linear()
          .domain([
            Math.min(0, d3.min(mapDomain(data), yValue)),
            Math.max(0, d3.max(mapDomain(data), yValue))
          ])
          .range([height, 0])
          .nice();

        g.append("g")
          .attr("class", pathGroupClass)
          .call(linePath);

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

        if (addCircles) {
          var clippath = clipPath()
            .width(clipPathWidth ? clipPathWidth : width)
            .height(clipPathHeight ? clipPathHeight : height);

          var points = circle()
            .cx(X)
            .cy(Y)
            .color(color)
            .radius(circleRadius)
            .cssClass(circleClass)
            .fill(circleFill)
            .stroke(circleStroke ? circleStroke : circleFill)
            .strokeWidth(circleStrokeWidth);

          g.call(clippath);
          
          g.append("g")
            .attr("clip-path", "url(#" + clippath.id() + ")")
            .selectAll("gCircles")
            .data(function (d) { return d; })
            .enter().append("g")
            .attr("class", circleGroupClass)
            .datum(function (d) { return d; })
            .call(points);
        }
      });
    }

    function mapDomain(data) {
      return data.reduce(function (a, b) {
        return a.concat(b);
      });
    }

    function X(d, i) {
      return xScale(xValue.call(null, d, i));
    }

    function Y(d, i) {
      return yScale(yValue.call(null, d, i));
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

    chart.lineX = function (_) {
      if (!arguments.length) { return lineX; }
      lineX = _;
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

    chart.clipPathWidth = function (_) {
      if (!arguments.length) { return clipPathWidth; }
      clipPathWidth = _;
      return chart;
    };

    chart.clipPathHeight = function (_) {
      if (!arguments.length) { return clipPathHeight; }
      clipPathHeight = _;
      return chart;
    };

    chart.addCircles = function (_) {
      if (!arguments.length) { return addCircles; }
      addCircles = _;
      return chart;
    };

    chart.circleGroupClass = function (_) {
      if (!arguments.length) { return circleGroupClass; }
      circleGroupClass = _;
      return chart;
    };

    chart.circleClass = function (_) {
      if (!arguments.length) { return circleClass; }
      circleClass = _;
      return chart;
    };

    chart.circleRadius = function (_) {
      if (!arguments.length) { return circleRadius; }
      circleRadius = _;
      return chart;
    };

    chart.circleFill = function (_) {
      if (!arguments.length) { return circleFill; }
      circleFill = _;
      return chart;
    };

    chart.circleStroke = function (_) {
      if (!arguments.length) { return circleStroke; }
      circleStroke = _;
      return chart;
    };

    chart.circleStrokeWidth = function (_) {
      if (!arguments.length) { return circleStrokeWidth; }
      circleStrokeWidth = _;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});
