define(function (require) {
  describe("Functor tests", function () {
    var functor = require("src/modules/functor");
    var func = function (selection) {
      selection.each(function (data) {
        return data;
      });
    };
    var options = {};
    var statement = "test works";
    var d3fixture = require("fixtures/fixture");
    var remove = require("fixtures/remove");
    var fixture;

    beforeEach(function () {
      fixture = d3fixture;
      func.test = function (_) {
        if (!arguments.length) { return statement; }
        statement = _;
      };
    });

    afterEach(function () {
      statement = "test works";
      options = {};
      remove(fixture);
    });

    it("should return a function", function () {
      var testFunc = functor();
      chai.assert.isFunction(testFunc);
    });

    describe("function API", function () {
      it("should set and return the function", function () {
        var testFunc = functor().function(func);
        chai.assert.equal(testFunc.function(), func);
      });
    });

    describe("option API", function () {
      it("should set and return the options", function () {
        var opts = { test: true };
        var testFunc = functor().function(func).options(opts);
        chai.assert.deepEqual(testFunc.options(), opts);
      });
    });

    describe("d3 selection as argument", function () {
      it("should take a selection as its argument", function () {
        var testFunc = functor().function(func);
        var data = [1, 2, 3];
      });
    });
  });
});