define(function (require) {
  describe("Component: Axis tests", function () {
    var d3 = require("d3");
    var axisFunction = require("src/modules/component/axis");
    var d3fixture = require("fixtures/fixture");
    var remove = require("fixtures/remove");
    var fixture;
    var axis;

    beforeEach(function () {
      fixture = d3fixture;
      axis = axisFunction();
    });

    afterEach(function () {
      remove(fixture);
    });

    it("should return a function", function () {
      chai.assert.isFunction(axis);
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

    describe("orient API", function () {
      var orient = "bottom";
      var newOrient = "right";

      beforeEach(function () {
        axis.orient(orient);
      });

      it("should return the orient", function () {
        chai.assert.equal(axis.orient(), orient);
      });

      it("should set the axis orient", function () {
        axis.orient(newOrient);
        chai.assert.equal(axis.orient(), newOrient);
      });
    });

    describe("tick API", function () {
      var tick = {};

      it("should return the tick object", function () {
        chai.assert.isObject(axis.tick());
        chai.assert.property(axis.tick(), "number");
        chai.assert.property(axis.tick(), "text");
        chai.assert.property(axis.tick(), "values");
        chai.assert.property(axis.tick(), "format");
      });

      it("should set tick properties", function () {
        var number = tick.number = 10;
        axis.tick(tick);
        chai.assert.equal(axis.tick().number, number);
      });
    });

    describe("gClass API", function () {
      var gClass = "axis";
      var newClass = "x axis";

      beforeEach(function () {
        axis.gClass(gClass);
      });

      it("should return the css class", function () {
        chai.assert.equal(axis.gClass(), gClass);
      });

      it("should set the css class property", function () {
        axis.gClass(newClass);
        chai.assert.equal(axis.gClass(), newClass);
      });
    });

    describe("transform API", function () {
      var transform = "translate(0,200)";
      var newTransform = "translate(0,400)";

      beforeEach(function () {
        axis.transform(transform);
      });

      it("should return the transform", function () {
        chai.assert.equal(axis.transform(), transform);
      });

      it("should set the transform property", function () {
        axis.transform(newTransform);
        chai.assert.equal(axis.transform(), newTransform);
      });
    });

    describe("title API", function () {
      var title = {};

      it("should return the title object", function () {
        chai.assert.isObject(axis.title());
        chai.assert.property(axis.title(), "dx");
        chai.assert.property(axis.title(), "dy");
        chai.assert.property(axis.title(), "transform");
        chai.assert.property(axis.title(), "anchor");
      });

      it("should set title properties", function () {
        var anchor = title.anchor = "start";
        axis.title(title);
        chai.assert.equal(axis.title().anchor, anchor);
      });
    });
  });
});