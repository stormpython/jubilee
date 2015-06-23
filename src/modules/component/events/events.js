define(function (require) {
  var d3 = require("d3");

  return function events() {
    var mouseover = function () {};
    var mouseout = function () {};
    var click = function () {};

    function component(selection) {
      selection
        .on("mouseover", function (d, i) {
          mouseover.call(this, d3.event, d, i);
        })
        .on("mouseout", function (d, i) {
          mouseout.call(this, d3.event, d, i);
        })
        .on("click", function (d, i) {
          click.call(this, d3.event, d, i);
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

    component.click = function (_) {
      if (!arguments.length) { return click; }
      click = _;
      return component;
    };

    return component;
  };
});