define(function (require) {
  return {
    version: "0.1.0",
    charts: {
      line: require("src/modules/charts/line"),
      area: require("src/modules/charts/area"),
      pie: require("src/modules/charts/pie"),
      sunburst: require("src/modules/charts/sunburst"),
      dendrogram: require("src/modules/charts/dendrogram"),
      treemap: require("src/modules/charts/treemap"),
      histogram: require("src/modules/charts/histogram")
    },
    maps: {},
    components: {
      axis: {},
      legend: {},
      scales: {},
      shapes: {
        circles: require("src/modules/components/shapes/circles")
      },
      tooltip: {}
    }
  };
});