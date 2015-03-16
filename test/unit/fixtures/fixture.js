define(function (require) {
  var d3 = require("d3");

  return d3.select("body")
    .append("div")
    .attr("class", "chart");
});
