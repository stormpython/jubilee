define(function (require) {
  var d3 = require("d3");

  return function axis() {
    var transform = "translate(0,0)";
    var scale = null;

    var text = "";
    var textY = 6;
    var textDY = ".71em";
    var textAnchor = "end";

    function component(selection) {
      selection.each(function () {
        var g = d3.select(this).select("axis")
          .attr("transform", transform)
          .call(scale);

        g.append("text")
          .attr("y", textY)
          .attr("dy", textDY)
          .style("text-anchor", textAnchor)
          .text(text);
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

    component.text = function (_) {
      if (!arguments.length) { return text; }
      text = _;
      return component;
    };

    component.textY = function (_) {
      if (!arguments.length) { return textY; }
      textY = _;
      return component;
    };

    component.textDY = function (_) {
      if (!arguments.length) { return textDY; }
      textDY = _;
      return component;
    };

    component.textAnchor = function (_) {
      if (!arguments.length) { return textAnchor; }
      textAnchor = _;
      return component;
    };

    return component;
  };
});