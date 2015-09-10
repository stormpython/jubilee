define(function (require) {
  describe("valuator tests", function () {
    var valuator = require("src/modules/valuator");

    it("should return a function", function () {
      var func = valuator("x");
      chai.assert.isFunction(func);
    });

    it("should return the function passed", function () {
      var x = function (d) { return d.x; };
      var func = valuator(x);
      chai.assert.equal(func, x);
    });

    it("should return a function that accesses a key (passed as the argument) from an object", function () {
      var func = valuator("x");
      var obj = { x: true };
      var val = func(obj);
      chai.assert.isTrue(val);
    });

    it("should return the value passed if not string or function", function () {
      var arr = [1, true, [1, 2, 3], { a: true }];
      arr.forEach(function (val) {
        var func = valuator(val);
        chai.assert.deepEqual(func(), val);
      });
    });
  });
});