define(function (require) {
  describe("mapDomain tests", function () {
    var mapDomain = require("src/modules/helpers/map_domain");
    var data = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10]
    ];
    var concatArray

    beforeEach(function () {
      concatArray = mapDomain(data);
    });

    it("should be a function", function () {
      chai.assert.isFunction(mapDomain);
    });

    it("should concatenate arrays", function () {
      var length = data[0].length + data[1].length;
      chai.assert.equal(concatArray.length, length);
    });
  });
});