define(function () {
  return function (_, options) {
    var axis = {};

    axis.show = typeof _.show !== "undefined" ? _.show : options.show;
    axis.gClass = typeof _.gClass !== "undefined" ? _.gClass : options.gClass;
    axis.transform = typeof _.transform !== "undefined" ? _.transform : options.transform;

    axis.tick = typeof _.tick !== "undefined" ? _.tick : {};
    axis.tick.number = _.tick && typeof _.tick.number !== "undefined" ? _.tick.number : options.tick.number;
    axis.tick.values = _.tick && typeof _.tick.values !== "undefined" ? _.tick.values : options.tick.values;
    axis.tick.size = _.tick && typeof _.tick.size !== "undefined" ? _.tick.size : options.tick.size;
    axis.tick.padding = _.tick && typeof _.tick.padding !== "undefined" ? _.tick.padding : options.tick.padding;
    axis.tick.format = _.tick && typeof _.tick.format !== "undefined" ? _.tick.format : options.tick.format;
    axis.tick.rotate = _.tick && typeof _.tick.rotate !== "undefined" ? _.tick.rotate : options.tick.rotate;
    axis.tick.innerTickSize = _.tick && typeof _.tick.innerTickSize !== "undefined" ?
      _.tick.innerTickSize : options.tick.innerTickSize;
    axis.tick.outerTickSize = _.tick && typeof _.tick.outerTickSize !== "undefined" ?
      _.tick.outerTickSize : options.tick.outerTickSize;

    axis.tick.text = _.tick && typeof _.tick.text !== "undefined" ? _.tick.text : {};
    axis.tick.text.anchor = _.tick && _.tick.text && typeof _.tick.text.anchor !== "undefined" ?
      _.tick.text.anchor : options.tick.text.anchor;
    axis.tick.text.x = _.tick && _.tick.text && typeof _.tick.text.x !== "undefined" ?
      _.tick.text.x : options.tick.text.x;
    axis.tick.text.y = _.tick && _.tick.text && typeof _.tick.text.y !== "undefined" ?
      _.tick.text.y : options.tick.text.y;
    axis.tick.text.dx = _.tick && _.tick.text && typeof _.tick.text.dx !== "undefined" ?
      _.tick.text.dx : options.tick.text.dx;
    axis.tick.text.dy = _.tick && _.tick.text && typeof _.tick.text.dy !== "undefined" ?
      _.tick.text.dy : options.tick.text.dy;

    axis.title = typeof _.title !== "undefined" ? _.title : {};
    axis.title.titleClass = _.title && typeof _.title.titleClass !== "undefined" ?
      _.title.titleClass : options.title.titleClass;
    axis.title.x = _.title && typeof _.title.x !== "undefined" ? _.title.x : options.title.x;
    axis.title.y = _.title && typeof _.title.y !== "undefined" ? _.title.y : options.title.y;
    axis.title.dx = _.title && typeof _.title.dx !== "undefined" ? _.title.dx : options.title.dx;
    axis.title.dy = _.title && typeof _.title.dy !== "undefined" ? _.title.dy : options.title.dy;
    axis.title.anchor = _.title && typeof _.title.anchor !== "undefined" ? _.title.anchor : options.title.anchor;
    axis.title.transform = _.title && typeof _.title.transform !== "undefined" ?
      _.title.transform : options.title.transform;
    axis.title.text = _.title && typeof _.title.text !== "undefined" ? _.title.text : options.title.text;

    return axis;
  };
});
