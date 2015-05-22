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
    map: {
      tile: require("src/modules/map/tile")
    },
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
      clipPath: require("src/modules/element/clipPath"),
      ellipse: require("src/modules/element/ellipse"),
      image: require("src/modules/element/image"),
      line: require("src/modules/element/line"),
      path: require("src/modules/element/path"),
      rect: require("src/modules/element/rect")
    }
  };
});
