define(function () {
  return function (_, scale) {
    scale.scale = typeof _.scale !== "undefined" ? _.scale : scale.scale;
    scale.domain = typeof _.domain !== "undefined" ? _.domain : scale.domain;
    scale.nice = typeof _.nice !== "undefined" ? _.nice : scale.nice;
    scale.clamp = typeof _.clamp !== "undefined" ? _.clamp : scale.clamp;

    return scale;
  };
});