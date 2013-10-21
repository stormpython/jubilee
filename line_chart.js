/* lineChart script */

Charts.margin = {top: 20, right: 20, bottom: 30, left: 50};
Charts.width = 960;
Charts.height = 500;

var parseDate = d3.time.format("%d-%b-%y").parse;

d3.tsv("data.tsv", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });
  console.log(data);

  Charts.lineChart(data, "date", "close");
});

