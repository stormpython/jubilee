define(function (require) {
  var d3 = require("d3");

  return function events() {
    var mouseover = function () {};
    var mouseout = function () {};
    var mousemove = function () {};
    var mouseup = function () {};
    var mousedown = function () {};
    var click = function () {};
    var dblclick = function () {};

    function component(selection) {
      selection
        .on("mouseover", function (d, i) {
          mouseover.call(this, d3.event, d, i);
        })
        .on("mouseout", function (d, i) {
          mouseout.call(this, d3.event, d, i);
        })
        .on("mousemove", function (d, i) {
          mousemove.call(this, d3.event, d, i);
        })
        .on("mouseup", function (d, i) {
          mouseup.call(this, d3.event, d, i);
        })
        .on("mousedown", function (d, i) {
          mousedown.call(this, d3.event, d, i);
        })
        .on("click", function (d, i) {
          click.call(this, d3.event, d, i);
        })
        .on("dblclick", function (d, i) {
          dblclick.call(this, d3.event, d, i);
        });
    }

    component.mouseover = function (_) {
      if (!arguments.length) { return mouseover; }
      mouseover = _;
      return component;
    };

    component.mouseout = function (_) {
      if (!arguments.length) { return mouseout; }
      mouseout = _;
      return component;
    };

    component.mousemove = function (_) {
      if (!arguments.length) { return mousemove; }
      mousemove = _;
      return component;
    };

    component.mouseup = function (_) {
      if (!arguments.length) { return mouseup; }
      mouseup = _;
      return component;
    };

    component.mousedown = function (_) {
      if (!arguments.length) { return mousedown; }
      mousedown = _;
      return component;
    };

    component.click = function (_) {
      if (!arguments.length) { return click; }
      click = _;
      return component;
    };

    component.dblclick = function (_) {
      if (!arguments.length) { return dblclick; }
      dblclick = _;
      return component;
    };

    return component;
  };
});