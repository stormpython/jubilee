define(function () {
  return {
    show: true,
    gClass: "y axis",
    transform: "translate(0,0)",
    tick: {
      number: 10,
      values: null,
      size: 6,
      padding: 3,
      format: null,
      rotate: 0,
      innerTickSize: 6,
      outerTickSize: 6,
      text: {
        anchor: "end",
        x: -9,
        y: 0,
        dx: "",
        dy: ".32em"
      }
    },
    title: {
      titleClass: "axis title",
      x: 0,
      y: -40,
      dx: "",
      dy: ".71em",
      anchor: "middle",
      rotate: 270,
      transform: "translate(0,0)",
      text: ""
    }
  };
});