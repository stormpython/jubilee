define(function (require) {
  describe("scaleValue tests", function () {
    var d3 = require("d3");
    var scaleValue = require("src/modules/helpers/scale_value");
    var d3scale = d3.scale.linear();
    var domain = [1, 200];
    var range = [0, 100];
    var callback = function (d) { return d.y; };
    var data = [
      {y: 45},
      {y: 55},
      {y: 65},
      {y: 75},
      {y: 85}
    ];
    var scale;

    beforeEach(function () {
      d3scale.domain(domain).range(range);
      scale = scaleValue(d3scale, callback);
    });

    it("should return a function", function () {
      chai.assert.isFunction(scale);
    });

    it("should scale values", function () {
      var scaledValues = data.map(function (d) {
        return scale(d);
      });

      chai.assert.equal(scaledValues[0], d3scale(data[0].y));
      chai.assert.equal(scaledValues[4], d3scale(data[4].y));
    });
  });
});