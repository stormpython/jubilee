define(function (require) {
  describe("timeparser tests", function () {
    var timeParser = require("src/modules/helpers/timeparser");
    var timeNotation = {
      s: "second",
      m: "minute",
      h: "hour",
      d: "day",
      w: "week",
      M: "month",
      y: "year"
    };
    var arr = Object.keys(timeNotation);

    it("should return undefined if argument is not a string", function () {
      var vals = [
        timeParser(true),
        timeParser(1),
        timeParser({}),
        timeParser([]),
        timeParser(function () {})
      ];

      vals.forEach(function (v) {
        chai.assert.isUndefined(v);
      });
    });

    it("should return time notation if valid string", function () {
      arr.forEach(function (v) {
        var timeString = 10 + v;
        chai.assert.equal(timeParser(timeString), timeNotation[v]);
      });
    });

    it("should error on an invalid string", function () {
      var str = "10D";

      chai.assert.throw(function () {
        timeParser(str);
      }, "Invalid time string " + str);
    });
  });
});