define(function (require) {
  describe("Element: Path SVG Tests", function () {
    var d3 = require("d3");
    var path = require("src/modules/element/svg/path");
    var d3fixture = require("fixtures/fixture");
    var pathGenerator = require("fixtures/path_generator")("line");
    var data = require("fixtures/data_generator")(10);
    var remove = require("fixtures/remove");
    var removeChildren = require("fixtures/remove_children");
    var element;
    var fixture;

    beforeEach(function () {
      element = path().pathGenerator(pathGenerator);
      fixture = d3fixture;

      fixture
        .datum([data])
        .call(element);
    });

    afterEach(function () {
      remove(fixture);
    });

    it("should return a function", function () {
      var isFunction = (typeof element === "function");
      chai.assert.equal(isFunction, true);
    });

    describe("pathGenerator API", function () {
      var defaultGenerator;
      var areaGenerator;

      beforeEach(function () {
        removeChildren(fixture);
        defaultGenerator = require("fixtures/path_generator")("line");
        areaGenerator = require("fixtures/path_generator")("area");
        element.pathGenerator(defaultGenerator);
      });

      it("should get the property", function () {
        chai.assert.equal(element.pathGenerator(), defaultGenerator);
      });

      it("should set the property", function () {
        element.pathGenerator(areaGenerator);
        chai.assert.equal(element.pathGenerator(), areaGenerator);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.pathGenerator(defaultGenerator);
        fixture.call(element);

        fixture.selectAll("path")
          .each(function (d) {
            chai.assert.equal(this.getAttribute("d"), defaultGenerator(d));
          });
      });
    });

    describe("transform API", function () {
      var defaultTransform;
      var newTransform;

      beforeEach(function () {
        removeChildren(fixture);
        defaultTransform = "translate(0,0)";
        newTransform = function (d) {
          return "transform(" + d.x + "," + d.y + ")";
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
          .each(function (d) {
            chai.assert.equal(this.getAttribute("transform"), defaultTransform);
          });
      });
    });

    describe("class API", function () {
      var defaultClass;

      beforeEach(function () {
        removeChildren(fixture);
        defaultClass = "paths";
        element.class(defaultClass);
      });

      it("should get the property", function () {
        chai.assert.equal(element.class(), defaultClass);
      });

      it("should set the property", function () {
        var newClass = "lines";
        element.class(newClass);
        chai.assert.equal(element.class(), newClass);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.class(defaultClass);
        fixture.call(element);

        fixture.selectAll("path")
          .each(function () {
            chai.assert.equal(this.getAttribute("class"), element.class());
          });
      });
    });

    describe("fill API", function () {
      var defaultFill;

      beforeEach(function () {
        removeChildren(fixture);
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
        element.fill(defaultFill);
        fixture.call(element);

        fixture.selectAll("path")
          .each(function () {
            chai.assert.equal(this.getAttribute("fill"), element.fill());
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
        fixture.call(element);

        fixture.selectAll("path")
          .each(function () {
            chai.assert.equal(this.style.opacity, element.opacity());
          });
      });
    });

    describe("stroke API", function () {
      var defaultStroke;

      beforeEach(function () {
        removeChildren(fixture);
        defaultStroke = d3.functor("#FF0000");
        element.stroke(defaultStroke);
      });

      it("should get the property", function () {
        chai.assert.equal(element.stroke(), defaultStroke);
      });

      it("should set the property", function () {
        var newStroke = d3.functor("#0000FF");
        element.stroke(newStroke);
        chai.assert.equal(element.stroke(), newStroke);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.stroke(defaultStroke);
        fixture.call(element);

        fixture.selectAll("path")
          .each(function () {
            // element.stroke() returns a function that needs to be called
            chai.assert.equal(this.getAttribute("stroke"), element.stroke()());
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
        fixture.call(element);

        fixture.selectAll("path")
          .each(function () {
            chai.assert.equal(this.getAttribute("stroke-width"), element.strokeWidth());
          });
      });
    });
  });
});