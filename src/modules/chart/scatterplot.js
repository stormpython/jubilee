define(function (require) {
  var d3 = require("d3");
  var circles = require("src/modules/component/shape/circles");

  return function scatterPlot() {
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760 - margin.left - margin.right;
    var height = 620 - margin.top - margin.bottom;
    var color = d3.scale.category20c();
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var zValue = function (d) { return d.z; };
    var xScale = d3.scale.linear().range([0, width]);
    var yScale = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().orient("bottom");
    var yAxis = d3.svg.axis().orient("left");
    var xDomain = function (domainData) {
      return d3.extent(domainData, xValue);
    };
    var yDomain = function (domainData) {
      return d3.extent(domainData, yValue);
    };
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
      selection.each(function (data) {

        var svg = d3.select(this).append("svg")
          .data([data])
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        xScale.domain(xDomain.call(this, mapDomain(data)));
        yScale.domain(yDomain.call(this, mapDomain(data)));

        if (showXAxis) {
          g.append("g")
            .attr("class", xAxisClass)
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.scale(xScale))
            .append("text")
              .attr("class", xAxisTextClass)
              .attr("x", xAxisTextX)
              .attr("y", xAxisTextY)
              .attr("dy", xAxisTextDY)
              .style("text-anchor", xAxisTextAnchor)
              .text(xAxisText);
        }

        if (showYAxis) {
          g.append("g")
            .attr("class", yAxisClass)
            .call(yAxis.scale(yScale))
            .append("text")
              .attr("class", yAxisTextClass)
              .attr("transform", yAxisTextTransform)
              .attr("y", yAxisTextY)
              .attr("x", yAxisTextX)
              .attr("dy", yAxisTextDY)
              .style("text-anchor", yAxisTextAnchor)
              .text(yAxisText);
        }

        var points = circles()
          .xScale(xScale)
          .yScale(yScale)
          .cx(xValue)
          .cy(yValue)
          .color(color)
          .radius(circleRadius)
          .circleClass(circleClass)
          .fill(circleFill)
          .stroke(circleStroke)
          .strokeWidth(circleStrokeWidth);

        g.call(points);
      });
    }

    function mapDomain (data) {
      return data.reduce(function (a, b) {
        return a.concat(b);
      });
    }

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});
