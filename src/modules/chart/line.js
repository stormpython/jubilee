define(function (require) {
  var d3 = require("d3");
  var axis = require("src/modules/component/axis/axis");
  var path = require("src/modules/element/svg/path");
  var clip = require("src/modules/element/svg/clipPath");
  var circle = require("src/modules/element/svg/circle");

  return function lineChart() {
    // Chart options
    var margin = {top: 20, right: 20, bottom: 20, left: 50};
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var dispatch = d3.dispatch("brush");

    // scale options
    var xScale = null;
    var xDomain = null;
    var yScale = null;
    var yDomain = null;

    // x axis options
    var axisX = {
      show: true,
      gClass: "x axis",
      tick: {
        number: 10, values: null, size: 6, padding: 3, format: null, rotate: 0,
        innerTickSize: 6, outerTickSize: 6,
        text: { anchor: "middle", x: 0, y: 9, dx: "", dy: ".71em" }
      },
      title: {
        titleClass: "axis title", x: 6, y: 6, dx: "", dy: ".71em",
        anchor: "middle", text: ""
      }
    };

    // y axis options
    var axisY = {
      show: true,
      gClass: "y axis",
      tick: {
        number: 10, values: null, size: 6, padding: 3, format: null, rotate: 0,
        innerTickSize: 6, outerTickSize: 6,
        text: { anchor: "end", x: -9, y: 0, dx: "", dy: ".32em" }
      },
      title: {
        titleClass: "axis title", x: 0, y: -40, dx: "", dy: ".71em",
        anchor: "middle", rotate: 270, text: ""
      }
    };

    // Line Options
    var lines = {
      groupClass: "paths",
      lineClass: "line",
      stroke: function (d, i) { return color(i); },
      strokeWidth: 3,
      opacity: 1,
      interpolate: "linear",
      tension:  0.7,
      defined: function () { return true; },
      events: {
        mouseover: function () {},
        mouseout: function () {},
        click: function () {}
      }
    };

    // ClipPath Options
    var clipPath = { width: null, height: null };

    // Circle Options
    var circles = {
      show: true,
      groupClass: "circle layer",
      circleClass: "circle",
      fill: function (d, i, j) { return color(j); },
      stroke: null,
      radius: 5,
      strokeWidth: 3,
      events: {
        mouseover: function () {},
        mouseout: function () {},
        click: function () {}
      }
    };

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

        var line = d3.svg.line()
          .x(X)
          .y(Y)
          .interpolate(lines.interpolate)
          .tension(lines.tension)
          .defined(lines.defined);

        var linePath = path()
          .pathGenerator(line)
          .cssClass(lines.lineClass)
          .stroke(lines.stroke)
          .strokeWidth(lines.strokeWidth)
          .opacity(lines.opacity)
          .events({
            mouseover: lines.events.mouseover,
            mouseout: lines.events.mouseout,
            click: lines.events.click
          });

        xScale = xScale ? xScale : d3.time.scale.utc()
          .domain(xDomain || d3.extent(mapDomain(data), xValue));

        if (typeof xScale.rangeBands === "function") {
          xScale.rangeBands([0, width, 0.1]);
        } else {
          xScale.range([0, width]);
        }

        yScale = yScale ? yScale : d3.scale.linear()
          .domain(yDomain || d3.extent(mapDomain(data), yValue))
          .range([height, 0]);

        g.append("g")
          .attr("class", lines.groupClass)
          .call(linePath);

        if (axisX.show) {
          var xAxis = axis()
            .scale(xScale)
            .gClass(axisX.gClass)
            .transform("translate(0," + yScale.range()[0] + ")")
            .tick({
              number: axisX.tick.number,
              values: axisX.tick.values,
              size: axisX.tick.size,
              padding: axisX.tick.padding,
              format: axisX.tick.format,
              rotate: axisX.tick.rotate,
              innerTickSize: axisX.tick.innerTickSize,
              outerTickSize: axisX.tick.outerTickSize,
              text: {
                x: axisX.tick.text.x,
                y: axisX.tick.text.y,
                dx: axisX.tick.text.dx,
                dy: axisX.tick.text.dy,
                anchor: axisX.tick.text.anchor
              }
            })
            .title({
              titleClass: axisX.title.titleClass,
              x: width / 2,
              y: axisX.title.y,
              dx: axisX.title.dx,
              dy: axisX.title.dy,
              anchor: axisX.title.anchor,
              text: axisX.title.text
            });

          g.call(xAxis);
        }

        if (axisY.show) {
          var yAxis = axis()
            .scale(yScale)
            .orient("left")
            .gClass(axisY.gClass)
            .tick({
              number: axisY.tick.number,
              values: axisY.tick.values,
              size: axisY.tick.size,
              padding: axisY.tick.padding,
              format: axisY.tick.format,
              rotate: axisY.tick.rotate,
              innerTickSize: axisY.tick.innerTickSize,
              outerTickSize: axisY.tick.outerTickSize,
              text: {
                x: axisY.tick.text.x,
                y: axisY.tick.text.y,
                dx: axisY.tick.text.dx,
                dy: axisY.tick.text.dy,
                anchor: axisY.tick.text.anchor
              }
            })
            .title({
              titleClass: axisY.title.titleClass,
              x: axisY.title.x,
              y: axisY.title.y,
              dx: axisY.title.dx,
              dy: axisY.title.dy,
              transform: "translate(0," + height / 2 + ")rotate(" + axisY.title.rotate + ")",
              anchor: axisY.title.anchor,
              text: axisY.title.text
            });

          g.call(yAxis);
        }

        if (circles.show) {
          var clippath = clip()
            .width(clipPath.width || width)
            .height(clipPath.height || height);

          var points = circle()
            .cx(X)
            .cy(Y)
            .color(color)
            .radius(circles.radius)
            .cssClass(circles.circleClass)
            .fill(circles.fill)
            .stroke(circles.stroke ? circles.stroke : circles.fill)
            .strokeWidth(circles.strokeWidth)
            .events({
              mouseover: circles.events.mouseover,
              mouseout: circles.events.mouseout
            });

          g.call(clippath);

          g.append("g")
            .attr("clip-path", "url(#" + clippath.id() + ")")
            .selectAll("gCircles")
            .data(function (d) { return d; })
            .enter().append("g")
            .attr("class", circles.groupClass)
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

    chart.xDomain = function (_) {
      if (!arguments.length) { return xDomain; }
      xDomain = _;
      return chart;
    };

    chart.yScale = function (_) {
      if (!arguments.length) { return yScale; }
      yScale = _;
      return chart;
    };

    chart.yDomain = function (_) {
      if (!arguments.length) { return yDomain; }
      yDomain = _;
      return chart;
    };

    chart.dispatch = function (_) {
      if (!arguments.length) { return dispatch; }
      dispatch = _;
      return chart;
    };

    chart.xAxis = function (_) {
      if (!arguments.length) { return axisX; }
      axisX.show = typeof _.show !== "undefined" ? _.show : axisX.show;
      axisX.gClass = typeof _.gClass !== "undefined" ? _.gClass : axisX.gClass;

      axisX.tick.number = _.tick && typeof _.tick.number !== "undefined" ? _.tick.number : axisX.tick.number;
      axisX.tick.values = _.tick && typeof _.tick.values !== "undefined" ? _.tick.values : axisX.tick.values;
      axisX.tick.size = _.tick && typeof _.tick.size !== "undefined" ? _.tick.size : axisX.tick.size;
      axisX.tick.padding = _.tick && typeof _.tick.padding !== "undefined" ? _.tick.padding : axisX.tick.padding;
      axisX.tick.format = _.tick && typeof _.tick.format !== "undefined" ? _.tick.format : axisX.tick.format;
      axisX.tick.rotate = _.tick && typeof _.tick.rotate !== "undefined" ? _.tick.rotate : axisX.tick.rotate;
      axisX.tick.innerTickSize = _.tick && typeof _.tick.innerTickSize !== "undefined" ?
        _.tick.innerTickSize : axisX.tick.innerTickSize;
      axisX.tick.outerTickSize = _.tick && typeof _.tick.outerTickSize !== "undefined" ?
        _.tick.outerTickSize : axisX.tick.outerTickSize;

      axisX.tick.text.anchor = _.tick && _.tick.text && typeof _.tick.text.anchor !== "undefined" ?
        _.tick.text.anchor : axisX.tick.text.anchor;
      axisX.tick.text.x = _.tick && _.tick.text && typeof _.tick.text.x !== "undefined" ?
        _.tick.text.x : axisX.tick.text.x;
      axisX.tick.text.y = _.tick && _.tick.text && typeof _.tick.text.y !== "undefined" ?
        _.tick.text.y : axisX.tick.text.y;
      axisX.tick.text.dx = _.tick && _.tick.text && typeof _.tick.text.dx !== "undefined" ?
        _.tick.text.dx : axisX.tick.text.dx;
      axisX.tick.text.dy = _.tick && _.tick.text && typeof _.tick.text.dy !== "undefined" ?
        _.tick.text.dy : axisX.tick.text.dy;

      axisX.title.titleClass = _.title && typeof _.title.titleClass !== "undefined" ?
        _.title.titleClass : axisX.title.titleClass;
      axisX.title.x = _.title && typeof _.title.x !== "undefined" ? _.title.x : axisX.title.x;
      axisX.title.y = _.title && typeof _.title.y !== "undefined" ? _.title.y : axisX.title.y;
      axisX.title.dx = _.title && typeof _.title.dx !== "undefined" ? _.title.dx : axisX.title.dx;
      axisX.title.dy = _.title && typeof _.title.dy !== "undefined" ? _.title.dy : axisX.title.dy;
      axisX.title.anchor = _.title && typeof _.title.anchor !== "undefined" ? _.title.anchor : axisX.title.anchor;
      axisX.title.text = _.title && typeof _.title.text !== "undefined" ? _.title.text : axisX.title.text;
      return chart;
    };

    chart.yAxis = function (_) {
      if (!arguments.length) { return axisY; }
      axisY.show = typeof _.show !== "undefined" ? _.show : axisY.show;
      axisY.gClass = typeof _.gClass !== "undefined" ? _.gClass : axisY.gClass;

      axisY.tick.number = _.tick && typeof _.tick.number !== "undefined" ? _.tick.number : axisY.tick.number;
      axisY.tick.values = _.tick && typeof _.tick.values !== "undefined" ? _.tick.values : axisY.tick.values;
      axisY.tick.size = _.tick && typeof _.tick.size !== "undefined" ? _.tick.size : axisY.tick.size;
      axisY.tick.padding = _.tick && typeof _.tick.padding !== "undefined" ? _.tick.padding : axisY.tick.padding;
      axisY.tick.format = _.tick && typeof _.tick.format !== "undefined" ? _.tick.format : axisY.tick.format;
      axisY.tick.rotate = _.tick && typeof _.tick.rotate !== "undefined" ? _.tick.rotate : axisY.tick.rotate;
      axisY.tick.innerTickSize = _.tick && typeof _.tick.innerTickSize !== "undefined" ?
        _.tick.innerTickSize : axisY.tick.innerTickSize;
      axisY.tick.outerTickSize = _.tick && typeof _.tick.outerTickSize !== "undefined" ?
        _.tick.outerTickSize : axisY.tick.outerTickSize;

      axisY.tick.text.anchor = _.tick && _.tick.text && typeof _.tick.text.anchor !== "undefined" ?
        _.tick.text.anchor : axisY.tick.text.anchor;
      axisY.tick.text.x = _.tick && _.tick.text && typeof _.tick.text.x !== "undefined" ?
        _.tick.text.x : axisY.tick.text.x;
      axisY.tick.text.y = _.tick && _.tick.text && typeof _.tick.text.y !== "undefined" ?
        _.tick.text.y : axisY.tick.text.y;
      axisY.tick.text.dx = _.tick && _.tick.text && typeof _.tick.text.dx !== "undefined" ?
        _.tick.text.dx : axisY.tick.text.dx;
      axisY.tick.text.dy = _.tick && _.tick.text && typeof _.tick.text.dy !== "undefined" ?
        _.tick.text.dy : axisY.tick.text.dy;

      axisY.title.titleClass = _.title && typeof _.title.titleClass !== "undefined" ?
        _.title.titleClass : axisY.title.titleClass;
      axisY.title.x = _.title && typeof _.title.x !== "undefined" ? _.title.x : axisY.title.x;
      axisY.title.y = _.title && typeof _.title.y !== "undefined" ? _.title.y : axisY.title.y;
      axisY.title.dx = _.title && typeof _.title.dx !== "undefined" ? _.title.dx : axisY.title.dx;
      axisY.title.dy = _.title && typeof _.title.dy !== "undefined" ? _.title.dy : axisY.title.dy;
      axisY.title.anchor = _.title && typeof _.title.anchor !== "undefined" ? _.title.anchor : axisY.title.anchor;
      axisY.title.rotate = _.title && typeof _.title.rotate !== "undefined" ? _.title.rotate : axisY.title.rotate;
      axisY.title.text = _.title && typeof _.title.text !== "undefined" ? _.title.text : axisY.title.text;
      return chart;
    };

    chart.clipPath = function (_) {
      if (!arguments.length) { return clipPath; }
      clipPath.width = typeof _.width !== "undefined" ? _.width : clipPath.width;
      clipPath.height = typeof _.height !== "undefined" ? _.height : clipPath.height;
      return chart;
    };

    chart.lines = function (_) {
      if (!arguments.length) { return lines; }
      lines.lineClass = typeof _.lineClass !== "undefined" ? _.lineClass : lines.lineClass;
      lines.interpolate = typeof _.interpolate !== "undefined" ? _.interpolate : lines.interpolate;
      lines.tension = typeof _.tension !== "undefined" ? _.tension : lines.tension;
      lines.defined = typeof _.defined !== "undefined" ? _.defined : lines.defined;
      lines.stroke = typeof _.stroke !== "undefined" ? _.stroke : lines.stroke;
      lines.strokeWidth = typeof _.stroke !== "undefined" ? _.strokeWidth : lines.strokeWidth;
      lines.opacity = typeof _.opacity !== "undefined" ? _.opacity : lines.opacity;

      lines.events.mouseover = _.events && typeof _.events.mouseover !== "undefined" ?
        _.events.mouseover : lines.events.mouseover;
      lines.events.mouseout = _.events && typeof _.events.mouseout !== "undefined" ?
        _.events.mouseout : lines.events.mouseout;
      lines.events.click = _.events && typeof _.events.click !== "undefined" ?
        _.events.click : lines.events.click;
      return chart;
    };

    chart.circles = function (_) {
      if (!arguments.length) { return circles; }
      circles.show = typeof _.show !== "undefined" ? _.show : circles.show;
      circles.groupClass = typeof _.groupClass !== "undefined" ? _.groupClass : circles.groupClass;
      circles.circleClass = typeof _.circleClass !== "undefined" ? _.circleClass : circles.circleClass;
      circles.radius = typeof _.radius !== "undefined" ? _.radius : circles.radius;
      circles.fill = typeof _.fill !== "undefined" ? _.fill : circles.fill;
      circles.stroke = typeof _.stroke !== "undefined" ? _.stroke : circles.stroke;
      circles.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : circles.strokeWidth;

      circles.events.mouseover = _.events && typeof _.events.mouseover !== "undefined" ?
        _.events.mouseover : circles.events.mouseover;
      circles.events.mouseout = _.events && typeof _.events.mouseout !== "undefined" ?
        _.events.mouseout : circles.events.mouseout;
      circles.events.click = _.events && typeof _.events.click !== "undefined" ?
        _.events.click : circles.events.click;
      return chart;
    };

    d3.rebind(chart, dispatch, "on");
    return chart;
  };
});
