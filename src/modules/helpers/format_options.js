define(function () {
  return function (length, type) {
    var output = {};

    switch (type) {
      case "grid":
        output.rows = Math.ceil(Math.sqrt(length));
        output.columns = output.rows;
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
  };
});