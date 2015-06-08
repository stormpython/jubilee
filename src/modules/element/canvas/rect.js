function rect() {
  // Private variables
  var x = function (d) { return d.x; }
  var y = function (d) { return d.y; }
  var width = 10;
  var height = 10;

  var fillStyle = "blue";
  var lineWidth = 3;
  var strokeStyle = "black";

  function element(selection) {
    selection.each(function (data, index) {
      var context = d3.select(this).node().getContext("2d");

      data.forEach(function(d, i) {
        context.beginPath();
        context.rect(x, y, width, height);
        context.fillStyle = fillStyle;
        context.fill();
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();
        context.closePath();
      });
    });
  }

  // Public variables
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