define(function (require) {
  var lineChart = require("src/modules/charts/line");
  var isFunction = (typeof lineChart === "function");
  var defaultWidth = 690;

  describe("Line Chart Tests", function () {
    it("should be a function", function () {
      chai.assert.equal(isFunction, true);
    });
    it("should return the default width", function () {
      chai.assert.equal(defaultWidth, 690);
    });
  });
});