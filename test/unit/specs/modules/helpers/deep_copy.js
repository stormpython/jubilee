define(function (require) {
  describe("deepCopy tests", function () {
    var deepCopy = require("src/modules/helpers/deep_copy");
    var object;
    var objectCopy;

    beforeEach(function () {
      object = {
        x: function (d) { return d; },
        y: 234,
        label: "value",
        arr: [1, 2, 3, 4, 5],
        nested: {
          x: function (d) { return d; },
          y: 45,
          nested: {
            x: function (d) { return d; },
            y: 34,
            arr: [11, 12, 13, 14, 15]
          },
          arr: [6, 7, 8, 9, 10]
        }
      };
      objectCopy = deepCopy(object, {});
    });

    afterEach(function () {
      objectCopy = null;
    });

    it("should be a function", function () {
      chai.assert.isFunction(deepCopy);
    });

    it("should return a copy of the object", function () {
      chai.assert.deepEqual(object, objectCopy);
    });

    it("should return a stand alone copy", function () {
      object.y = 1;
      object.arr = [16, 17, 18, 19, 20];
      chai.assert.notDeepEqual(object, objectCopy);
    });
  });
});