define(function (require) {
  var d3 = require("d3");
  var svgRect = require("src/modules/element/svg/rect");
  var canvasRect = require("src/modules/element/canvas/rect");
  var axis = require("src/modules/component/axis");

  return function heatmap() {
    // Private variables
    var margin = { top: 20, right: 20, bottom: 20, left: 50 };
    var width = 960;
    var height = 500;
    var color = d3.scale.category10();
    var isCanvas = false;

    var rect = {
      cssClass: "rect",
      x: function (d) { return d.x; },
      y: function (d) { return d.y; },
      fill: function (d) { return d.fill; },
      opacity: function (d) { return 1; },
      strokeWidth: 0,
      padding: 0.1
    };

    var axisX = { 
      show: true,
      axisClass: "x axis", 
      titleClass: "x-label",
      x: function () { return width / 2; },
      y: 30,
      dy: ".35em",
      textAnchor: "start",
      title: "",
      filterTicksBy: 1,
      tickRotate: 270
    };

    var axisY = {
      show: true,
      axisClass: "y axis", 
      titleClass: "y-label",
      x: function () { return -height / 2; },
      y: -60,
      dy: ".35em",
      textAnchor: "start",
      title: "",
      filterTicksBy: 1
    };

    function chart(selection) {
      selection.each(function (data, index) {
        var canvas;

        var xScale = d3.scale.ordinal()
          .domain(getDomain(data, "x"))
          .rangeBands([0, width], rect.padding);

        var yScale = d3.scale.ordinal()
          .domain(getDomain(data, "y"))
          .rangeBands([height, 0], rect.padding);

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        data.forEach(function (d, i) {
          d.x = rect.x.call(data, d, i);
          d.y = rect.y.call(data, d, i);
          d.fill = rect.fill.call(data, d, i);
          d.opacity = rect.opacity.call(data, d, i);
        });

        var padding = Object.keys(margin).map(function (key) {
          return margin[key];
        }).join("px ") + "px";

        if (isCanvas) {
          var canvasRects = canvasRect()
            .cssClass(rect.cssClass)
            .x(function (d) { return xScale(d.x); })
            .y(function (d) { return yScale(d.y); })
            .width(xScale.rangeBand())
            .height(yScale.rangeBand())
            .fillStyle(function (d) { return color(d.fill); })
            .opacity(function (d) { return d.opacity; })
            .strokeStyle(function (d) { return color(d.fill); })
            .lineWidth(rect.strokeWidth);

          canvas = d3.select(this).append("canvas")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("padding", padding);

          canvas.datum(data).call(canvasRects);
        }

        var svg = d3.select(this).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style("padding", padding)
          .on("mousemove", function (d, i) {
            var x = d3.event.clientX;
            var y = d3.event.clientY;
          });

        var g = svg.append("g")
          .attr("transform", "translate(0,0)");
          //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        if (!isCanvas) {
          var svgRects = svgRect()
            .cssClass(rect.cssClass)
            .x(function (d) { return xScale(d.x); })
            .y(function (d) { return yScale(d.y); })
            .width(xScale.rangeBand())
            .height(yScale.rangeBand())
            .fill(function (d) { return color(d.fill); })
            .stroke(function (d) { return color(d.fill); })
            .strokeWidth(rect.strokeWidth)
            .opacity(function (d) { return d.opacity; });

          g.datum(data).call(svgRects);
        }

        if (axisX.show) {
          var xAxis = axis()
            .scale(xScale)
            .transform("translate(0," + height + ")")
            .gClass(axisX.axisClass)
            .tick({
              values: xScale.domain()
                .filter(function (d, i) {
                  return !(i % axisX.filterTicksBy);
                })
            })
            .title({
              x: axisX.x,
              y: axisY.y,
              dy: axisX.dy,
              anchor: axisX.textAnchor,
              text: axisX.title
            });

          g.call(xAxis);

          // Modifying the x axis tick labels
          g.selectAll(".x.axis .tick text")
            .attr("x", -10)
            .attr("y", -4)
            .attr("transform", "rotate(" + axisX.tickRotate + ")")
            .style("text-anchor", "end");
        }

        if (axisY.show) {
          var yAxis = axis()
            .scale(yScale)
            .gClass(axisY.axisClass)
            .orient("left")
            .tick({
              values: yScale.domain()
                .filter(function (d, i) {
                  return !(i % axisY.filterTicksBy);
                })
            })
            .title({
              titleClass: axisY.titleClass,
              x: axisY.x,
              y: axisY.y,
              dy: axisY.dy,
              anchor: axisY.textAnchor,
              text: axisY.title
            });

          g.call(yAxis);
        }
      });
    }

    function getDomain(data, accessor) {
      return data
        .map(function (item) {
          return item[accessor];
        })
        .sort(function (prev, cur) {
          if (prev > cur) return 1;
          if (prev < cur) return -1;
          return 0;
        })
        .filter(function (item, index, array) {
          return array.indexOf(item) === index;
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
      if (!arguments.length) return width;
      width = _;
      return chart;
    };

    chart.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return chart;
    };

    chart.color = function (_) {
      if (!arguments.length) return color;
      color = _;
      return chart;
    };

    chart.canvas = function (_) {
      if (!arguments.length) return isCanvas;
      isCanvas = _;
      return chart;
    };

    chart.rect = function (_) {
      if (!arguments.length) { return rect; }
      rect.x = typeof _.x !== "undefined" ? _.x : rect.x;
      rect.y = typeof _.y !== "undefined" ? _.y : rect.y;
      rect.color = typeof _.color !== "undefined" ? _.color : rect.color;
      rect.cssClass = typeof _.cssClass !== "undefined" ? _.cssClass : rect.cssClass;
      rect.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : rect.strokeWidth;
      rect.fill = typeof _.fill !== "undefined" ? _.fill : rect.fill;
      rect.opacity = typeof _.opacity !== "undefined" ? _.opacity : rect.opacity;
      rect.padding = typeof _.padding !== "undefined" ? _.padding : rect.padding;
      return chart;
    };

    chart.xAxis = function (_) {
      if (!arguments.length) { return axisX; }
      axisX.show = typeof _.show !== "undefined" ? _.show : axisX.show;
      axisX.axisClass = typeof _.axisClass !== "undefined" ? _.axisClass : axisX.axisClass;
      axisX.titleClass = typeof _.titleClass !== "undefined" ? _.titleClass : axisX.titleClass;
      axisX.x = typeof _.x !== "undefined" ? _.x : axisX.x;
      axisX.y = typeof _.y !== "undefined" ? _.y : axisX.y;
      axisX.dy = typeof _.dy !== "undefined" ? _.dy : axisX.dy;
      axisX.tickValues = typeof _.tickValues !== "undefined" ? _.tickValues: axisX.tickValues;
      axisX.textAnchor = typeof _.textAnchor !== "undefined" ? _.textAnchor : axisX.textAnchor;
      axisX.title = typeof _.title !== "undefined" ? _.title : axisX.title;
      axisX.filterTicksBy = typeof _.filterTicksBy !== "undefined" ? _.filterTicksBy : axisX.filterTicksBy;
      axisX.tickRotate = typeof _.tickRotate !== "undefined" ? _.tickRotate : axisX.tickRotate;
      return chart;
    };

    chart.yAxis = function (_) {
      if (!arguments.length) { return axisY; }
      axisY.show = typeof _.show !== "undefined" ? _.show : axisY.show;
      axisY.axisClass = typeof _.axisClass !== "undefined" ? _.axisClass : axisY.axisClass;
      axisY.titleClass = typeof _.titleClass !== "undefined" ? _.titleClass : axisY.titleClass;
      axisY.x = typeof _.x !== "undefined" ? _.x : axisY.x;
      axisY.y = typeof _.y !== "undefined" ? _.y : axisY.y;
      axisY.dy = typeof _.dy !== "undefined" ? _.dy : axisY.dy;
      axisY.tickValues = typeof _.tickValues !== "undefined" ? _.tickValues: axisY.tickValues;
      axisY.textAnchor = typeof _.textAnchor !== "undefined" ? _.textAnchor : axisY.textAnchor;
      axisY.title = typeof _.title !== "undefined" ? _.title : axisY.title;
      axisY.filterTicksBy = typeof _.filterTicksBy !== "undefined" ? _.filterTicksBy : axisY.filterTicksBy;
      return chart;
    };

    return chart;
  }
});
