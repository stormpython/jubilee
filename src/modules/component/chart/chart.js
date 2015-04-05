define(function (require) {
  var d3 = require("d3");

  return function chart() {
    var gClass = "layer";
    var chartClass = "chart";
    var transform = null;
    var datum = null;
    var draw = null;

    function component(selection) {
      selection.each(function () {
        var g = d3.select(this)
          .data(function (d) { return d; })
          .append("g")
          .attr("class", gClass);

        g.selectAll("g")
          .data(function (d) { return d; })
          .enter().append("g")
          .attr("class", chartClass)
          .attr("transform", transform)
          .datum(datum)
          .call(draw);
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

    component.draw = function (_) {
      if (!arguments.length) { return draw; }
      draw = _;
      return component;
    };

    return component;
  };
});