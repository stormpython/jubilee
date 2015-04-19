define(function (require) {
  var d3 = require("d3");

  return function box() {
    var values = function (d) { return d.values; };
    var accessor = function (d) { return d; };

    function layout(data) {
      data.forEach(function (d, i) {
        var numbers = accessor.call(this, values.call(this, d, i));

        d.median = d3.median(numbers);
        d.q1 = d3.quantile(numbers, 0.25);
        d.q3 = d3.quantile(numbers, 0.75);
        d.max = d3.max(numbers);
        d.min = d3.min(numbers);
      });

      return data;
    }

    layout.values = function (_) {
      if (!arguments.length) { return values; }
      values = _;
      return layout;
    };

    layout.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return layout;
    };

    return layout;
  };
});