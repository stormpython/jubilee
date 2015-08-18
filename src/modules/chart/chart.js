define(function (require) {
  var d3 = require("d3");
  var addEventListener = require("src/modules/helpers/add_event_listener");
  var deepCopy = require("src/modules/helpers/deep_copy");
  var removeEventListener = require("src/modules/helpers/remove_event_listener");
  var marginOptions = require("src/modules/helpers/options/margin");
  var marginAPI = require("src/modules/helpers/api/margin");

  return function God() {
    if (!(this instanceof God)) {
      return new God();
    }

    // Chart options
    var margin = deepCopy(marginOptions, {});
    var width = 760;
    var height = 120;
    var color = d3.scale.category20c();
    var accessor = function (d) { return d; };
    var xValue = function (d) { return d.x; };
    var yValue = function (d) { return d.y; };
    var listeners = {};

    // Public API
    this.margin = function (_) {
      if (!arguments.length) { return margin; }
      margin = marginAPI(_, margin);
      return this;
    };

    this.width = function (_) {
      if (!arguments.length) { return width; }
      width = _;
      return this;
    };

    this.height = function (_) {
      if (!arguments.length) { return height; }
      height = _;
      return this;
    };

    this.color = function (_) {
      if (!arguments.length) { return color; }
      color = _;
      return this;
    };

    this.accessor = function (_) {
      if (!arguments.length) { return accessor; }
      accessor = _;
      return this;
    };

    this.x = function (_) {
      if (!arguments.length) { return xValue; }
      xValue = _;
      return this;
    };

    this.y = function (_) {
      if (!arguments.length) { return yValue; }
      yValue = _;
      return this;
    };

    this.listeners = function (_) {
      if (!arguments.length) { return listeners; }
      listeners = _;
      return this;
    };

    this.on = addEventListener(this);

    this.off = removeEventListener(this);

    return this;
  };
});
