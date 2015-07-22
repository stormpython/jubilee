define(function () {
  return function (fixture) {
    fixture.selectAll("*").remove();
    fixture.datum(null);
    fixture = null;
  };
});