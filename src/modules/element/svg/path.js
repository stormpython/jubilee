define(function (require) {
  var d3 = require("d3");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var eventOptions = require("src/modules/helpers/options/events");
  var eventAPI = require("src/modules/helpers/api/events");
  var attachEvents = require("src/modules/helpers/attach_events");

  return function path() {
    var pathGenerator = null;
    var color = d3.scale.category10();
    var accessor = function (d) { return d; };
    var values = null;

    // Options
    var cssClass = "path";
    var transform = "translate(0,0)";
    var fill = "none";
    var stroke = function (d, i) { return color(i); };
    var strokeWidth = 1;
    var opacity = null;
    var events = deepCopy(eventOptions, {});

    function element(selection) {
      selection.each(function (data, index) {
        var pathEvents = attachEvents(events);

        var path = d3.select(this).selectAll("paths")
          .data(values ? values.map(accessor) : accessor);

        path.exit().remove();

        path.enter().append("path");

        path
          .attr("transform", transform)
          .attr("class", cssClass)
          .attr("fill", fill)
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("d", pathGenerator)
          .style("opacity", opacity);

        path.call(pathEvents);
      });
    }

    element.data = function (_) {
      if (!arguments.length) { return values; }
      values = _;
      return element;
    };

    element.pathGenerator = function (_) {
      if (!arguments.length) { return pathGenerator; }
      pathGenerator = _;
      return element;
    };

    element.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return element;
    };

    element.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return element;
    };

    element.cssClass = function (_) {
      if (!arguments.length) { return cssClass; }
      cssClass = _;
      return element;
    };

    element.transform = function (_) {
      if (!arguments.length) { return transform; }
      transform = _;
      return element;
    };

    element.fill = function (_) {
      if (!arguments.length) { return fill; }
      fill = _;
      return element;
    };

    element.opacity = function (_) {
      if (!arguments.length) { return opacity; }
      opacity = _;
      return element;
    };

    element.stroke = function (_) {
      if (!arguments.length) { return stroke; }
      stroke = _;
      return element;
    };

    element.strokeWidth = function (_) {
      if (!arguments.length) { return strokeWidth; }
      strokeWidth = _;
      return element;
    };

    element.events = function (_) {
      if (!arguments.length) { return events; }
      events = eventAPI(_, events);
      return element;
    };

    return element;
  };
});
