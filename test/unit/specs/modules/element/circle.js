define(function (require) {
  describe("Element: Circle SVG Tests", function () {
    var circle = require("src/modules/element/svg/circle");
    var d3fixture = require("fixtures/fixture");
    var data = require("fixtures/data_generator")(10);
    var remove = require("fixtures/remove");
    var removeChildren = require("fixtures/remove_children");
    var element = circle();
    var fixture;

    beforeEach(function () {
      fixture = d3fixture;

      fixture
        .datum(data)
        .call(element);
    });

    afterEach(function () {
      element = circle();
      remove(fixture);
    });

    it("should return a function", function () {
      var isFunction = (typeof element === "function");
      chai.assert.equal(isFunction, true);
    });

    describe("cx API", function () {
      var defaultCX;

      beforeEach(function () {
        removeChildren(fixture);
        defaultCX = function (d) { return d.x; };
        element.cx(defaultCX);
      });

      it("should get the property", function () {
        chai.assert.equal(element.cx(), defaultCX);
      });

      it("should set the property", function () {
        var newCX = function (d) { return d.cx; };
        element.cx(newCX);
        chai.assert.equal(element.cx(), newCX);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.cx(defaultCX); // Set new cx attribute
        fixture.call(element); // Redraw circles

        fixture.selectAll("circle")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("cx"), d.x);
          });
      });

    });

    describe("cy API", function () {
      var defaultCY;

      beforeEach(function () {
        removeChildren(fixture);
        defaultCY = function (d) { return d.y; };
        element.cy(defaultCY);
      });

      it("should get the property", function () {
        chai.assert.equal(element.cy(), defaultCY);
      });

      it("should set the property", function () {
        var newCY = function (d) { return d.cy; };
        element.cy(newCY);
        chai.assert.equal(element.cy(), newCY);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.cy(defaultCY); // Set new cy attribute
        fixture.call(element); // Redraw circles

        fixture.selectAll("circle")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("cy"), d.y);
          });
      });
    });

    describe("radius API", function () {
      var defaultRadius;

      beforeEach(function () {
        removeChildren(fixture);
        defaultRadius = 5;
        element.radius(defaultRadius);
      });

      it("should get the property", function () {
        chai.assert.equal(element.radius(), defaultRadius);
      });

      it("should set the property", function () {
        element.radius(10);
        chai.assert.equal(element.radius(), 10);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.radius(function (d) { return d.radius; }); // Set new radius attribute
        fixture.call(element); // Redraw circles

        fixture.selectAll("circle")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("r"), d.radius);
          });
      });
    });

    describe("class API", function () {
      var defaultClass;

      beforeEach(function () {
        removeChildren(fixture);
        defaultClass = "circles";
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
        element.class("dots"); // Set new class attribute
        fixture.call(element); // Redraw circles

        fixture.selectAll("circle")
          .each(function () {
            chai.assert.equal(this.getAttribute("class"), element.class());
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
        element.fill(defaultFill); // Set new fill attribute
        fixture.call(element); // Redraw circles

        fixture.selectAll("circle")
          .each(function () {
            chai.assert.equal(this.getAttribute("fill"), element.fill());
          });
      });
    });

    describe("stroke API", function () {
      var defaultStroke = "#0000FF";

      beforeEach(function () {
        removeChildren(fixture);
        element.stroke(defaultStroke);
      });

      it("should get the property", function () {
        chai.assert.equal(element.stroke(), defaultStroke);
      });

      it("should set the property", function () {
        var newStroke = "#FF0000";
        element.stroke(newStroke);
        chai.assert.equal(element.stroke(), newStroke);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.stroke(defaultStroke); // Set new stroke attribute
        fixture.call(element); // Redraw circles

        fixture.selectAll("circle")
          .each(function () {
            chai.assert.equal(this.getAttribute("stroke"), element.stroke());
          });
      });
    });

    describe("strokeWidth API", function () {
      var defaultStrokeWidth = 2;

      beforeEach(function () {
        removeChildren(fixture);
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
        element.strokeWidth(defaultStrokeWidth); // Set new stroke-width attribute
        fixture.call(element); // Redraw circles

        fixture.selectAll("circle")
          .each(function () {
            chai.assert.equal(this.getAttribute("stroke-width"), element.strokeWidth());
          });
      });
    });

    describe("opacity API", function () {
      var defaultOpacity = 1;

      beforeEach(function () {
        removeChildren(fixture);
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
        element.opacity(defaultOpacity); // Set new opacity attribute
        fixture.call(element); // Redraw circles

        fixture.selectAll("circle")
          .each(function () {
            chai.assert.equal(this.style.opacity, element.opacity());
          });
      });
    });
  });
});
