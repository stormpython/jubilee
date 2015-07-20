/**
 * Returns a function that applies a scale to the returned value of a callback function.
 */
define(function () {
  return function (scale, func) {
    return function (d, i) {
      return scale(func.call(null, d, i));
    };
  };
});