define(function (require) {
  var d3 = require("d3");

  return function chart() {
    var gClass = "layer";
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
          .attr("transform", transform)
          .datum(datum)
          .call(draw);
      });
    }

    return component;
  };
});