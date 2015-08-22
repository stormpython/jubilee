define(function (require) {
  var d3 = require("d3");

  /**
   * Builds and return a function based on key value pairs
   * and calls it on a d3 selection.
   */
  return function constructor() {
    var func = function () {};
    var opts = {};

    function component(selection) {
      selection.each(function (data, index) {
        if (typeof func === "function") {
          d3.entries(opts).forEach(function (d, i) {
            if (typeof func[d.key] === "function") {
              func[d.key](d.value);
            }
          });

          d3.select(this).call(func);
        }
      });
    }

    component.function = function (_) {
      if (!arguments.length) { return func; }
      func = _;
      return component;
    };

    component.options = function (_) {
      if (!arguments.length) { return opts; }
      opts = _;
      return component;
    };

    return component;
  };
});
