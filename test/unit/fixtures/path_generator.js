define(function (require) {
  var d3 = require("d3");

  return function (type) {
    var pathTypes = {
      line: d3.svg.line().x(X).y(Y), 
      area: d3.svg.area().x(X).y0(0).y1(Y)
    };

    function X(d) { return d.x; }
    function Y(d) { return d.y; }

    return pathTypes[type] ? pathTypes[type] : pathTypes.line;
  };
});
