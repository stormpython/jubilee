define(function (require) {
  var d3 = require("d3");

  return function axes() {
    var transform = "translate(0,0)";
    var axis = null;

    var gClass = "axis";
    var title = "";
    var titleY = 6;
    var titleDY = ".71em";
    var titleAnchor = "end";

    function component(selection) {
      selection.each(function () {
        var g = d3.select(this).append("g")
          .attr("class", gClass)
          .attr("transform", transform)
          .call(axis);

        g.append("text")
          .attr("y", titleY)
          .attr("dy", titleDY)
          .style("title-anchor", titleAnchor)
          .text(title);
      });
    }

    component.axis= function (_) {
      if (!arguments.length) { return axis; }
      axis = _;
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

    component.titleY = function (_) {
      if (!arguments.length) { return titleY; }
      titleY = _;
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
