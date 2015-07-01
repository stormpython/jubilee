define(function (require) {
  var d3 = require("d3");
  var getFormat = require("src/modules/helpers/format_options");

  return function rows() {
    var type = "rows"; // type: 'rows', 'columns', 'grid'
    var size = [500, 500]; // [width, height]
    var rowScale = d3.scale.linear();
    var columnScale = d3.scale.linear();

    function layout(data) {
      var format = getFormat(data.length, type);
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

    layout.size = function (_) {
      if (!arguments.length) { return size; }
      size = _;
      return layout;
    };

    return layout;
  };
});
