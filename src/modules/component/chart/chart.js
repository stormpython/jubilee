define(function (require) {
  var d3 = require("d3");

  return function chart() {
    var gClass = "layer";
    var chartClass = "chart";
    var transform = null;
    var datum = null;
    var call = null;

    function component(selection) {
      selection.each(function (data, i) {
        var g = d3.select(this)
          .data(data, function (d) { return d; })
          .append("g")
          .attr("class", gClass);

        g.selectAll("g")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", chartClass)
          .attr("transform", transform)
          .datum(datum)
          .call(call);
      });
    }

    component.gClass = function (_) {
      if (!arguments.length) { return gClass; }
      gClass = _;
      return component;
    };

    component.chartClass = function (_) {
      if (!arguments.length) { return chartClass; }
      chartClass = _;
      return component;
    };

    component.transform = function (_) {
      if (!arguments.length) { return transform; }
      transform = _;
      return component;
    };

    component.datum = function (_) {
      if (!arguments.length) { return datum; }
      datum = _;
      return component;
    };

    component.call = function (_) {
      if (!arguments.length) { return call; }
      call = _;
      return component;
    };

    return component;
  };
});