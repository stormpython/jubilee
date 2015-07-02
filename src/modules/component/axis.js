define(function (require) {
  var d3 = require("d3");

  return function axes() {
    var scale = d3.scale.linear();
    var orient = "bottom";
    var tick = {
      number: 10,
      values: null,
      size: 6,
      innerTickSize: 6,
      outerTickSize: 6,
      padding: 3,
      format: null,
      rotate: 0,
      text: {
        anchor: "middle",
        x: 0,
        y: 9,
        dx: "",
        dy: ".71em"
      }
    };

    var transform = "translate(0,0)";
    var gClass = "axis";

    var title = {
      titleClass: "axis title",
      x: 6,
      y: 6,
      dx: "",
      dy: ".71em",
      anchor: "end",
      transform: "translate(0,0)",
      text: ""
    };

    function component(selection) {
      selection.each(function () {
        var axis = d3.svg.axis()
          .scale(scale)
          .orient(orient)
          .ticks(tick.number)
          .tickValues(tick.values)
          .tickSize(tick.size)
          .innerTickSize(tick.innerTickSize)
          .outerTickSize(tick.outerTickSize)
          .tickPadding(tick.padding)
          .tickFormat(tick.format);

        var g = d3.select(this).append("g")
          .attr("class", gClass)
          .attr("transform", transform)
          .call(axis);

        g.selectAll(".tick text")
          .attr("transform", "rotate(" + tick.rotate + ")")
          .attr("x", tick.text.x)
          .attr("y", tick.text.y)
          .attr("dx", tick.text.dx)
          .attr("dy", tick.text.dy)
          .style("text-anchor", tick.text.anchor);

        g.append("text")
          .attr("class", title.titleClass)
          .attr("x", title.x)
          .attr("y", title.y)
          .attr("dx", title.dx)
          .attr("dy", title.dy)
          .attr("transform", title.transform)
          .style("title-anchor", title.anchor)
          .text(title.text);
      });
    }

    component.scale = function (_) {
      if (!arguments.length) { return scale; }
      scale = _;
      return component;
    };

    component.orient = function (_) {
      if (!arguments.length) { return orient; }
      orient = _;
      return component;
    };

    component.tick = function (_) {
      if (!arguments.length) { return tick; }
      tick.number = typeof _.number !== "undefined" ? _.number : tick.number;
      tick.values = typeof _.values !== "undefined" ? _.values : tick.values;
      tick.size = typeof _.size !== "undefined" ? _.size : tick.size;
      tick.padding = typeof _.padding !== "undefined" ? _.padding : tick.padding;
      tick.format = typeof _.format !== "undefined" ? _.format : tick.format;
      tick.rotate = typeof _.rotate !== "undefined" ? _.rotate : tick.rotate;
      tick.innerTickSize = typeof _.innerTickSize !== "undefined" ? _.innerTickSize : tick.innerTickSize;
      tick.outerTickSize = typeof _.outerTickSize !== "undefined" ? _.outerTickSize : tick.outerTickSize;
      tick.text.anchor = typeof _.text.anchor !== "undefined" ? _.text.anchor : tick.text.anchor;
      tick.text.x = typeof _.text.x !== "undefined" ? _.text.x : tick.text.x;
      tick.text.y = typeof _.text.y !== "undefined" ? _.text.y : tick.text.y;
      tick.text.dx = typeof _.text.dx !== "undefined" ? _.text.dx : tick.text.dx;
      tick.text.dy = typeof _.text.dy !== "undefined" ? _.text.dy : tick.text.dy;
      return component;
    };

    component.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return component;
    };

    component.transform = function (_) {
      if (!arguments.length) { return transform; }
      transform = _;
      return component;
    };

    component.title = function (_) {
      if (!arguments.length) { return title; }
      title.titleClass = typeof _.titleClass !== "undefined" ? _.titleClass : title.titleClass;
      title.x = typeof _.x !== "undefined" ? _.x : title.x;
      title.y = typeof _.y !== "undefined" ? _.y : title.y;
      title.dx = typeof _.dx !== "undefined" ? _.dx : title.dx;
      title.dy = typeof _.dy !== "undefined" ? _.dy : title.dy;
      title.transform = typeof _.transform !== "undefined" ? _.transform : title.transform;
      title.anchor = typeof _.anchor !== "undefined" ? _.anchor : title.anchor;
      title.text = typeof _.text !== "undefined" ? _.text : title.text;
      return component;
    };

    return component;
  };
});
