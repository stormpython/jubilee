define(function (require) {
  describe("Element: Text SVG Tests", function () {
    var text = require("src/modules/element/svg/text");
    var d3fixture = require("fixtures/fixture");
    var data = require("fixtures/data_generator")(10);
    var remove = require("fixtures/remove");
    var removeChildren = require("fixtures/remove_children");
    var element = text();
    var fixture;

    beforeEach(function () {
      fixture = d3fixture;

      fixture
        .datum(data)
        .call(element);
    });

    afterEach(function () {
      remove(fixture);
    });

    it("should return a function", function () {
      var isFunction = (typeof element === "function");
      chai.assert.equal(isFunction, true);
    });

    describe("x API", function () {
      var defaultX;

      beforeEach(function () {
        removeChildren(fixture);
        defaultX = function (d) { return d.x; };
        element.x(defaultX);
      });

      it("should get the property", function () {
        chai.assert.equal(element.x(), defaultX);
      });

      it("should set the property", function () {
        var newX = function (d) { return d.cx; };
        element.x(newX);
        chai.assert.equal(element.x(), newX);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.x(defaultX);
        fixture.call(element);

        fixture.selectAll("text")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("x"), d.x);
          });
      });

    });

    describe("y API", function () {
      var defaultY;

      beforeEach(function () {
        removeChildren(fixture);
        defaultY = function (d) { return d.y; };
        element.y(defaultY);
      });

      it("should get the property", function () {
        chai.assert.equal(element.y(), defaultY);
      });

      it("should set the property", function () {
        var newY = function (d) { return d.cy; };
        element.y(newY);
        chai.assert.equal(element.y(), newY);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.y(defaultY);
        fixture.call(element);

        fixture.selectAll("text")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("y"), d.y);
          });
      });
    });

    describe("dx API", function () {
      var defaultDX;

      beforeEach(function () {
        removeChildren(fixture);
        defaultDX = function (d) { return d.x; };
        element.dx(defaultDX);
      });

      it("should get the property", function () {
        chai.assert.equal(element.dx(), defaultDX);
      });

      it("should set the property", function () {
        var newDX = function (d) { return d.dx; };
        element.dx(newDX);
        chai.assert.equal(element.dx(), newDX);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.dx(defaultDX);
        fixture.call(element);

        fixture.selectAll("text")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("dx"), d.x);
          });
      });

    });

    describe("dy API", function () {
      var defaultDY;

      beforeEach(function () {
        removeChildren(fixture);
        defaultDY = function (d) { return d.y; };
        element.dy(defaultDY);
      });

      it("should get the property", function () {
        chai.assert.equal(element.dy(), defaultDY);
      });

      it("should set the property", function () {
        var newDY = function (d) { return d.dy; };
        element.dy(newDY);
        chai.assert.equal(element.dy(), newDY);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.dy(defaultDY);
        fixture.call(element);

        fixture.selectAll("text")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("dy"), d.y);
          });
      });
    });

    describe("class API", function () {
      var defaultClass;

      beforeEach(function () {
        removeChildren(fixture);
        defaultClass = "text";
        element.class(defaultClass);
      });

      it("should get the property", function () {
        chai.assert.equal(element.class(), defaultClass);
      });

      it("should set the property", function () {
        element.class("test");
        chai.assert.equal(element.class(), "test");
      });

      it("should set the proper value of the DOM attribute", function () {
        element.class("text");
        fixture.call(element);

        fixture.selectAll("text")
          .each(function () {
            chai.assert.equal(this.getAttribute("class"), element.class());
          });
      });
    });

    describe("transform API", function () {
      var defaultTransform;
      var newTransform;

      beforeEach(function () {
        removeChildren(fixture);
        defaultTransform = "translate(0,0)";
        newTransform = function () {
          return "rotate(45)";
        };
      });

      it("should get the property", function () {
        element.transform(defaultTransform);
        chai.assert.equal(element.transform(), defaultTransform);
      });

      it("should set the property", function () {
        element.transform(newTransform);
        chai.assert.equal(element.transform(), newTransform);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.transform(defaultTransform);
        fixture.call(element);

        fixture.selectAll("path")
          .each(function () {
            chai.assert.equal(this.getAttribute("transform"), defaultTransform);
          });
      });
    });

    describe("fill API", function () {
      var defaultFill = "#0000FF";

      beforeEach(function () {
        removeChildren(fixture);
        element.fill(defaultFill);
      });

      it("should get the property", function () {
        chai.assert.equal(element.fill(), defaultFill);
      });

      it("should set the property", function () {
        var newFill = "#FF0000";
        element.fill(newFill);
        chai.assert.equal(element.fill(), newFill);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.fill(defaultFill);
        fixture.call(element);

        fixture.selectAll("text")
          .each(function () {
            chai.assert.equal(this.getAttribute("fill"), element.fill());
          });
      });
    });

    describe("text API", function () {
      var defaultText = "value";

      beforeEach(function () {
        removeChildren(fixture);
        element.text(defaultText);
      });

      it("should get the property", function () {
        chai.assert.equal(element.text(), defaultText);
      });

      it("should set the property", function () {
        var newText = "new value";
        element.text(newText);
        chai.assert.equal(element.text(), newText);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.text(defaultText);
        fixture.call(element);

        fixture.selectAll("text")
          .each(function () {
            chai.assert.equal(this.innerHTML, element.text());
          });
      });
    });

    describe("anchor API", function () {
      var defaultAnchor = "middle";

      beforeEach(function () {
        removeChildren(fixture);
        element.anchor(defaultAnchor);
      });

      it("should get the property", function () {
        chai.assert.equal(element.anchor(), defaultAnchor);
      });

      it("should set the property", function () {
        var newAnchor = "start";
        element.anchor(newAnchor);
        chai.assert.equal(element.anchor(), newAnchor);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.anchor(defaultAnchor);
        fixture.call(element);

        fixture.selectAll("text")
          .each(function () {
            chai.assert.equal(this.style["text-anchor"], element.anchor());
          });
      });
    });
  });
});
