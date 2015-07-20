/**
 * Concatenates arrays of arrays
 */
define(function () {
  return function (data) {
    return data.reduce(function (a, b) {
      return a.concat(b);
    });
  };
});
