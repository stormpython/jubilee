define(function (require) {
  var d3 = require("d3");

  return function rect() {
    // Private variables
    var x = function (d) { return d.x; }
    var y = function (d) { return d.y; }
    var width = 10;
    var height = 10;

    var cssClass = "rect";
    var fillStyle = "blue";
    var lineWidth = 3;
    var strokeStyle = "black";

    function element(selection) {
      selection.each(function (data, index) {
        var canvas = d3.select(this);
        var context = canvas.node().getContext("2d");
        var container = canvas.append("custom");

        var rects = container.selectAll("custom.rect")
          .data(data);

        // Exit
        rects.exit().remove();

        // Enter
        rects.enter().append("custom");

        // Update
        rects
          .attr("class", cssClass)
          .attr("x", x)
          .attr("y", y)
          .attr("width", width)
          .attr("height", height)
          .attr("fillStyle", fillStyle)
          .attr("lineWidth", lineWidth)
          .attr("strokeStyle", strokeStyle);

        // Clear Canvas
        context.fillStyle = "#fff";
        context.rect(0, 0, canvas.attr("width"), canvas.attr("height"));
        context.fill();

        var elements = container.selectAll("custom.rect")
        elements.each(function (d, i) {
          var node = d3.select(this);

          context.beginPath();
          context.fillStyle = node.attr("fillStyle");
          context.rect(node.attr("x"), node.attr("y"), node.attr("width"), node.attr("height"));
          context.fill();
          context.closePath();
        });
      });
    }

    // Public API
    element.cssClass = function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
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

    element.fillStyle = function (_) {
      if (!arguments.length) { return fillStyle; }
      fillStyle = _;
      return element;
    };

    element.lineWidth = function (_) {
      if (!arguments.length) { return lineWidth; }
      lineWidth = _;
      return element;
    };

    element.strokeStyle = function (_) {
      if (!arguments.length) { return strokeStyle; }
      strokeStyle = _;
      return element;
    };

    return element;
  }
});
