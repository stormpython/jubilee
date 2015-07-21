define(function (require) {
  describe("Component: Events tests", function () {
    var eventsFunction = require("src/modules/component/events");
    var d3fixture = require("fixtures/fixture");
    var totalListenerCount;
    var listeners;
    var fixture;
    var events;

    beforeEach(function () {
      fixture = d3fixture;
      events = eventsFunction();
      listeners = {
        click: [function (e) { console.log(e); }],
        brush: [function (brush) { return brush.extent(); }],
        mouseover: [function (e, d) { return d; }]
      };
      totalListenerCount = 3;
    });

    afterEach(function () {
      fixture.call(events.removeAllListeners());
      fixture = null;
    });

    describe("listeners API", function () {
      it("should return the listeners object", function () {
        chai.assert.deepEqual(events.listeners(), {});
      });

      it("should set the listeners object", function () {
        events.listeners(listeners); // Add listeners
        chai.assert.deepEqual(events.listeners(), listeners);
      });
    });

    describe("removeAllListeners API", function () {
      beforeEach(function () {
        events.listeners(listeners);
      });

      it("should remove all listeners", function () {
        events.removeAllListeners();
        chai.assert.deepEqual(events.listeners(), {});
      });
    });

    describe("listenerCount API", function () {
      beforeEach(function () {
        events.listeners(listeners);
      });

      it("should return a count of listeners", function () {
        var clickCount = events.listenerCount("click");
        var mouseoutCount = events.listenerCount("mouseout");
        var totalCount = events.listenerCount();

        chai.assert.equal(clickCount, listeners.click.length);
        chai.assert.equal(mouseoutCount, 0);
        chai.assert.equal(totalCount, totalListenerCount);
      });

      it("should return 0 when empty listeners object", function () {
        var totalCount;
        events.listeners({});
        totalCount = events.listenerCount();

        chai.assert.equal(totalCount, 0);
      });
    });

    describe("activeEvents API", function () {
      beforeEach(function () {
        listeners.brush = [];
        events.listeners(listeners);
      });

      it("should return only events with listeners", function () {
        var activeEventArray = ["click", "mouseover"];
        var activeEvents = events.activeEvents();
        chai.assert.deepEqual(activeEvents, activeEventArray);
      });
    });

    describe("on API", function () {
      beforeEach(function () {
        events.on("mouseout", function (e) {
          return e;
        });
        fixture.call(events);
      });

      it("should add event type and listener(s)", function () {
        chai.assert.property(events.listeners(), "mouseout");
      });

      it("should add listeners to DOM", function () {
        var element = fixture.node();
        chai.assert.property(element, "__onmouseout");
      });
    });

    describe("off API", function () {
      beforeEach(function () {
        events.off("brush");
        fixture.call(events);
      });

      it("should remove listeners", function () {
        chai.assert.notProperty(events.listeners(), "brush");
      });

      it("should remove listeners from DOM", function () {
        var element = fixture.node();
        chai.assert.notProperty(element, "__onbrush");
      });
    });

    describe("DOM Listeners", function () {
      beforeEach(function () {
        events.listeners(listeners);
        fixture.call(events);
      });

      it("should add listeners to DOM", function () {
        var element = fixture.node();
        chai.assert.property(element, "__onbrush");
        chai.assert.property(element, "__onclick");
        chai.assert.property(element, "__onmouseover");
      });

      it("should remove listeners from DOM", function () {
        listeners.brush = [];
        listeners.click = null;
        fixture.call(events.listeners(listeners));
        var element = fixture.node();

        chai.assert.notProperty(element, "__onbrush");
        chai.assert.notProperty(element, "__onclick");
      });
    });
  });
});