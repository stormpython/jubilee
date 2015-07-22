define(function (require) {
  describe("Element: Image SVG Tests", function () {
    var image = require("src/modules/element/svg/image");
    var d3fixture = require("fixtures/fixture");
    var data = require("fixtures/data_generator")(10);
    var remove = require("fixtures/remove");
    var removeChildren = require("fixtures/remove_children");
    var element = image();
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
        var newX = function (d) { return d.imageX; };
        element.x(newX);
        chai.assert.equal(element.x(), newX);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.x(defaultX); // Set new attribute
        fixture.call(element); // Redraw images

        fixture.selectAll("image")
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
        var newY = function (d) { return d.imageY; };
        element.y(newY);
        chai.assert.equal(element.y(), newY);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.y(defaultY); // Set new attribute
        fixture.call(element); // Redraw images

        fixture.selectAll("image")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("y"), d.y);
          });
      });
    });

    describe("width API", function () {
      var defaultWidth;

      beforeEach(function () {
        removeChildren(fixture);
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
        fixture.call(element); // Redraw images

        fixture.selectAll("image")
          .each(function () {
            chai.assert.equal(this.getAttribute("width"), element.width());
          });
      });
    });

    describe("height API", function () {
      var defaultHeight;

      beforeEach(function () {
        removeChildren(fixture);
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
        fixture.call(element); // Redraw images

        fixture.selectAll("image")
          .each(function () {
            chai.assert.equal(this.getAttribute("height"), element.height());
          });
      });
    });

    describe("cssClass API", function () {
      var defaultClass;

      beforeEach(function () {
        removeChildren(fixture);
        defaultClass = "images";
        element.cssClass(defaultClass);
      });

      it("should get the property", function () {
        chai.assert.equal(element.cssClass(), defaultClass);
      });

      it("should set the property", function () {
        var newClass = "jubilee";
        element.cssClass(newClass);
        chai.assert.equal(element.cssClass(), newClass);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.cssClass(defaultClass); // Set new attribute
        fixture.call(element); // Redraw images

        fixture.selectAll("image")
          .each(function () {
            chai.assert.equal(this.getAttribute("class"), element.cssClass());
          });
      });
    });

    describe("xlink API", function () {
      var defaultLink;

      beforeEach(function () {
        removeChildren(fixture);
        defaultLink = "http://www.filmoria.co.uk/wp-content/uploads/2015/03/jubilee-marvel-2.jpg";
        element.xlink(defaultLink);
      });

      it("should get the property", function () {
        chai.assert.equal(element.xlink(), defaultLink);
      });

      it("should set the property", function () {
        var newLink= "http://www.empireonline.com/images/image_index/original/51752.jpg";
        element.xlink(newLink);
        chai.assert.equal(element.xlink(), newLink);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.xlink(defaultLink); // Set new attribute
        fixture.call(element); // Redraw images

        fixture.selectAll("image")
          .each(function () {
            chai.assert.equal(this.getAttribute("href"), element.xlink());
          });
      });
    });

    describe("preserveAspectRatio API", function () {
      var defaultRatio;

      beforeEach(function () {
        removeChildren(fixture);
        defaultRatio = "defer none";
        element.preserveAspectRatio(defaultRatio);
      });

      it("should get the property", function () {
        chai.assert.equal(element.preserveAspectRatio(), defaultRatio);
      });

      it("should set the property", function () {
        var newRatio = "defer xMaxYMax";
        element.preserveAspectRatio(newRatio);
        chai.assert.equal(element.preserveAspectRatio(), newRatio);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.preserveAspectRatio(defaultRatio); // Set new attribute
        fixture.call(element); // Redraw images

        fixture.selectAll("image")
          .each(function () {
            chai.assert.equal(this.getAttribute("preserveAspectRatio"), element.preserveAspectRatio());
          });
      });
    });
  });
});
