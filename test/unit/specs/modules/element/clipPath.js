define(function (require) {
  describe("Element: ClipPath SVG Tests", function () {
    var clipPath = require("src/modules/element/svg/clipPath");
    var d3fixture = require("fixtures/fixture");
    var remove = require("fixtures/remove");
    var element = clipPath();
    var fixture;

    beforeEach(function () {
      fixture = d3fixture;

      fixture
        .datum([{}]) // Only render 1 clippath
        .call(element);
    });

    afterEach(function () {
      remove(fixture);
    });

    it("should return a function", function () {
      var isFunction = (typeof element === "function");
      chai.assert.equal(isFunction, true);
    });

    describe("id API", function () {
      var defaultID;

      beforeEach(function () {
        defaultID = "uniqueID";
        element.id(defaultID);
      });

      it("should get the property", function () {
        chai.assert.equal(element.id(), defaultID);
      });

      it("should set the property", function () {
        var newID = "newID";
        element.id(newID);
        chai.assert.equal(element.id(), newID);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.id(defaultID);
        fixture.call(element); // Redraw

        fixture.selectAll("clippath")
          .each(function () {
            console.log(this);
            chai.assert.equal(this.getAttribute("id"), element.id());
          });
      });
    });

    describe("transform API", function () {
      var defaultTransform;

      beforeEach(function () {
        defaultTransform = "translate(0,0)";
        element.transform(defaultTransform);
      });

      it("should get the property", function () {
        chai.assert.equal(element.transform(), defaultTransform);
      });

      it("should set the property", function () {
        var newTransform = "translate(30,30)";
        element.transform(newTransform);
        chai.assert.equal(element.transform(), newTransform);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.transform(defaultTransform);
        fixture.call(element); // Redraw

        fixture.selectAll("clippath")
          .each(function () {
            chai.assert.equal(this.getAttribute("transform"), element.transform());
          });
      });
    });

    describe("x API", function () {
      var defaultX;

      beforeEach(function () {
        defaultX = 0;
        element.x(defaultX);
      });

      it("should get the property", function () {
        chai.assert.equal(element.x(), defaultX);
      });

      it("should set the property", function () {
        var newX = 5;
        element.x(newX);
        chai.assert.equal(element.x(), newX);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.x(defaultX);
        fixture.call(element); // Redraw

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("x"), element.x());
          });
      });
    });

    describe("y API", function () {
      var defaultY;

      beforeEach(function () {
        defaultY = 0;
        element.y(defaultY);
      });

      it("should get the property", function () {
        chai.assert.equal(element.y(), defaultY);
      });

      it("should set the property", function () {
        var newY = 5;
        element.y(newY);
        chai.assert.equal(element.y(), newY);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.y(defaultY);
        fixture.call(element); // Redraw

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("y"), element.y());
          });
      });
    });

    describe("width API", function () {
      var defaultWidth;

      beforeEach(function () {
        defaultWidth = 500;
        element.width(defaultWidth);
      });

      it("should get the property", function () {
        chai.assert.equal(element.width(), defaultWidth);
      });

      it("should set the property", function () {
        var newWidth = 200;
        element.width(newWidth);
        chai.assert.equal(element.width(), newWidth);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.width(defaultWidth);
        fixture.call(element); // Redraw

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("width"), element.width());
          });
      });
    });

    describe("height API", function () {
      var defaultHeight;

      beforeEach(function () {
        defaultHeight = 500;
        element.height(defaultHeight);
      });

      it("should get the property", function () {
        chai.assert.equal(element.height(), defaultHeight);
      });

      it("should set the property", function () {
        var newHeight = 200;
        element.height(newHeight);
        chai.assert.equal(element.height(), newHeight);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.height(defaultHeight);
        fixture.call(element); // Redraw

        fixture.selectAll("rect")
          .each(function () {
            chai.assert.equal(this.getAttribute("height"), element.height());
          });
      });
    });
  });
});
