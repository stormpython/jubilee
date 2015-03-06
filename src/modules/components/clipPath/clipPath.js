define(function (require) {
  var d3 = require("d3");

  return function clipPath() {
    var id = "uniqueID";
    var x = null;
    var y = null;
    var width = null;
    var height = null;

    function component(selection) {
      selection.each(function () {
        return d3.select("this")
          .attr("clip-path", "url(#" + id + ")")
          .append("clipPath")
          .attr("id", id)
          .append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("width", width)
          .attr("height", height);
      });
    }

    component.id = function (_) {
      if (!arguments.length) { return id; }
      id = _;
      return component;
    };

    component.x = function (_) {
      if (!arguments.length) { return x; }
      x = _;
      return component;
    };

    component.y = function (_) {
      if (!arguments.length) { return y; }
      y = _;
      return component;
    };

    component.width = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return component;
    };

    component.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return component;
    };

    return component;
  };
});