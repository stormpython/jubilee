define(function (require) {
  describe("Rect SVG Tests", function () {
    var rect = require("src/modules/element/rect");
    var d3fixture = require("fixtures/fixture");
    var data = require("fixtures/data_generator")(10);
    var element = rect();
    var fixture;

    beforeEach(function () {
      fixture = d3fixture;

      fixture
        .datum(data)
        .call(element);
    });

    afterEach(function () {
      fixture.selectAll("*").remove();
      fixture = null;
    });

    it("should return a function", function () {
      var isFunction = (typeof element === "function");
      chai.assert.equal(isFunction, true);
    });

    describe("x API", function () {
      var defaultX;

      beforeEach(function () {
        defaultX = function (d) { return d.x; };
        element.x(defaultX);
      });

      it("should get the property", function () {
        chai.assert.equal(element.x(), defaultX);
      });

      it("should set the property", function () {
        var newX = function (d) { return d.rectX; };
        element.x(newX);
        chai.assert.equal(element.x(), newX);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.x(defaultX); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("x"), d.x);
          });
      });
    });

    describe("y API", function () {
      var defaultY;

      beforeEach(function () {
        defaultY = function (d) { return d.y; };
        element.y(defaultY);
      });

      it("should get the property", function () {
        chai.assert.equal(element.y(), defaultY);
      });

      it("should set the property", function () {
        var newY = function (d) { return d.rectY; };
        element.y(newY);
        chai.assert.equal(element.y(), newY);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.y(defaultY); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("y"), d.y);
          });
      });
    });

    describe("rx API", function () {
      var defaultRX;

      beforeEach(function () {
        defaultRX = 5;
        element.rx(defaultRX);
      });

      it("should get the property", function () {
        chai.assert.equal(element.rx(), defaultRX);
      });

      it("should set the property", function () {
        var newRX = 10;
        element.rx(newRX);
        chai.assert.equal(element.rx(), newRX);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.rx(defaultRX); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("rx"), element.rx());
          });
      });
    });

    describe("ry API", function () {
      var defaultRY;

      beforeEach(function () {
        defaultRY = 5;
        element.ry(defaultRY);
      });

      it("should get the property", function () {
        chai.assert.equal(element.ry(), defaultRY);
      });

      it("should set the property", function () {
        var newRY = 10;
        element.ry(newRY);
        chai.assert.equal(element.ry(), newRY);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.ry(defaultRY); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("ry"), element.ry());
          });
      });
    });

    describe("width API", function () {
      var defaultWidth;

      beforeEach(function () {
        defaultWidth = 20;
        element.width(defaultWidth);
      });

      it("should get the property", function () {
        chai.assert.equal(element.width(), defaultWidth);
      });

      it("should set the property", function () {
        var newWidth = 10;
        element.width(newWidth);
        chai.assert.equal(element.width(), newWidth);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.width(defaultWidth); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("width"), element.width());
          });
      });
    });

    describe("height API", function () {
      var defaultHeight;

      beforeEach(function () {
        defaultHeight = 50;
        element.height(defaultHeight);
      });

      it("should get the property", function () {
        chai.assert.equal(element.height(), defaultHeight);
      });

      it("should set the property", function () {
        var newHeight = 60;
        element.height(newHeight);
        chai.assert.equal(element.height(), newHeight);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.height(defaultHeight); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("height"), element.height());
          });
      });
    });

    describe("cssClass API", function () {
      var defaultClass;

      beforeEach(function () {
        defaultClass = "rects";
        element.cssClass(defaultClass);
      });

      it("should get the property", function () {
        chai.assert.equal(element.cssClass(), defaultClass);
      });

      it("should set the property", function () {
        var newClass = "squares";
        element.cssClass(newClass);
        chai.assert.equal(element.cssClass(), newClass);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.cssClass(defaultClass); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("class"), element.cssClass());
          });
      });
    });

    describe("fill API", function () {
      var defaultFill;

      beforeEach(function () {
        defaultFill = "#FF0000";
        element.fill(defaultFill);
      });

      it("should get the property", function () {
        chai.assert.equal(element.fill(), defaultFill);
      });

      it("should set the property", function () {
        var newFill = "#0000FF";
        element.fill(newFill);
        chai.assert.equal(element.fill(), newFill);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.fill(defaultFill); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("fill"), element.fill());
          });
      });
    });

    describe("opacity API", function () {
      var defaultOpacity;

      beforeEach(function () {
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
        element.opacity(defaultOpacity); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.style.opacity, element.opacity());
          });
      });
    });

    describe("color API", function () {
      var defaultColor;

      beforeEach(function () {
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
        element.color(defaultColor); // Set new attribute
        fixture.call(element); // Redraw rects
        var color = element.color();

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("fill"), color());
            chai.assert.equal(this.getAttribute("stroke"), color());
          });
      });
    });

    describe("stroke API", function () {
      var defaultStroke;

      beforeEach(function () {
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
        element.stroke(defaultStroke); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("stroke"), element.stroke());
          });
      });
    });

    describe("strokeWidth API", function () {
      var defaultStrokeWidth;

      beforeEach(function () {
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
        element.strokeWidth(defaultStrokeWidth); // Set new attribute
        fixture.call(element); // Redraw rects

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("stroke-width"), element.strokeWidth());
          });
      });
    });
  });
});