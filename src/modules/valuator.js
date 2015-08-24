define(function () {
  return function (val) {
    if (typeof val === "function") { return val; }
    if (typeof val === "string") {
      return function (d) { return d[val]; };
    }
    return function () { return val; };
  };
});