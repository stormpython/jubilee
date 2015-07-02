define(function (require) {
  var event = require("src/modules/component/events");

  return function (events) {
    return event()
      .mouseover(events.mouseover)
      .mouseout(events.mouseout)
      .mousemove(events.mousemove)
      .mouseup(events.mouseup)
      .mousedown(events.mousedown)
      .click(events.click)
      .dblclick(events.dblclick);
  };
});