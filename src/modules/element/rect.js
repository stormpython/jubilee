define(function (require) {
  var d3 = require("d3");

  return function rect() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var rx = 0;
    var ry = 0;
    var width = function () { return 10; };
    var height = function () { return height; };
    var color = d3.scale.category10();

    // Options
    var rectClass = "bar";
    var fill = function (d, i) { return color(i); };
    var stroke;
    var strokeWidth;

    function element(selection) {
      selection.each(function (data, i) {
        var bars = d3.select(this).selectAll("rect")
          .data(function (d) { return d; });

        bars.exit().remove();

        bars
          .enter().append("rect")
          .attr("class", rectClass)
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("strokeWidth", strokeWidth);

        bars
          .attr("x", x)
          .attr("y", y)
          .attr("rx", rx)
          .attr("ry", ry)
          .attr("height", height)
          .attr("width", width);
      });
    }

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

    element.rx = function (_) {
      if (!arguments.length) { return rx; }
      rx = _;
      return element;
    };

    element.ry = function (_) {
      if (!arguments.length) { return ry; }
      ry = _;
      return element;
    };

    element.width = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return element;
    };

    element.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return element;
    };

    element.rectClass= function (_) {
      if (!arguments.length) { return rectClass; }
      rectClass = _;
      return element;
    };

    element.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return element;
    };

    element.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
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
