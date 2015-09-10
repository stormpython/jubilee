define(function (require) {
  describe("scaletor tests", function () {
    var d3 = require("d3");
    var scaletor = require("src/modules/helpers/scaletor");

    it("should return a function", function () {
      var scales = [
        d3.scale.linear(),
        "linear",
        function () {}
      ];

      scales.forEach(function (scale) {
        chai.assert.isFunction(scaletor(scale));
      });
    });

    it("should return a proper d3 scale", function () {
      var scales = {
        linear: d3.scale.linear(),
        ordinal: d3.scale.ordinal(),
        sqrt: d3.scale.sqrt()
      };

      Object.keys(scales).forEach(function (scale) {
        var scaletorDomain = scaletor(scale).domain();
        var d3ScaleDomain = scales[scale].domain();
        chai.assert.deepEqual(scaletorDomain, d3ScaleDomain);
      });
    });

    it("should return a d3 linear scale with invalid argument", function () {
      var invalidArgs = ["posture", undefined, null, false];

      invalidArgs.forEach(function (arg) {
        var scale = scaletor(arg);
        var d3LinearScaleDomain = d3.scale.linear().domain();

        chai.assert.deepEqual(scale.domain(), d3LinearScaleDomain);
      });
    });
  });
});