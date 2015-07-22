define(function (require) {
  describe("removeEventListener tests", function () {
    var removeEventListener = require("src/modules/helpers/remove_event_listener");
    var events = require("src/modules/component/events");
    var clickFunction1 = function () { console.log("click function 1"); };
    var clickFunction2 = function () { console.log("click function 2"); };
    var chart;
    var removeListener;

    beforeEach(function () {
      chart = events();
      chart.listeners({
        click: [
          clickFunction1,
          clickFunction2
        ]
      });
      removeListener = removeEventListener(chart);
    });

    afterEach(function () {
      chart.listeners({});
    });

    it("should return a function", function () {
      chai.assert.isFunction(removeListener);
    });

    it("should set event types to null", function () {
      removeListener("click");
      chai.assert.equal(chart.listeners().click, null);
    });

    it("should simply return", function () {
      var brushFunction = function (e) { console.log(e); };
      removeListener("brush", brushFunction);
      chai.assert.isUndefined(chart.listeners().brush);
    });

    it("should remove event listener from listeners array", function () {
      removeListener("click", clickFunction2);
      chai.assert.equal(chart.listeners().click.length, 1);
      chai.assert.equal(chart.listeners().click[0], clickFunction1);
    });
  });
});