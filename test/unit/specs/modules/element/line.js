define(function (require) {
  describe("Element: Line SVG Tests", function () {
    var line = require("src/modules/element/svg/line");
    var d3fixture = require("fixtures/fixture");
    var data = require("fixtures/data_generator")(10);
    var remove = require("fixtures/remove");
    var removeChildren = require("fixtures/remove_children");
    var element = line();
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

    describe("x1 API", function () {
      var defaultX1;

      beforeEach(function () {
        removeChildren(fixture);
        defaultX1 = function (d) { return d.x; };
        element.x1(defaultX1);
      });

      it("should get the property", function () {
        chai.assert.equal(element.x1(), defaultX1);
      });

      it("should set the property", function () {
        var newX1 = function (d) { return d.x1; };
        element.x1(newX1);
        chai.assert.equal(element.x1(), newX1);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.x1(defaultX1);
        fixture.call(element); // Redraw

        fixture.selectAll("line")
          .each(function (d, i) {
            chai.assert.equal(this.getAttribute("x1"), d.x);
          });
      });
    });

    describe("x2 API", function () {
      var defaultX2;

      beforeEach(function () {
        removeChildren(fixture);
        defaultX2 = function (d) { return d.x; };
        element.x2(defaultX2);
      });

      it("should get the property", function () {
        chai.assert.equal(element.x2(), defaultX2);
      });

      it("should set the property", function () {
        var newX2 = function (d) { return d.x2; };
        element.x2(newX2);
        chai.assert.equal(element.x2(), newX2);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.x2(defaultX2);
        fixture.call(element); // Redraw

        fixture.selectAll("line")
          .each(function (d, i) {
            chai.assert.equal(this.getAttribute("x2"), d.x);
          });
      });
    });

    describe("y1 API", function () {
      var defaultY1;

      beforeEach(function () {
        removeChildren(fixture);
        defaultY1 = function (d) { return d.y; };
        element.y1(defaultY1);
      });

      it("should get the property", function () {
        chai.assert.equal(element.y1(), defaultY1);
      });

      it("should set the property", function () {
        var newY1 = function (d) { return d.y1; };
        element.y1(newY1);
        chai.assert.equal(element.y1(), newY1);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.y1(defaultY1);
        fixture.call(element); // Redraw

        fixture.selectAll("line")
          .each(function (d, i) {
            chai.assert.equal(this.getAttribute("y1"), d.y);
          });
      });
    });

    describe("y2 API", function () {
      var defaultY2;

      beforeEach(function () {
        removeChildren(fixture);
        defaultY2 = function (d) { return d.y; };
        element.y2(defaultY2);
      });

      it("should get the property", function () {
        chai.assert.equal(element.y2(), defaultY2);
      });

      it("should set the property", function () {
        var newY2 = function (d) { return d.y2; };
        element.y2(newY2);
        chai.assert.equal(element.y2(), newY2);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.y2(defaultY2);
        fixture.call(element); // Redraw

        fixture.selectAll("line")
          .each(function (d, i) {
            chai.assert.equal(this.getAttribute("y2"), d.y);
          });
      });
    });

    describe("cssClass API", function () {
      var defaultClass;

      beforeEach(function () {
        removeChildren(fixture);
        defaultClass = "lines";
        element.cssClass(defaultClass);
      });

      it("should get the property", function () {
        chai.assert.equal(element.cssClass(), defaultClass);
      });

      it("should set the property", function () {
        var newClass = "edges";
        element.cssClass(newClass);
        chai.assert.equal(element.cssClass(), newClass);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.cssClass(defaultClass);
        fixture.call(element); // Redraw

        fixture.selectAll("line")
          .each(function () {
            chai.assert.equal(this.getAttribute("class"), element.cssClass());
          });
      });
    });

    describe("opacity API", function () {
      var defaultOpacity;

      beforeEach(function () {
        removeChildren(fixture);
        defaultOpacity = 1;
        element.opacity(defaultOpacity);
      });

      it("should get the property", function () {
        chai.assert.equal(element.opacity(), defaultOpacity);
      });

      it("should set the property", function () {
        var newOpacity = 0.5;
        element.opacity(newOpacity);
        chai.assert.equal(element.opacity(), newOpacity);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.opacity(defaultOpacity);
        fixture.call(element); // Redraw

        fixture.selectAll("line")
          .each(function () {
            chai.assert.equal(this.style.opacity, element.opacity());
          });
      });
    });

    describe("color API", function () {
      var defaultColor;

      beforeEach(function () {
        removeChildren(fixture);
        defaultColor = function () { return "#FF0000"; }; // must be a function
        element.color(defaultColor);
      });

      it("should get the property", function () {
        chai.assert.equal(element.color(), defaultColor);
      });

      it("should set the property", function () {
        var newColor = function () { return "#0000FF"; };
        element.color(newColor);
        chai.assert.equal(element.color(), newColor);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.color(defaultColor);
        fixture.call(element); // Redraw
        var color = element.color();

        fixture.selectAll("line")
          .each(function () {
            chai.assert.equal(this.getAttribute("stroke"), color());
          });
      });
    });

    describe("stroke API", function () {
      var defaultStroke;

      beforeEach(function () {
        removeChildren(fixture);
        defaultStroke = "#FF0000";
        element.stroke(defaultStroke);
      });

      it("should get the property", function () {
        chai.assert.equal(element.stroke(), defaultStroke);
      });

      it("should set the property", function () {
        var newStroke = "#0000FF";
        element.stroke(newStroke);
        chai.assert.equal(element.stroke(), newStroke);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.stroke(defaultStroke);
        fixture.call(element); // Redraw

        fixture.selectAll("line")
          .each(function () {
            chai.assert.equal(this.getAttribute("stroke"), element.stroke());
          });
      });
    });

    describe("strokeWidth API", function () {
      var defaultStrokeWidth;

      beforeEach(function () {
        removeChildren(fixture);
        defaultStrokeWidth = 2;
        element.strokeWidth(defaultStrokeWidth);
      });

      it("should get the property", function () {
        chai.assert.equal(element.strokeWidth(), defaultStrokeWidth);
      });

      it("should set the property", function () {
        var newStrokeWidth = 5;
        element.strokeWidth(newStrokeWidth);
        chai.assert.equal(element.strokeWidth(), newStrokeWidth);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.strokeWidth(defaultStrokeWidth);
        fixture.call(element); // Redraw

        fixture.selectAll("line")
          .each(function () {
            chai.assert.equal(this.getAttribute("stroke-width"), element.strokeWidth());
          });
      });
    });
  });
});
