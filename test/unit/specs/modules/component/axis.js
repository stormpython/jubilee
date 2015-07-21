define(function (require) {
  describe("Component: Axis tests", function () {
    var d3 = require("d3");
    var axisFunction = require("src/modules/component/axis");
    var d3fixture = require("fixtures/fixture");
    var removeChildElements = require("fixtures/remove_children");
    var fixture;
    var axis;

    beforeEach(function () {
      fixture = d3fixture;
      axis = axisFunction();
    });

    afterEach(function () {
      removeChildElements(fixture);
      fixture = null;
    });

    describe("scale API", function () {
      var linearScale = d3.scale.linear();
      var ordinalScale = d3.scale.ordinal();

      beforeEach(function () {
        axis.scale(linearScale);
      });

      it("should return the scale", function () {
        chai.assert.equal(axis.scale(), linearScale);
      });

      it("should set the axis scale", function () {
        axis.scale(ordinalScale);
        chai.assert.equal(axis.scale(), ordinalScale);
      });
    });
  });
});