define(function (require) {
  var d3 = require("d3");

  return function text() {
    var accessor = function (d) { return d; };
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var dx = 0;
    var dy = 0;
    var transform = null;

    // Options
    var cssClass = "text";
    var fill = "#ffffff";
    var stroke = "#ffffff";
    var strokeWidth = 1;

    function element(selection) {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var text = d3.select(this).selectAll("texts")
          .data(data);

        text.exit().remove();

        text.enter().append("text");

        text
          .attr("class", cssClass)
          .attr("x", x)
          .attr("y", y)
          .attr("dx", dx)
          .attr("dy", dy)
          .style("fill", fill)
          .style("stroke", stroke)
          .style("strokeWidth", strokeWidth);
      });
    }

    // Public API
    element.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return element;
    };

    element.x = function (_) {
      if (!arguments.length) { return x; }
      x = _;
      return element;
    };

    element.y = function (_) {
      if (!arguments.length) { return y; }
      y = _;
      return element;
    };

    element.dx = function (_) {
      if (!arguments.length) { return dx; }
      dx = _;
      return element;
    };

    element.dy = function (_) {
      if (!arguments.length) { return dy; }
      dy = _;
      return element;
    };

    element.transform = function (_) {
      if (!arguments.length) { return transform; }
      transform = _;
      return element;
    };

    element.class= function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
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
