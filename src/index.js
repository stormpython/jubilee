define(function (require) {
  return {
    version: "0.0.0",
    charts: {
      line: require("modules/charts/line"),
      area: require("modules/charts/area"),
      pie: require("modules/charts/pie"),
      histogram: require("modules/charts/histogram")
    },
    components: {
      axis: {},
      legend: {},
      scales: {},
      shapes: {
        circles: require("modules/components/shapes/circles")
      },
      tooltip: {}
    }
  };
});