define(function () {
  return function (_, line) {
    line.add = typeof _.add !== "undefined" ? _.add : line.add;
    line.lineClass = typeof _.lineClass !== "undefined" ? _.lineClass : line.lineClass;
    line.stroke = typeof _.stroke !== "undefined" ? _.stroke : line.stroke;
    line.strokeWidth = typeof _.stroke !== "undefined" ? _.strokeWidth : line.strokeWidth;
    line.opacity = typeof _.opacity !== "undefined" ? _.opacity : line.opacity;

    return line;
  };
});
