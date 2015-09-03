define(function (require) {
  var d3 = require("d3");

  /**
   * Builds and return a function based on key value pairs
   * and calls it on a d3 selection.
   */
  return function functor() {
    var func = function () {};
    var opts = {};

    function constructor(selection) {
      selection.each(function () {
        if (typeof func === "function") {
          d3.entries(opts).forEach(function (d) {
            if (typeof func[d.key] === "function") {
              func[d.key](d.value);
            }
          });

          d3.select(this).call(func);
        }
      });
    }

    constructor.function = function (_) {
      if (!arguments.length) { return func; }
      func = typeof _ !== "function" ? func : _;
      return constructor;
    };

    constructor.options = function (_) {
      if (!arguments.length) { return opts; }
      opts = typeof _ !== "object" ? opts : _;
      return constructor;
    };

    return constructor;
  };
});
