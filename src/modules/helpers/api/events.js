define(function () {
  return function (_, events) {
    events.mouseover = typeof _.mouseover !== "undefined" ? _.mouseover : events.mouseover;
    events.mouseout = typeof _.mouseout !== "undefined" ? _.mouseout : events.mouseout;
    events.click = typeof _.click !== "undefined" ? _.click : events.click;

    return events;
  };
});