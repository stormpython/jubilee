define(function (require) {
  var d3 = require("d3");

  return function builder(attrs, func) {
    if (typeof attrs !== "object") {
      throw new Error("builder expects an object as its first argument");
    }

    if (typeof func !== "function") {
      throw new Error("builder expects a function as its second argument");
    }

    d3.entries(attrs).forEach(function (d) {
      if (typeof func[d.key] === "function") {
        func[d.key](d.value);
      }
    });

    return func;
  };
});