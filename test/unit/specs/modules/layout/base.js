define(function (require) {
  describe("Layout: base tests", function() {
    var base = require("src/modules/layout/base");
    var data = [{}, {}, {}];
    var size = [300, 300];

    describe("rows", function () {
      var rows;
      var rowsData;

      beforeEach(function () {
        rows = base().type("rows").size(size);
        rowsData = rows(data);
      });

      it("should be a function", function () {
        chai.assert.isFunction(rows);
      });

      it("should create rows", function () {
        var width = size[0];
        var height = size[1] / rowsData.length;

        rowsData.forEach(function (chart) {
          chai.assert.equal(chart.dx, 0);
          chai.assert.equal(chart.dy % height, 0);
          chai.assert.equal(chart.width, width);
          chai.assert.equal(chart.height, height);
        });
      });
    });

    describe("columns", function () {
      var cols;
      var colsData;

      beforeEach(function () {
        cols = base().type("columns").size(size);
        colsData = cols(data);
      });

      it("should be a function", function () {
        chai.assert.isFunction(cols);
      });

      it("should create columns", function () {
        var width = size[0] / colsData.length;
        var height = size[1];

        colsData.forEach(function (chart) {
          chai.assert.equal(chart.dx % width, 0);
          chai.assert.equal(chart.dy, 0);
          chai.assert.equal(chart.width, width);
          chai.assert.equal(chart.height, height);
        });
      });
    });

    describe("grid", function () {
      var grid;
      var gridData;

      beforeEach(function () {
        grid = base().type("grid").size(size);
        gridData = grid(data);
      });

      it("should be a function", function () {
        chai.assert.isFunction(grid);
      });

      it("should create grids", function () {
        var width = size[0] / Math.round(Math.sqrt(data.length));
        var height = size[1] / Math.ceil(Math.sqrt(data.length));

        gridData.forEach(function (chart) {
          chai.assert.equal(chart.dx % width, 0);
          chai.assert.equal(chart.dy % height, 0);
          chai.assert.equal(chart.width, width);
          chai.assert.equal(chart.height, height);
        });
      });
    });
  });
});