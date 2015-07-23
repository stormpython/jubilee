/**
 * Concatenates arrays of arrays
 */
define(function () {
  return function (data) {
    var isArrayOfArrays = data.every(function (obj) {
      return Array.isArray(obj);
    });

    if (!isArrayOfArrays) { return data; }
    return data.reduce(function (a, b) {
      return a.concat(b);
    });
  };
});
