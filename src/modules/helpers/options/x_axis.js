define(function () {
  return function xAxis() {
    return {
      show: true,
      class: "x axis",
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
          anchor: "middle",
          x: 0,
          y: 9,
          dx: "",
          dy: ".71em"
        }
      },
      title: {
        class: "axis title",
        x: 6,
        y: 6,
        dx: "",
        dy: ".71em",
        anchor: "middle",
        text: ""
      }
    };
  };
});