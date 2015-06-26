define(function () {
  return function (_, events) {
    events.mouseover = typeof _.mouseover !== "undefined" ? _.mouseover : events.mouseover;
    events.mouseout = typeof _.mouseout !== "undefined" ? _.mouseout : events.mouseout;
    events.mousemove = typeof _.mousemove !== "undefined" ? _.mousemove : events.mousemove;
    events.mouseup = typeof _.mouseup !== "undefined" ? _.mouseup : events.mouseup;
    events.mousedown = typeof _.mousedown !== "undefined" ? _.mousedown : events.mousedown;
    events.click = typeof _.click !== "undefined" ? _.click : events.click;
    events.dblclick = typeof _.dblclick !== "undefined" ? _.dblclick : events.dblclick;

    return events;
  };
});