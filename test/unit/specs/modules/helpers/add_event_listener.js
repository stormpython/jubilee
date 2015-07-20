define(function (require) {
  describe("addEventListener tests", function () {
    var addEventListener = require("src/modules/helpers/add_event_listener");
    var chart;
    var addListener;

    beforeEach(function () {
      chart = function () {};
      chart.listeners = {};
      addListener = addEventListener(chart.listeners, chart);
    });

    afterEach(function () {
      chart.listeners = {};
    });

    it("should return a function", function () {
      chai.assert.isFunction(addListener);
    });

    it("should add an event type and listener", function () {
      var clickFunction = function (e) { return e; };
      addListener("click", clickFunction);

      chai.assert.equal(chart.listeners.click instanceof Array, true);
      chai.assert.equal(chart.listeners.click[0], clickFunction);
    });

    it("should add an event listener when event type is null", function () {
      var clickFunction = function (e) { return e; };
      chart.listeners.click = null;
      addListener("click", clickFunction);

      chai.assert.equal(chart.listeners.click instanceof Array, true);
      chai.assert.equal(chart.listeners.click[0], clickFunction);
    });

    it("should return an array of listeners", function () {
      var brushFunction = function (e) { return e; };
      addListener("brush", brushFunction);

      chai.assert.equal(addListener("brush") instanceof Array, true);
      chai.assert.equal(addListener("brush").length, chart.listeners.brush.length);
    });
  });
});