define(function (require) {
  var d3 = require("d3");

  return function (_) {
    if (typeof _ === "function") { return _; }
    if (typeof _ === "string") {
      if (_ === "time") { return d3[_].scale(); }
      if (_ === "time.utc") { return d3.time.scale.utc(); }
      return typeof d3.scale[_] === "function" ? d3.scale[_]() : d3.scale.linear();
    }
    return _;
  };
});