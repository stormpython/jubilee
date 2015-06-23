define(function (require) {
  var d3 = require("d3");
  var event = require("src/modules/component/events/events");

  return function image() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var values = null;
    var width = 10;
    var height = 10;
    var xlink = null;
    var preserveAspectRatio = null;

    // Options
    var cssClass = "image";
    var events = {
      mouseover: function () {},
      mouseout: function () {},
      click: function () {}
    };

    function element(selection) {
      selection.each(function (data, index) {
        var images = d3.select(this).selectAll("image")
          .data(values ? values : data);

        var imageEvents = event()
          .mouseover(events.mouseover)
          .mouseout(events.mouseout)
          .click(events.click);

        // Exit
        images.exit().remove();

        // Enter
        images.enter().append("image");

        // Update
        images
          .attr("class", cssClass)
          .attr("x", x)
          .attr("y", y)
          .attr("width", width)
          .attr("height", height)
          .attr("xlink:href", xlink)
          .attr("preserveAspectRatio", preserveAspectRatio);

        images.call(imageEvents);
      });
    }

    element.data = function (_) {
      if (!arguments.length) { return values; }
      values = _;
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

    element.xlink = function (_) {
      if (!arguments.length) { return xlink; }
      xlink = _;
      return element;
    };

    element.preserveAspectRatio = function (_) {
      if (!arguments.length) { return preserveAspectRatio; }
      preserveAspectRatio = _;
      return element;
    };

    element.cssClass= function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
      return element;
    };

    element.events = function (_) {
      if (!arguments.length) { return events; }
      events.mouseover = typeof _.mouseover !== "undefined" ? _.mouseover : events.mouseover;
      events.mouseout = typeof _.mouseout !== "undefined" ? _.mouseout : events.mouseout;
      events.click = typeof _.click !== "undefined" ? _.click : events.click;
      return element;
    };

    return element;
  };
});
