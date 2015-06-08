define(function (require) {
  var d3 = require("d3");

  return function image() {
    var x = function (d) { return d.x; };
    var y = function (d) { return d.y; };
    var values = null;
    var width = 10;
    var height = 10;
    var xlink = null;
    var preserveAspectRatio = null;

    // Options
    var cssClass = "image";

    function element(selection) {
      selection.each(function (data, i) {
        var images = d3.select(this).selectAll("image")
          .data(values ? values : data);

        // Exit
        images.exit().remove();

        // Enter
        images.enter().append("image");

        // Update
        images
          .attr("class", cssClass)
          .attr("x", x)
          .attr("y", y)
          .attr("width", width)
          .attr("height", height)
          .attr("xlink:href", xlink)
          .attr("preserveAspectRatio", preserveAspectRatio);
      });
    }

    element.data = function (_) {
      if (!arguments.length) { return values; }
      values = _;
      return element;
    };
    
    element.x = function (_) {
      if (!arguments.length) { return x; }
      x = _;
      return element;
    };

    element.y = function (_) {
      if (!arguments.length) { return y; }
      y = _;
      return element;
    };

    element.width = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return element;
    };

    element.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return element;
    };

    element.xlink = function (_) {
      if (!arguments.length) { return xlink; }
      xlink = _;
      return element;
    };

    element.preserveAspectRatio = function (_) {
      if (!arguments.length) { return preserveAspectRatio; }
      preserveAspectRatio = _;
      return element;
    };

    element.cssClass= function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
      return element;
    };

    return element;
  };
});
