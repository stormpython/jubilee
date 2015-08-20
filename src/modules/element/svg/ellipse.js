define(function (require) {
  var d3 = require("d3");

  return function ellipse() {
    var accessor = function (d) { return d; };
    var cx = function (d) { return d.x; };
    var cy = function (d) { return d.y; };
    var rx = 20;
    var ry = 20;

    // Options
    var cssClass = "ellipses";
    var fill = colorFill;
    var stroke = colorFill;
    var strokeWidth = 0;
    var opacity = null;

    function element(selection) {
      selection.each(function (data, index) {
        data = accessor.call(this, data, index);

        var ellipses = d3.select(this).selectAll("ellipse")
          .data(data);

        // Exit
        ellipses.exit().remove();

        // Enter
        ellipses.enter().append("ellipse");

        // Update
        ellipses
          .attr("class", cssClass)
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("rx", rx)
          .attr("ry", ry)
          .style("opacity", opacity);
      });
    }

    function colorFill(d, i) {
      return d3.scale.category10()(i);
    }

    // Public API
    element.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return element;
    };

    element.cx = function (_) {
      if (!arguments.length) { return cx; }
      cx = _;
      return element;
    };

    element.cy = function (_) {
      if (!arguments.length) { return cy; }
      cy = _;
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

    element.class = function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
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
