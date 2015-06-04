define(function (require) {
  var d3 = require("d3");

  return d3.select("body")
    .append("div")
    .attr("class", "chart")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);
});
