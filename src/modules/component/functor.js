define(function (require) {
  var d3 = require("d3");

  return function functor() {
    var func = function () {};
    var options = {};

    function component() {
      var args = arguments;

      d3.entries(options).forEach(function (d) {
        if (typeof func[d.key] === "function") {
          func[d.key](d3.functor(d.value).apply(null, args));
        }
      });

      return func;
    }

    component.function = function (_) {
      if (!arguments.length) { return func; }
      func = _;
      return component;
    };

    component.options = function (_) {
      if (!arguments.length) { return options; }
      options = _;
      return component;
    };

    return component;
  };
});