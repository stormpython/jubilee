define(function () {
  return function (_, clipPath) {
    clipPath.width = typeof _.width !== "undefined" ? _.width : clipPath.width;
    clipPath.height = typeof _.height !== "undefined" ? _.height : clipPath.height;

    return clipPath;
  };
});