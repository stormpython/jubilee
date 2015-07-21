define(function (require) {
  var d3 = require("d3");

  return function grid() {
    var gridSize = [500, 500];
    var rowScale = d3.scale.linear();
    var columnScale = d3.scale.linear();

    function layout(data) {
      var rows = Math.ceil(Math.sqrt(data.length));
      var columns = rows;
      var gridCellWidth = gridSize[0] / columns;
      var gridCellHeight = gridSize[1] / rows;
      var cell = 0;

      rowScale.domain([0, rows]).range([0, gridSize[1]]);
      columnScale.domain([0, columns]).range([0, gridSize[0]]);

      d3.range(rows).forEach(function (row) {
        d3.range(columns).forEach(function (col) {
          if (!data[cell]) { return; }

          data[cell].dx = columnScale(col);
          data[cell].dy = rowScale(row);
          data[cell].height = gridCellHeight;
          data[cell].width = gridCellWidth;
          cell++;
        });
      });

      return data;
    }

    layout.size = function (_) {
      if (!arguments.length) { return gridSize; }
      gridSize = _;
      return layout;
    };

    return layout;
  };
});