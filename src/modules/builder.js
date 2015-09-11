define(function (require) {
  var d3 = require("d3");

  return function builder() {
    // Private variables
    var func = function () {};
    var attrs = {};

    function component() {
      d3.entries(attrs).forEach(function (d) {
        if (typeof func[d.key] === "function") {
          func[d.key](d.value);
        }
      });

      return func;
    }

    // Public API
    component.function = function (_) {
      if (!arguments.length) { return func; }
      func = typeof _ === "function" ? _ : func;
      return component;
    };

    component.options = function (_) {
      if (!arguments.length) { return attrs; }
      if (arguments.length === 1 && typeof _ === "string") {
        return attrs[_];
      }
      attrs = typeof _ === "object" ? _ : attrs;
      return component;
    };

    return component;
  };
});