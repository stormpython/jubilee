define(function (require) {
  var d3 = require("d3");

  return function split() {
    var splitBy = function (d) { return d; };
    var element = "div";
    var elementClass = function () { return "horizontal"; };
    var predicate = false;

    function layout(selection) {
      selection.each(function (data) {
        var elem = d3.select(this).data([data]);

        var elems = elem.selectAll("splits")
          .data(splitBy)
          .enter().append(element)
          .attr("class",  elementClass);

        if (predicate) {
          elems.call(split);
        }
      });
    }

    layout.splitBy = function (_) {
      if (!arguments.length) { return splitBy; }
      splitBy = _;
      return layout;
    };

    layout.element = function (_) {
      if (!arguments.length) { return element; }
      element = _;
      return layout;
    };

    layout.elementClass = function (_) {
      if (!arguments.length) { return elementClass; }
      elementClass = _;
      return layout;
    };

    layout.predicate = function (_) {
      if (!arguments.length) { return predicate; }
      predicate = _;
      return layout;
    };

    return layout;
  };
});