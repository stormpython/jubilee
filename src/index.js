define(function (require) {
  return {
    version: "0.1.0",
    chart: {
      line: require("src/modules/chart/line"),
      area: require("src/modules/chart/area"),
      boxplot: require("src/modules/chart/boxplot"),
      pie: require("src/modules/chart/pie"),
      scatter : require("src/modules/chart/scatterplot"),
      sunburst: require("src/modules/chart/sunburst"),
      dendrogram: require("src/modules/chart/dendrogram"),
      treemap: require("src/modules/chart/treemap"),
      histogram: require("src/modules/chart/histogram"),
      xyzplot: require("src/modules/chart/xyzplot")
    },
    map: {},
    layout: {
      box: require("src/modules/layout/box"),
      grid: require("src/modules/layout/grid"),
      split: require("src/modules/layout/split")
    },
    component: {
      axis: require("src/modules/component/axis/axis"),
      chart: require("src/modules/component/chart/chart"),
      boxplot: require("src/modules/component/boxplot/boxplot")
    },
   element: {
      circle: require("src/modules/element/circle"),
      rect: require("src/modules/element/rect"),
      path: require("src/modules/element/path"),
      line: require("src/modules/element/line"),
      clipPath: require("src/modules/element/clipPath")
    }
  };
});
