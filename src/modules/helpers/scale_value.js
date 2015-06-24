define(function () {
  return function (scale, func) {
    return function (d, i) {
      return scale(func.call(null, d, i));
    };
  };
});