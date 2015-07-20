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

    it("should return a copy of the object", function () {
      chai.assert.equal(object.x, objectCopy.x);
      chai.assert.equal(object.nested.x, objectCopy.nested.x);
      chai.assert.equal(object.nested.y, objectCopy.nested.y);
      chai.assert.equal(object.nested.arr[1], objectCopy.nested.arr[1]);
      chai.assert.equal(object.nested.nested.x, objectCopy.nested.nested.x);
      chai.assert.equal(object.arr[0], objectCopy.arr[0]);
    });

    it("should return a stand alone copy", function () {
      object.y = 1;
      object.arr = [16, 17, 18, 19, 20];

      chai.assert.notEqual(object.y, objectCopy.y);
      chai.assert.notEqual(object.arr[0], objectCopy.arr[0]);
    });
  });
});