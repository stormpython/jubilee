define(function (require) {
  var d3 = require("d3");

  return function path() {
    var pathGenerator = null;
    var color = d3.scale.category10();

    // Options
    var gClass = "layer";
    var pathClass = "line";
    var transform = "translate(0,0)");
    var fill = function (d, i) { return color(i); };
    var stroke = 3;
    var strokeWidth = 1;

    function shape(selection) {
      selection.each(function () {
        var layer = d3.select(this).selectAll("layer")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", gClass);

        layer.append("path")
          .attr("transform", transform)
          .attr("class", pathClass)
          .attr("d", pathGenerator)
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth);
      });
    }

    shape.pathGenerator = function (_) {
      if (!arguments.length) { return pathGenerator; }
      pathGenerator = _;
      return shape;
    };

    shape.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return shape;
    };

    shape.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return shape;
    };

    shape.pathClass = function (_) {
      if (!arguments.length) { return pathClass; }
      pathClass = _;
      return shape;
    };

    shape.transform = function (_) {
      if (!arguments.length) { return transform; }
      transform = _;
      return shape;
    };

    shape.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return shape;
    };

    shape.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = _;
      return shape;
    };

    shape.strokeWidth = function (_) {
      if (!arguments.length) { return strokeWidth; }
      strokeWidth = _;
      return shape;
    };

    return shape;
  };
});
