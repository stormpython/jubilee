define(function (require) {
  describe("Layout: grid tests", function () {
    var gridFunction = require("src/modules/layout/grid");
    var data = [{}, {}, {}];
    var size = [625, 625];
    var grid;
    var gridData;

    beforeEach(function () {
      grid = gridFunction().size(size);
      gridData = grid(data);
    });

    it("should return a function", function () {
      chai.assert.isFunction(grid);
    });

    it("should create grids", function () {
      var width = size[0] / Math.ceil(Math.sqrt(data.length));
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