define(function () {
  return function (_, margin) {
    margin.top = typeof _.top !== "undefined" ? _.top : margin.top;
    margin.right = typeof _.right !== "undefined" ? _.right : margin.right;
    margin.bottom = typeof _.bottom !== "undefined" ? _.bottom : margin.bottom;
    margin.left = typeof _.left !== "undefined" ? _.left : margin.left;

    return margin;
  };
});