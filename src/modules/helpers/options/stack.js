define(function () {
  return {
    stack: true,
    offset: "zero",
    order: "default",
    out: function (d, y0, y) {
      d.y0 = y0;
      d.y = y;
    }
  };
});
