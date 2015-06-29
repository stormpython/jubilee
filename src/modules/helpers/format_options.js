define(function () {
  return function (data) {
    return {
      rows: {
        rows: data.length,
        columns: 1
      },
      columns: {
        rows: 1,
        columns: data.length
      },
      grid: {
        rows: Math.ceil(Math.sqrt(data.length)),
        columns: Math.ceil(Math.sqrt(data.length))
      }
    };
  };
});