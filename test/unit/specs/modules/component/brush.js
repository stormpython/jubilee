define(function (require) {
  describe("Component: Brush tests", function () {
    var d3 = require("d3");
    var brushFunction = require("src/modules/component/brush");
    var d3fixture = require("fixtures/fixture");
    var remove = require("fixtures/remove");
    var fixture;
    var brush;

    beforeEach(function () {
      fixture = d3fixture;
      brush = brushFunction();

      fixture.call(brush);
    });

    afterEach(function () {
      remove(fixture);
    });

    it("should return a function", function () {
      chai.assert.isFunction(brush);
    });

    describe("margin API", function () {
      var margin;

      beforeEach(function () {
        margin = {top: 50, right: 0, bottom: 50, left: 0};
      });

      it("should return the margin", function () {
        chai.assert.isObject(brush.margin());
        chai.assert.property(brush.margin(), "top");
        chai.assert.property(brush.margin(), "right");
        chai.assert.property(brush.margin(), "bottom");
        chai.assert.property(brush.margin(), "left");
      });

      it("should set the margin", function () {
        brush.margin(margin);
        chai.assert.deepEqual(brush.margin(), margin);
      });
    });

    describe("width API", function () {
      var width = 340;
      var newWidth = 760;

      beforeEach(function () {
        brush.width(width);
      });

      it("should return the width", function () {
        chai.assert.equal(brush.width(), width);
      });

      it("should set the width", function () {
        brush.width(newWidth);
        chai.assert.equal(brush.width(), newWidth);
      });
    });

    describe("height API", function () {
      var height = 540;
      var newHeight = 360;

      beforeEach(function () {
        brush.height(height);
      });

      it("should return the height", function () {
        chai.assert.equal(brush.height(), height);
      });

      it("should set the height", function () {
        brush.height(newHeight);
        chai.assert.equal(brush.height(), newHeight);
      });
    });

    describe("opacity API", function () {
      var opacity = 0.8;
      var newOpacity = 0.5;

      beforeEach(function () {
        brush.opacity(opacity);
      });

      it("should return the opacity", function () {
        chai.assert.equal(brush.opacity(), opacity);
      });

      it("should set the opacity", function () {
        brush.opacity(newOpacity);
        chai.assert.equal(brush.opacity(), newOpacity);
      });
    });

    describe("cssClass API", function () {
      var cssClass = "brush";
      var newClass = "special-brush";

      beforeEach(function () {
        brush.cssClass(cssClass);
      });

      it("should return the css class", function () {
        chai.assert.equal(brush.cssClass(), cssClass);
      });

      it("should set the css class", function () {
        brush.cssClass(newClass);
        chai.assert.equal(brush.cssClass(), newClass);
      });
    });

    describe("xScale API", function () {
      var linearScale = d3.scale.linear();
      var timeScale = d3.time.scale();

      beforeEach(function () {
        brush.xScale(linearScale);
      });

      it("should return the xScale", function () {
        chai.assert.equal(brush.xScale(), linearScale);
      });

      it("should set the xScale", function () {
        brush.xScale(timeScale);
        chai.assert.equal(brush.xScale(), timeScale);
      });
    });

    describe("yScale API", function () {
      var linearScale = d3.scale.linear();
      var ordinalScale = d3.scale.ordinal();

      beforeEach(function () {
        brush.yScale(linearScale);
      });

      it("should return the yScale", function () {
        chai.assert.equal(brush.yScale(), linearScale);
      });

      it("should set the yScale", function () {
        brush.yScale(ordinalScale);
        chai.assert.equal(brush.yScale(), ordinalScale);
      });
    });

    describe("extent API", function () {
      var extent = [[0, 200], [0, 200]];
      var newExtent = [1, 10];

      beforeEach(function () {
        brush.extent(extent);
      });

      it("should return the extent", function () {
        chai.assert.deepEqual(brush.extent(), extent);
      });

      it("should set the extent", function () {
        brush.extent(newExtent);
        chai.assert.deepEqual(brush.extent(), newExtent);
      });
    });

    describe("clamp API", function () {
      var clamp = true;

      beforeEach(function () {
        brush.clamp(clamp);
      });

      it("should return a boolean", function () {
        chai.assert.isTrue(brush.clamp());
      });

      it("should set the clamp", function () {
        brush.clamp(false);
        chai.assert.isFalse(brush.clamp());
      });
    });

    describe("brushstart API", function () {
      it("should return listeners array", function () {
        chai.assert.deepEqual(brush.brushstart(), []);
      });

      it("should append listeners to the brushstart array", function () {
        var brushStart = function (e) { console.log(e); };
        brush.brushstart(brushStart);

        chai.assert.deepEqual(brush.brushstart(), [brushStart]);
      });
    });

    describe("brush API", function () {
      it("should return listeners array", function () {
        chai.assert.deepEqual(brush.brush(), []);
      });

      it("should append listeners to the brush array", function () {
        var brushCB = function (e) { console.log(e); };
        brush.brush(brushCB);

        chai.assert.deepEqual(brush.brush(), [brushCB]);
      });
    });

    describe("brushend API", function () {
      it("should return listeners array", function () {
        chai.assert.deepEqual(brush.brushend(), []);
      });

      it("should append listeners to the brushend array", function () {
        var brushend = function (e) { console.log(e); };
        brush.brushend(brushend);

        chai.assert.deepEqual(brush.brushend(), [brushend]);
      });
    });
  });
});