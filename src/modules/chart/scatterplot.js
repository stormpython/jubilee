define(function (require) {
  var d3 = require("d3");
  var axis = require("src/modules/component/axis");
  var circle = require("src/modules/element/svg/circle");
  var clipPath = require("src/modules/element/svg/clipPath");

  return function scatterPlot() {
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760;
    var height = 500;
    var color = d3.scale.category20c();
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var zValue = function (d) { return d.z; };
    var xScale = null;
    var yScale = null;
    var dispatch = d3.dispatch("brush", "hover", "mouseover", "mouseout");

    var showXAxis = true;
    var xAxisClass = "x axis";
    var xAxisTextClass = "x label";
    var xAxisTextX = function () { return width / 2; };
    var xAxisTextY = 30;
    var xAxisTextDY = ".71em";
    var xAxisTextAnchor = "middle";
    var xAxisText = "";

    var showYAxis = true;
    var yAxisClass = "y axis";
    var yAxisTextClass = "y label";
    var yAxisTextTransform = "rotate(-90)";
    var yAxisTextX = -height / 2;
    var yAxisTextY = -60;
    var yAxisTextDY = ".71em";
    var yAxisTextAnchor = "middle";
    var yAxisText = "";

    var circleRadius = zValue;
    var circleClass = "circle";
    var circleFill = function (d, i) { return color(i); };
    var circleStroke = function (d, i) { return color(i); };
    var circleStrokeWidth = 3;

    function chart(selection) {
      selection.each(function (data, i) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var svg = d3.select(this).append("svg")
          .data([data])
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        xScale = xScale ? xScale : d3.scale.linear()
          .domain(d3.extent(data, xValue))
          .range([0, width]);

        yScale = yScale ? yScale : d3.scale.linear()
          .domain(d3.extent(data, yValue))
          .range([height, 0]);

        var points = circle()
          .cx(X)
          .cy(Y)
          .color(color)
          .radius(circleRadius)
          .cssClass(circleClass)
          .fill(circleFill)
          .stroke(circleStroke)
          .strokeWidth(circleStrokeWidth);

        g.call(points);

        if (showXAxis) {
          var xAxis = axis()
            .scale(xScale)
            .gClass(xAxisClass)
            .transform("translate(0," + yScale.range()[0] + ")")
            .titleX(xAxisTextX)
            .titleY(xAxisTextY)
            .titleDY(xAxisTextDY)
            .titleAnchor(xAxisTextAnchor)
            .title(xAxisText);

          g.call(xAxis);
        }

        if (showYAxis) {
          var yAxis = axis()
            .scale(yScale)
            .orient("left")
            .gClass(yAxisClass)
            .titleX(yAxisTextX)
            .titleY(yAxisTextY)
            .titleDY(yAxisTextDY)
            .titleAnchor(yAxisTextAnchor)
            .title(yAxisText);

          g.call(yAxis);
        }
      });
    }

    function X(d, i) {
      return xScale(xValue.call(null, d, i));
    }

    function Y(d, i) {
      return yScale(yValue.call(null, d, i));
    }

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});
