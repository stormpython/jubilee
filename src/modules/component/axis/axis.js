define(function (require) {
  var d3 = require("d3");

  return function axis() {
    var transform = "translate(0,0)";
    var scale = null;

    var title = "";
    var titleY = 6;
    var titleDY = ".71em";
    var titleAnchor = "end";

    function component(selection) {
      selection.each(function () {
        var g = d3.select(this).select("axis")
          .attr("transform", transform)
          .call(scale);

        g.append("text")
          .attr("y", titleY)
          .attr("dy", titleDY)
          .style("title-anchor", titleAnchor)
          .title(title);
      });
    }

    component.transform = function (_) {
      if (!arguments.length) { return transform; }
      transform = _;
      return component;
    };

    component.scale = function (_) {
      if (!arguments.length) { return scale; }
      scale = _;
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
