define(function (require) {
  describe("Chart: Line Tests", function () {
    var lineChart = require("src/modules/chart/line");
    var d3fixture = require("fixtures/fixture");
    var remove = require("fixtures/remove");
    var myChart = lineChart();
    var fixture;

    beforeEach(function () {
      fixture = d3fixture;
    });

    afterEach(function () {
      remove(fixture);
    });

    it("should be a function", function () {
      chai.assert.isFunction(myChart);
    });

    describe("width API", function () {
      var defaultWidth = 760;
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
      var defaultHeight = 120;
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

      it("should set the new y value", function () {
        myChart.y(newY);
        chai.assert.equal(myChart.y().toString(), newY.toString());
      });
    });
  });
});
