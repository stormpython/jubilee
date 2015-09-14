define(function (require) {
  return {
    chart: {
      boxplot: require("src/modules/chart/boxplot"),
      dendrogram: require("src/modules/chart/dendrogram"),
      heatmap: require("src/modules/chart/heatmap"),
      pie: require("src/modules/chart/pie"),
      series: require("src/modules/chart/series"),
      sunburst: require("src/modules/chart/sunburst"),
      treemap: require("src/modules/chart/treemap")
    },
    layout: {
      base: require("src/modules/layout/base"),
      box: require("src/modules/layout/box"),
      grid: require("src/modules/layout/grid")
    },
    axis: {
      rotate: require("src/modules/component/axis/rotate"),
      truncate: require("src/modules/component/axis/truncate")
    },
    component: {
      area: require("src/modules/component/area"),
      axis: require("src/modules/component/axis/axis"),
      bars: require("src/modules/component/bars"),
      boxplot: require("src/modules/component/boxplot"),
      brush: require("src/modules/component/events/brush"),
      events: require("src/modules/component/events/events"),
      line: require("src/modules/component/line"),
      points: require("src/modules/component/points")
    },
    svg: {
      circle: require("src/modules/element/svg/circle"),
      clipPath: require("src/modules/element/svg/clipPath"),
      ellipse: require("src/modules/element/svg/ellipse"),
      image: require("src/modules/element/svg/image"),
      line: require("src/modules/element/svg/line"),
      path: require("src/modules/element/svg/path"),
      rect: require("src/modules/element/svg/rect"),
      text: require("src/modules/element/svg/text")
    },
    canvas: {
      rect: require("src/modules/element/canvas/rect")
    },
    builder: require("builder"),
    functor: require("functor"),
    valuator: require("valuator")
  };
});
