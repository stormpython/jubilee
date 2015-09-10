define(function () {
  /**
   * Wrapper function that returns a function
   * that returns the argument or an object key.
   * If argument is a function, returns the function.
   */
  return function (val) {
    if (typeof val === "function") { return val; }
    if (typeof val === "string") {
      return function (d) { return d[val]; };
    }
    return function () { return val; };
  };
});