define(function () {
  return function (data, type) {
    var output = {};
    var grid = Math.ceil(Math.sqrt(data.length));

    switch (type) {
      case "grid":
        output.rows = grid;
        output.columns = grid;
        break;

      case "columns":
        output.rows = 1;
        output.columns = data.length;
        break;

      default:
        output.rows = data.length;
        output.columns = 1;
        break;
    }

    return output;
  };
});