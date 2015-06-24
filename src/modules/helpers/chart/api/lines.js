define(function () {
  return function (_, lines) {
    lines.lineClass = typeof _.lineClass !== "undefined" ? _.lineClass : lines.lineClass;
    lines.interpolate = typeof _.interpolate !== "undefined" ? _.interpolate : lines.interpolate;
    lines.tension = typeof _.tension !== "undefined" ? _.tension : lines.tension;
    lines.defined = typeof _.defined !== "undefined" ? _.defined : lines.defined;
    lines.stroke = typeof _.stroke !== "undefined" ? _.stroke : lines.stroke;
    lines.strokeWidth = typeof _.stroke !== "undefined" ? _.strokeWidth : lines.strokeWidth;
    lines.opacity = typeof _.opacity !== "undefined" ? _.opacity : lines.opacity;

    lines.events.mouseover = _.events && typeof _.events.mouseover !== "undefined" ?
      _.events.mouseover : lines.events.mouseover;
    lines.events.mouseout = _.events && typeof _.events.mouseout !== "undefined" ?
      _.events.mouseout : lines.events.mouseout;
    lines.events.click = _.events && typeof _.events.click !== "undefined" ?
      _.events.click : lines.events.click;

    return lines;
  };
});