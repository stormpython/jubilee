define(function (require) {
  var d3 = require("d3");

  return function path() {
    var pathGenerator = null;
    var color = d3.scale.category10();

    // Options
    var gClass = "layer";
    var pathClass = "path";
    var transform = "translate(0,0)";
    var fill = "none";
    var stroke = function (d, i) { return color(i); };
    var strokeWidth = 1;

    function element(selection) {
      selection.each(function () {
        var layer = d3.select(this).selectAll("pathG")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", gClass);

        layer.append("path")
          .attr("transform", transform)
          .attr("class", pathClass)
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("d", pathGenerator);
      });
    }

    element.pathGenerator = function (_) {
      if (!arguments.length) { return pathGenerator; }
      pathGenerator = _;
      return element;
    };

    element.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return element;
    };

    element.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return element;
    };

    element.pathClass = function (_) {
      if (!arguments.length) { return pathClass; }
      pathClass = _;
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

    element.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = _;
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
