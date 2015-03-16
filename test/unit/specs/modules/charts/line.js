define(function (require) {
  describe("Line Chart Tests", function () {
    var lineChart = require("src/modules/charts/line");
    var fixture = require("fixtures/fixture");
    var isFunction = (typeof lineChart === "function");
    var myChart = lineChart();

    beforeEach(function () {
      fixture;
    });

    afterEach(function () {
      fixture.remove();
    });

    it("should be a function", function () {
      chai.assert.equal(isFunction, true);
    });

    describe("width API", function () {
      var defaultWidth = 690;
      var newWidth = 960;

      it("should return the default width", function () {
        chai.assert.equal(myChart.width(), defaultWidth);
      });

      it("should set the new width", function () {
        // Assign new value to the width API
        myChart.width(newWidth);
        chai.assert.equal(myChart.width(), newWidth);
      });
    });

    describe("height API", function () {
      var defaultHeight = 80;
      var newHeight = 500;

      it("should return the default height", function () {
        chai.assert.equal(myChart.height(), defaultHeight);
      });

      it("should set the new height", function () {
        // Assign new value to the height API
        myChart.height(newHeight);
        chai.assert.equal(myChart.height(), newHeight);
      });
    });

    describe("color API", function () {
      var isFunction = (typeof myChart.color() === "function");
      var newColor = "new color api";

      it("should be a function", function () {
        chai.assert.equal(isFunction, true);
      });

      it("should set the new color", function () {
        myChart.color(newColor);
        chai.assert.equal(myChart.color(), newColor);
      });
    });

    describe("x API", function () {
      var isFunction = (typeof myChart.x() === "function");
      var newX = function (d) { return d.value; };

      it("should be a function", function () {
        chai.assert.equal(isFunction, true);
      });

      it("should set the new x value", function () {
        myChart.x(newX);
        chai.assert.equal(myChart.x().toString(), newX.toString());
      });
    });

    describe("y API", function () {
      var isFunction = (typeof myChart.y() === "function");
      var newY = function (d) { return d.value; };

      it("should be a function", function () {
        chai.assert.equal(isFunction, true);
      });

      it("should set the new x value", function () {
        myChart.y(newY);
        chai.assert.equal(myChart.y().toString(), newY.toString());
      });
    });

  });
});
