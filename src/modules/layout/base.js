define(function (require) {
  var d3 = require("d3");

  return function format() {
    var type = "rows"; // available types: 'rows', 'columns', 'grid'
    var size = [500, 500]; // [width, height]
    var rowScale = d3.scale.linear();
    var columnScale = d3.scale.linear();
    var numOfCols = 0;

    function formatType(length, type, cols) {
      var output = {};

      switch (type) {
        case "grid":
          output.rows = cols ? Math.ceil(length / cols) :
            Math.round(Math.sqrt(length));
          output.columns = cols ? cols : Math.ceil(Math.sqrt(length));
          break;

        case "columns":
          output.rows = 1;
          output.columns = length;
          break;

        default:
          output.rows = length;
          output.columns = 1;
          break;
      }

      return output;
    }

    function layout(data) {
      var format = formatType(data.length, type, numOfCols);
      var rows = format.rows;
      var columns = format.columns;
      var cellWidth = size[0] / columns;
      var cellHeight = size[1] / rows;
      var cell = 0;

      rowScale.domain([0, rows]).range([0, size[1]]);
      columnScale.domain([0, columns]).range([0, size[0]]);

      d3.range(rows).forEach(function (row) {
        d3.range(columns).forEach(function (col) {
          if (!data[cell]) { return; }

          data[cell].dx = columnScale(col);
          data[cell].dy = rowScale(row);
          data[cell].height = cellHeight;
          data[cell].width = cellWidth;
          cell++;
        });
      });

      return data;
    }

    // Public API
    layout.type = function (_) {
      if (!arguments.length) { return type; }
      type = _;
      return layout;
    };

    layout.columns = function (_) {
      if (!arguments.length) { return numOfCols; }
      numOfCols = _;
      return layout;
    };

    layout.size = function (_) {
      if (!arguments.length) { return size; }
      size = _;
      return layout;
    };

    return layout;
  };
});
