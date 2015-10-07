define(function (require) {
  var d3 = require("d3");

  return function text() {
    var key = function (d) { return d.x; };
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var dx = 0;
    var dy = 0;
    var transform = null;

    // Options
    var cssClass = "text";
    var fill = "#ffffff";
    var anchor = "middle";
    var texts = "";

    function element(selection) {
      selection.each(function (data) {
        var text = d3.select(this).selectAll("text")
          .data(data);

        text.exit().remove();

        text.enter().append("text");

        text
          .attr("class", cssClass)
          .attr("transform", transform)
          .attr("x", x)
          .attr("y", y)
          .attr("dx", dx)
          .attr("dy", dy)
          .attr("fill", fill)
          .style("text-anchor", anchor)
          .text(texts);
      });
    }

    // Public API
    element.key = function (_) {
      if (!arguments.length) { return key; }
      key = _;
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

    element.anchor = function (_) {
      if (!arguments.length) { return anchor; }
      anchor = _;
      return element;
    };

    element.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return element;
    };

    element.text = function (_) {
      if (!arguments.length) { return texts; }
      texts = _;
      return element;
    };

    return element;
  };
});
