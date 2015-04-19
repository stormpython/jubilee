define(function (require) {
  var d3 = require("d3");

  return function axes() {
    var scale = d3.scale.linear();
    var orient = "bottom";
    var ticks = 10;
    var tickValues = null;
    var tickSize = 6;
    var innerTickSize = 6;
    var outerTickSize = 6;
    var tickPadding = 3;
    var tickFormat = null;

    var transform = "translate(0,0)";
    var gClass = "axis";
    var title = "";
    var titleClass = "axis title";
    var titleX = 6;
    var titleY = 6;
    var titleDX = "";
    var titleDY = ".71em";
    var titleAnchor = "end";

    function component(selection) {
      selection.each(function () {
        var axis = d3.svg.axis()
          .scale(scale)
          .orient(orient)
          .ticks(ticks)
          .tickValues(tickValues)
          .tickSize(tickSize)
          .innerTickSize(innerTickSize)
          .outerTickSize(outerTickSize)
          .tickPadding(tickPadding)
          .tickFormat(tickFormat);

        var g = d3.select(this).append("g")
          .attr("class", gClass)
          .attr("transform", transform)
          .call(axis);

        g.append("text")
          .attr("class", titleClass)
          .attr("x", titleX)
          .attr("y", titleY)
          .attr("dx", titleDX)
          .attr("dy", titleDY)
          .style("title-anchor", titleAnchor)
          .text(title);
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

    component.ticks = function (_) {
      if (!arguments.length) { return ticks; }
      ticks = _;
      return component;
    };

    component.tickValues = function (_) {
      if (!arguments.length) { return tickValues; }
      tickValues = _;
      return component;
    };

    component.tickSize = function (_) {
      if (!arguments.length) { return tickSize; }
      tickSize = _;
      return component;
    };

    component.innerTickSize = function (_) {
      if (!arguments.length) { return innerTickSize; }
      innerTickSize = _;
      return component;
    };

    component.outerTickSize = function (_) {
      if (!arguments.length) { return outerTickSize; }
      outerTickSize = _;
      return component;
    };

    component.tickPadding = function (_) {
      if (!arguments.length) { return tickPadding; }
      tickPadding = _;
      return component;
    };

    component.tickFormat = function (_) {
      if (!arguments.length) { return tickFormat; }
      tickFormat = _;
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
      title = _;
      return component;
    };

    component.titleClass = function (_) {
      if (!arguments.length) { return titleClass; }
      titleClass = _;
      return component;
    };

    component.titleX = function (_) {
      if (!arguments.length) { return titleX; }
      titleX = _;
      return component;
    };
    component.titleY = function (_) {
      if (!arguments.length) { return titleY; }
      titleY = _;
      return component;
    };

    component.titleDX = function (_) {
      if (!arguments.length) { return titleDX; }
      titleDX = _;
      return component;
    };

    component.titleDY = function (_) {
      if (!arguments.length) { return titleDY; }
      titleDY = _;
      return component;
    };

    component.titleAnchor = function (_) {
      if (!arguments.length) { return titleAnchor; }
      titleAnchor = _;
      return component;
    };

    return component;
  };
});
