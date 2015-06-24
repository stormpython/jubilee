define(function () {
  return function (_, axis) {
    axis.show = typeof _.show !== "undefined" ? _.show : axis.show;
    axis.gClass = typeof _.gClass !== "undefined" ? _.gClass : axis.gClass;

    axis.tick.number = _.tick && typeof _.tick.number !== "undefined" ? _.tick.number : axis.tick.number;
    axis.tick.values = _.tick && typeof _.tick.values !== "undefined" ? _.tick.values : axis.tick.values;
    axis.tick.size = _.tick && typeof _.tick.size !== "undefined" ? _.tick.size : axis.tick.size;
    axis.tick.padding = _.tick && typeof _.tick.padding !== "undefined" ? _.tick.padding : axis.tick.padding;
    axis.tick.format = _.tick && typeof _.tick.format !== "undefined" ? _.tick.format : axis.tick.format;
    axis.tick.rotate = _.tick && typeof _.tick.rotate !== "undefined" ? _.tick.rotate : axis.tick.rotate;
    axis.tick.innerTickSize = _.tick && typeof _.tick.innerTickSize !== "undefined" ?
      _.tick.innerTickSize : axis.tick.innerTickSize;
    axis.tick.outerTickSize = _.tick && typeof _.tick.outerTickSize !== "undefined" ?
      _.tick.outerTickSize : axis.tick.outerTickSize;

    axis.tick.text.anchor = _.tick && _.tick.text && typeof _.tick.text.anchor !== "undefined" ?
      _.tick.text.anchor : axis.tick.text.anchor;
    axis.tick.text.x = _.tick && _.tick.text && typeof _.tick.text.x !== "undefined" ?
      _.tick.text.x : axis.tick.text.x;
    axis.tick.text.y = _.tick && _.tick.text && typeof _.tick.text.y !== "undefined" ?
      _.tick.text.y : axis.tick.text.y;
    axis.tick.text.dx = _.tick && _.tick.text && typeof _.tick.text.dx !== "undefined" ?
      _.tick.text.dx : axis.tick.text.dx;
    axis.tick.text.dy = _.tick && _.tick.text && typeof _.tick.text.dy !== "undefined" ?
      _.tick.text.dy : axis.tick.text.dy;

    axis.title.titleClass = _.title && typeof _.title.titleClass !== "undefined" ?
      _.title.titleClass : axis.title.titleClass;
    axis.title.x = _.title && typeof _.title.x !== "undefined" ? _.title.x : axis.title.x;
    axis.title.y = _.title && typeof _.title.y !== "undefined" ? _.title.y : axis.title.y;
    axis.title.dx = _.title && typeof _.title.dx !== "undefined" ? _.title.dx : axis.title.dx;
    axis.title.dy = _.title && typeof _.title.dy !== "undefined" ? _.title.dy : axis.title.dy;
    axis.title.anchor = _.title && typeof _.title.anchor !== "undefined" ? _.title.anchor : axis.title.anchor;
    axis.title.text = _.title && typeof _.title.text !== "undefined" ? _.title.text : axis.title.text;

    return axis;
  };
});
