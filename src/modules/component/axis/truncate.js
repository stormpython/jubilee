define(function (require) {
  var d3 = require("d3");

  return function truncate() {
    // Private variables
    var maxCharLength = 10;

    function component(text) {
      text.each(function () {
        var txt = d3.select(this);
        var labelCharLength = txt.text().length;

        // Shorten and append ...
        // Subtract 3 from maxCharLength to make room for "..."
        if (labelCharLength > maxCharLength) {
          var truncatedLabel = txt.text().slice(0, maxCharLength - 3) + "...";
          d3.select(this).text(truncatedLabel);
        }
      });
    }

    // Public API
    component.maxCharLength = function (_) {
      if (!arguments.length) { return maxCharLength; }
      maxCharLength = typeof _ !== "number" ? maxCharLength : _;
      return component;
    };

    return component;
  };
});
