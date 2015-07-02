define(function (require) {
  var d3 = require("d3");
  var axis = require("src/modules/component/axis");
  var graphFunc = require("src/modules/component/chart");

  return function xzyPlot() {
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760;
    var height = 120;
    var elements = null;

    // Axis options
    var xAxis = {
      cssClass: "x axis",
      show: true,
      scale: null,
      title: "",
      y: 6,
      dy: ".71em",
      titleAnchor: "end"
    };

    var yAxis = {
      cssClass: "y axis",
      show: true,
      scale: null,
      title: "",
      y: 6,
      dy: ".71em",
      titleAnchor: "end"
    };

    var zAxis = {
      cssClass: "z axis",
      show: true,
      scale: null,
      title: "",
      y: 6,
      dy: ".71em",
      titleAnchor: "end"
    };

    function chart(selection) {
      selection.each(function (data) {
        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        elements = !(elements instanceof Array) ? [elements] : elements;

        elements.forEach(function (element) {
          if (typeof element === "function") {
            g.append("g").call(element);
          }
        });

        if (xAxis.show) {
          var axisX = axis()
            .scale(xAxis.scale)
            .gClass(xAxis.cssClass)
            .transform("translate(0," + yAxis.scale.range()[0] + ")")
            .titleY(xAxis.y)
            .titleDY(xAxis.dy)
            .titleAnchor(xAxis.titleAnchor)
            .title(xAxis.title);

          g.call(axisX);
        }

        if (yAxis.show) {
          var axisY = axis()
            .scale(yAxis.scale)
            .orient("left")
            .gClass(yAxis.cssClass)
            .titleY(yAxis.y)
            .titleDY(yAxis.dy)
            .titleAnchor(yAxis.titleAnchor)
            .title(yAxis.title);

          g.call(axisY);
        }

        if (zAxis.show) {
          var axisZ = axis()
            .scale(zAxis.scale)
            .orient("right")
            .gClass(zAxis.cssClass)
            .transform("translate(" + xAxis.scale.range()[1] + "," + "0)")
            .titleY(zAxis.y)
            .titleDY(zAxis.dy)
            .titleAnchor(zAxis.titleAnchor)
            .title(zAxis.title);

          g.call(axisZ);
        }
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

    chart.xAxis = function (_) {
      if (!arguments.length) { return xAxis; }
      xAxis.cssClass = typeof _.cssClass !== "undefined" ? _.cssClass : xAxis.cssClass;
      xAxis.scale = typeof _.scale !== "undefined" ? _.scale : xAxis.scale;
      xAxis.y = typeof _.y !== "undefined" ? _.y : xAxis.y;
      xAxis.dy = typeof _.dy !== "undefined" ? _.dy : xAxis.dy;
      xAxis.titleAnchor = typeof _.titleAnchor !== "undefined" ? _.titleAnchor : xAxis.titleAnchor;
      xAxis.title = typeof _.title !== "undefined" ? _.title : xAxis.title;
      return chart;
    };

    chart.yAxis = function (_) {
      if (!arguments.length) { return yAxis; }
      yAxis.cssClass = typeof _.cssClass !== "undefined" ? _.cssClass : yAxis.cssClass;
      yAxis.scale = typeof _.scale !== "undefined" ? _.scale : yAxis.scale;
      yAxis.y = typeof _.y !== "undefined" ? _.y : yAxis.y;
      yAxis.dy = typeof _.dy !== "undefined" ? _.dy : yAxis.dy;
      yAxis.titleAnchor = typeof _.titleAnchor !== "undefined" ? _.titleAnchor : yAxis.titleAnchor;
      yAxis.title = typeof _.title !== "undefined" ? _.title : yAxis.title;
      return chart;
    };

    chart.zAxis = function (_) {
      if (!arguments.length) { return zAxis; }
      zAxis.cssClass = typeof _.cssClass !== "undefined" ? _.cssClass : zAxis.cssClass;
      zAxis.scale = typeof _.scale !== "undefined" ? _.scale : zAxis.scale;
      zAxis.y = typeof _.y !== "undefined" ? _.y : zAxis.y;
      zAxis.dy = typeof _.dy !== "undefined" ? _.dy : zAxis.dy;
      zAxis.titleAnchor = typeof _.titleAnchor !== "undefined" ? _.titleAnchor : zAxis.titleAnchor;
      zAxis.title = typeof _.title !== "undefined" ? _.title : zAxis.title;
      return chart;
    };

    chart.elements = function (_) {
      if (!arguments.length) { return elements; }
      elements = _;
      return chart;
    };

    return chart;
  };
});