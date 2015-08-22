define(function (require) {
  var d3 = require("d3");
  var constructor = require("src/modules/component/build");
  var clip = require("src/modules/element/svg/clipPath");
  var axis = require("src/modules/component/axis");
  var brushComponent = require("src/modules/component/brush");
  var events = require("src/modules/component/events");
  var addEventListener = require("src/modules/helpers/add_event_listener");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");
  var zeroAxisLine = require("src/modules/element/svg/line");

  //var bars;
  var areas = require("src/modules/component/area");
  var circles = require("src/modules/component/points");
  var lines = require("src/modules/component/line");

  return function series() {
    var margin = {top: 20, right: 50, bottom: 20, left: 50};
    var width = 960;
    var height = 500;
    var color = d3.scale.category10();
    var accessor = function (d) { return d; };
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var zValue = function (d) { return d.z; };
    var xScale = {};
    var yScale = {};
    var zScale = {};
    var xAxis = { show: true };
    var yAxis = { show: true };
    var zAxis = { show: false };
    var brushOpts = {};
    var zeroLine = {
      add: false
    };
    var stacks = {
      offset: "zero",
      order: "default",
      out: stackOut
    };

    var listeners = {};
    var bar = {};
    var line = {};
    var area = {};
    var points = {};

    function chart(selection)  {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var adjustedWidth = width - margin.left - margin.right;
        var adjustedHeight = height - margin.top - margin.bottom;
        var svgEvents = events().listeners(listeners).accessor(xValue);

        /* Stacking Options ******************************** */
        var stackValue = stacks.scale === "z" ? zValue : yValue;
        var stack = d3.layout.stack()
          .x(xValue)
          .y(stackValue)
          .offset(stacks.offset)
          .order(stacks.order)
          .out(stacks.out);

        data = stack(data);
        /* ******************************** */

        /* Scales ******************************** */
        var x = xScale.scale || d3.time.scale.utc();
        var y = yScale.scale || d3.scale.linear();
        var z = zScale.scale || d3.scale.linear();

        x.domain(xScale.domain || d3.extent(d3.merge(data), xValue))
          .clamp(xScale.clamp || false)
          .range([0, adjustedWidth]);

        y.domain(yScale.domain || domain(data, yValue))
          .clamp(yScale.clamp || false)
          .range([adjustedHeight, 0]);

        z.domain(zScale.domain || domain(data, zValue))
          .clamp(zScale.clamp || false)
          .range([adjustedHeight, 0]);

        if (xScale.nice) { x.nice(); }
        if (yScale.nice) { y.nice(); }
        if (zScale.nice) { z.nice(); }
        /* ******************************** */

        /* Canvas ******************************** */
        var svg = d3.select(this).selectAll("svg")
          .data([data])
          .enter().append("svg")
          .attr("width", width)
          .attr("height", height);

        var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
          .call(svgEvents);
        /* ******************************** */

        /* Brush ******************************** */
        if (listeners.brush && listeners.brush.length) {
          var brush = brushComponent()
            .height(adjustedHeight)
            .xScale(x)
            .brushend(listeners.brush);

          g.call(brush);
        }
        /* ******************************** */

        /* Zero-line ******************************** */
        if (zeroLine.add) {
          var zLine = zeroAxisLine()
            .class(zeroLine.class || "zero-line")
            .x1(function () { return x.range()[0]; })
            .x2(function () { return x.range()[1]; })
            .y1(function () { return y(0); })
            .y2(function () { return y(0); })
            .stroke(zeroLine.stroke || "black")
            .strokeWidth(zeroLine.strokeWidth || 1)
            .opacity(zeroLine.opacity || 0.5);

          g.call(zLine);
        }
        /* ******************************** */

        /* Axes ******************************** */
        if (xAxis.show) {
          var axisX = axis()
            .scale(x)
            .class(xAxis.class || "x axis")
            .transform(xAxis.transform || "translate(0," + (y.range()[0]) + ")")
            .tick(xAxis.tick || {
              text: { anchor: "middle", x: 0, y: 9, dx: "", dy: ".71em" }
            })
            .title(xAxis.title || { anchor: "middle"});

          g.call(axisX);
        }

        if (yAxis.show) {
          var axisY = axis()
            .scale(y)
            .orient("left")
            .class(yAxis.class || "y axis")
            .transform(yAxis.transform || "translate(0,0)")
            .tick(yAxis.tick || {
              text: { anchor: "end", x: -9, y: 0, dy: ".32em" }
            })
            .title(yAxis.title || { x: 0, y: -40, anchor: "middle" });

          g.call(axisY);
        }

        if (zAxis.show) {
          var axisZ = axis()
            .scale(z)
            .orient("right")
            .class(zAxis.class || "z axis")
            .transform(zAxis.transform || "translate(" + x.range()[1] + "," + "0)")
            .tick(zAxis.tick || {
              text: { anchor: "start", x: 9, y: 0, dy: ".32em" }
            })
            .title(zAxis.title || {});

          g.call(axisZ);
        }
        /* ******************************** */

        /* ClipPath ******************************** */
        var clippath = clip().width(adjustedWidth).height(adjustedHeight);
        var clippedG = g.call(clippath).append("g")
          .attr("clip-path", "url(#" + clippath.id() + ")");
        /* ******************************** */

        /* SVG Elements ******************************** */
        var elements = [
          {type: "area", func: areas(), opts: area},
          {type: "line", func: lines(), opts: line},
          {type: "points", func: circles(), opts: points}
          //{type: "bar", func: bars(), opts: bar}, // need to take care of stacking
        ];

        elements.forEach(function (d) {

          // Only render elements when api called
          if (d3.keys(d.opts).length) {
            var element = constructor().function(d.func);
            var isArray = Array.isArray(d.opts);

            if (d.type === "area") { d.opts.offset = stacks.offset; }

            if (isArray) {
              d.opts.forEach(function (props) {
                var isZ = props.scale && props.scale.toLowerCase() === "z";
                props.x = xValue;
                props.y = isZ ? zValue : yValue;
                props.xScale = x;
                props.yScale = isZ ? z : y;

                clippedG.call(element.options(props));
              });
            } else {
              var isZ = d.opts.scale && d.opts.scale.toLowerCase() === "z";
              d.opts.x = xValue;
              d.opts.y = isZ ? zValue : yValue;
              d.opts.xScale = x;
              d.opts.yScale = isZ ? z : y;

              clippedG.call(element.options(d.opts));
            }
          }
        });
        /* ******************************** */
      });
    }

    function domain(data, accessor) {
      return [
        Math.min(0, d3.min(d3.merge(data), getAccessor(accessor))),
        Math.max(0, d3.max(d3.merge(data), getAccessor(accessor)))
      ];
    }

    function getAccessor(accessor) {
      return function (d, i) {
        var isStacked = d3.keys(area).length;
        if (isStacked && stacks.offset !== "overlap") {
          return d.y0 + accessor.call(this, d, i);
        }
        return accessor.call(this, d, i);
      };
    }

    function stackOut(d, y0, y) {
      d.y0 = y0;
      d.y = y;
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

    chart.brush = function (_) {
      if (!arguments.length) { return brushOpts; }
      brushOpts = _;
      return chart;
    };

    chart.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
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

    chart.z = function (_) {
      if (!arguments.length) { return zValue; }
      zValue = _;
      return chart;
    };

    chart.stack = function (_) {
      if (!arguments.length) { return stacks; }
      stacks.offset = typeof _.offset !== "undefined" ? _.offset : stacks.offset;
      stacks.order = typeof _.order !== "undefined" ? _.order : stacks.order;
      stacks.out = typeof _.out !== "undefined" ? _.out : stacks.out;
      return chart;
    };

    chart.bar = function (_) {
      if (!arguments.length) { return bar; }
      bar = _;
      return chart;
    };

    chart.line = function (_) {
      if (!arguments.length) { return line; }
      line = _;
      return chart;
    };

    chart.area = function (_) {
      if (!arguments.length) { return area; }
      area = _;
      return chart;
    };

    chart.points = function (_) {
      if (!arguments.length) { return points; }
      points = _;
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

    chart.zScale = function (_) {
      if (!arguments.length) { return zScale; }
      zScale = _;
      return chart;
    };

    chart.xAxis = function (_) {
      if (!arguments.length) { return xAxis; }
      xAxis = _;
      return chart;
    };

    chart.yAxis = function (_) {
      if (!arguments.length) { return yAxis; }
      yAxis = _;
      return chart;
    };

    chart.zAxis = function (_) {
      if (!arguments.length) { return zAxis; }
      zAxis = _;
      return chart;
    };

    chart.zeroLine = function (_) {
      if (!arguments.length) { return zeroLine; }
      zeroLine = _;
      return chart;
    };

    chart.listeners = function (_) {
      if (!arguments.length) { return listeners; }
      listeners = _;
      return chart;
    };

    chart.on = addEventListener(chart);

    chart.off = removeEventListener(chart);

    return chart;
  };
});