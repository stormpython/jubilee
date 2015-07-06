define(function () {
  return function (_, rects) {
    rects.show = typeof _.show !== "undefined" ? _.show : rects.show;
    rects.x = typeof _.x !== "undefined" ? _.x : rects.x;
    rects.y = typeof _.y !== "undefined" ? _.y : rects.y;
    rects.width = typeof _.width !== "undefined" ? _.width : rects.width;
    rects.height = typeof _.height !== "undefined" ? _.height : rects.height;
    rects.groupClass = typeof _.groupClass !== "undefined" ? _.groupClass : rects.groupClass;
    rects.cssClass = typeof _.cssClass !== "undefined" ? _.cssClass : rects.cssClass;
    rects.fill = typeof _.fill !== "undefined" ? _.fill : rects.fill;
    rects.stroke = typeof _.stroke !== "undefined" ? _.stroke : rects.stroke;
    rects.strokeWidth = typeof _.strokeWidth !== "undefined" ? _.strokeWidth : rects.strokeWidth;
    rects.opacity = typeof _.opacity !== "undefined" ? _.opacity : rects.opacity;

    return rects;
  };
});
