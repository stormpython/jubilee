define(function (require) {
  describe("Functor tests", function () {
    var functor = require("src/modules/functor");
    var func = function () {};
    var options = {};
    var statement = "test works";

    beforeEach(function () {
      func.test = function (_) {
        if (!arguments.length) { return statement; }
        statement = _;
      };
    });

    afterEach(function () {
      statement = "test works";
      options = {};
    });

    describe("function API", function () {
      it("should return the function", function () {
        var testFunc = functor().function(func);
        chai.assert.equal(testFunc.function(), func);
      });
    });
  });
});