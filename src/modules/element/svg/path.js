define(function (require) {
  var d3 = require("d3");

  return function path() {
    var accessor = function (d) { return d; };
    var pathGenerator = null;

    // Options
    var cssClass = "path";
    var transform = "translate(0,0)";
    var fill = "none";
    var stroke = function (d, i) { return d3.scale.category10()(i); };
    var strokeWidth = 1;
    var opacity = 1;

    function element(selection) {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var path = d3.select(this)
          .selectAll("." + cssClass)
          .data(data);

        path.exit().remove();

        path.enter().append("path");

        path
          .attr("transform", transform)
          .attr("class", cssClass)
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("d", pathGenerator)
          .style("opacity", opacity);
      });
    }

    // Public API
    element.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return element;
    };

    element.pathGenerator = function (_) {
      if (!arguments.length) { return pathGenerator; }
      pathGenerator = _;
      return element;
    };

    element.class = function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
      return element;
    };

    element.transform = function (_) {
      if (!arguments.length) { return transform; }
      transform = _;
      return element;
    };

    element.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return element;
    };

    element.opacity = function (_) {
      if (!arguments.length) { return opacity; }
      opacity = _;
      return element;
    };

    element.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = d3.functor(_);
      return element;
    };

    element.strokeWidth = function (_) {
      if (!arguments.length) { return strokeWidth; }
      strokeWidth = _;
      return element;
    };

    return element;
  };
});
