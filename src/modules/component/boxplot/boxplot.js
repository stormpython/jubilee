define(function (require) {
  var d3 = require("d3");

  return function boxplot() {
    var gClass = "box";
    var gTransform = null;

    // Box
    var boxWidth = 20;
    var boxHeight = null;
    var boxY = null;
    var boxClass = "range";
    var boxFill = "white";
    var boxStroke = "black";
    var boxStrokeWidth = "2px";

    // Range
    var rangeX1 = 0;
    var rangeX2 = 0;
    var rangeY1 = null;
    var rangeY2 = null;
    var rangeClass = "range";
    var rangeStroke = "black";
    var rangeStrokeWidth = "4px";

    // Max
    var maxY1 = null;
    var maxY2 = null;
    var maxClass = "max";
    var maxStroke = "black";
    var maxStrokeWidth = "4px";

    // Min
    var minY1 = null;
    var minY2 = null;
    var minClass = "max";
    var minStroke = "black";
    var minStrokeWidth = "4px";

    // Median
    var medianY1 = 0;
    var medianY2 = 0;
    var medianClass = "median";
    var medianStroke = "darkgrey";
    var medianStrokeWidth = "4px";

    function component(selection) {
      selection.each(function () {
        var boxX = - (boxWidth / 2);
        var maxX1 = - (boxWidth / 2);
        var maxX2 = boxWidth / 2;
        var minX1 = - (boxWidth / 2);
        var minX2 = boxWidth / 2;
        var medianX1 = - (boxWidth / 2);
        var medianX2 = boxWidth / 2;

        var g = d3.select(this).selectAll("g.box")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", gClass);

        g.attr("transform", gTransform)
          .each(function (d, i) {
            var g = d3.select(this);

            g.append("line")
              .attr("class", rangeClass)
              .attr("x1", rangeX1)
              .attr("x2", rangeX2)
              .attr("y1", rangeY1)
              .attr("y2", rangeY2)
              .style("stroke", rangeStroke)
              .style("stroke-boxWidth", rangeStrokeWidth);

            g.append("line")
              .attr("class", maxClass)
              .attr("x1", maxX1)
              .attr("x2", maxX2)
              .attr("y1", maxY1)
              .attr("y2", maxY2)
              .style("stroke", maxStroke)
              .style("stroke-boxWidth", maxStrokeWidth);

            g.append("line")
              .attr("class", minClass)
              .attr("x1", minX1)
              .attr("x2", minX2)
              .attr("y1", minY1)
              .attr("y2", minY2)
              .style("stroke", minStroke)
              .style("stroke-boxWidth", minStrokeWidth);

            g.append("rect")
              .attr("class", boxClass)
              .attr("x", boxX)
              .attr("y", boxY)
              .attr("width", boxWidth)
              .attr("height", boxHeight)
              .style("fill", boxFill)
              .style("stroke", boxStroke)
              .style("stroke-boxWidth", boxStrokeWidth);

            g.append("line")
              .attr("class", medianClass)
              .attr("x1", medianX1)
              .attr("x2", medianX2)
              .attr("y1", medianY1)
              .attr("y2", medianY2)
              .style("stroke", medianStroke)
              .style("stroke-boxWidth", medianStrokeWidth);
          });
      });
    }

    component.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return component;
    };

    component.gTransform = function (_) {
      if (!arguments.length) { return gTransform; }
      gTransform = _;
      return component;
    };

    component.boxWidth = function (_) {
      if (!arguments.length) { return boxWidth; }
      boxWidth = _;
      return component;
    };

    component.boxHeight = function (_) {
      if (!arguments.length) { return boxHeight; }
      boxHeight = _;
      return component;
    };

    component.boxY = function (_) {
      if (!arguments.length) { return boxY; }
      boxY = _;
      return component;
    };

    component.boxClass = function (_) {
      if (!arguments.length) { return boxClass; }
      boxClass = _;
      return component;
    };

    component.boxFill = function (_) {
      if (!arguments.length) { return boxFill; }
      boxFill = _;
      return component;
    };

    component.boxStroke = function (_) {
      if (!arguments.length) { return boxStroke; }
      boxStroke = _;
      return component;
    };

    component.boxStrokeWidth = function (_) {
      if (!arguments.length) { return boxStrokeWidth; }
      boxStrokeWidth = _;
      return component;
    };

    component.rangeX1 = function (_) {
      if (!arguments.length) { return rangeX1; }
      rangeX1 = _;
      return component;
    };

    component.rangeX2 = function (_) {
      if (!arguments.length) { return rangeX2; }
      rangeX2 = _;
      return component;
    };

    component.rangeY1 = function (_) {
      if (!arguments.length) { return rangeY1; }
      rangeY1 = _;
      return component;
    };

    component.rangeY2 = function (_) {
      if (!arguments.length) { return rangeY2; }
      rangeY2 = _;
      return component;
    };

    component.rangeClass = function (_) {
      if (!arguments.length) { return rangeClass; }
      rangeClass = _;
      return component;
    };

    component.rangeStroke = function (_) {
      if (!arguments.length) { return rangeStroke; }
      rangeStroke = _;
      return component;
    };

    component.rangeStrokeWidth = function (_) {
      if (!arguments.length) { return rangeStrokeWidth; }
      rangeStrokeWidth = _;
      return component;
    };

    component.maxY1 = function (_) {
      if (!arguments.length) { return maxY1; }
      maxY1 = _;
      return component;
    };

    component.maxY2 = function (_) {
      if (!arguments.length) { return maxY2; }
      maxY2 = _;
      return component;
    };

    component.maxClass = function (_) {
      if (!arguments.length) { return maxClass; }
      maxClass = _;
      return component;
    };

    component.maxStroke = function (_) {
      if (!arguments.length) { return maxStroke; }
      maxStroke = _;
      return component;
    };

    component.maxStrokeWidth = function (_) {
      if (!arguments.length) { return maxStrokeWidth; }
      maxStrokeWidth = _;
      return component;
    };

    component.minY1 = function (_) {
      if (!arguments.length) { return minY1; }
      minY1 = _;
      return component;
    };

    component.minY2 = function (_) {
      if (!arguments.length) { return minY2; }
      minY2 = _;
      return component;
    };

    component.minClass = function (_) {
      if (!arguments.length) { return minClass; }
      minClass = _;
      return component;
    };

    component.minStroke = function (_) {
      if (!arguments.length) { return minStroke; }
      minStroke = _;
      return component;
    };

    component.minStrokeWidth = function (_) {
      if (!arguments.length) { return minStrokeWidth; }
      minStrokeWidth = _;
      return component;
    };

    component.medianY1 = function (_) {
      if (!arguments.length) { return medianY1; }
      medianY1 = _;
      return component;
    };

    component.medianY2 = function (_) {
      if (!arguments.length) { return medianY2; }
      medianY2 = _;
      return component;
    };

    component.medianClass = function (_) {
      if (!arguments.length) { return medianClass; }
      medianClass = _;
      return component;
    };

    component.medianStroke = function (_) {
      if (!arguments.length) { return medianStroke; }
      medianStroke = _;
      return component;
    };

    component.medianStrokeWidth = function (_) {
      if (!arguments.length) { return medianStrokeWidth; }
      medianStrokeWidth = _;
      return component;
    };

    return component;
  };
});