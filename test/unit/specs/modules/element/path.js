define(function (require) {
  describe("Path SVG Tests", function () {
    var path = require("src/modules/element/path");
    var d3fixture = require("fixtures/fixture");
    var pathGenerator = require("fixtures/path_generator")("line");
    var data = require("fixtures/data_generator")(10);
    var element = path().pathGenerator(pathGenerator);
    var fixture;

    beforeEach(function () {
      fixture = d3fixture;

      fixture
        .datum([data])
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

    describe("pathGenerator API", function () {
      var defaultGenerator;
      var newGenerator;

      beforeEach(function () {
        defaultGenerator = require("fixtures/path_generator")();
        areaGenerator = require("fixtures/path_generator")("area");
        element.pathGenerator(defaultGenerator);
      });

      it("should get the property", function () {
        chai.assert.equal(element.pathGenerator(), defaultGenerator);
      });

      it("should set the property", function () {
        element.pathGenerator(newGenerator);
        chai.assert.equal(element.pathGenerator(), newGenerator);
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

    describe("accessor API", function () {
      var defaultAccessor;

      beforeEach(function () {
        defaultAccessor = function (d) { return d; };
        element.accessor(defaultAccessor);
      });

      it("should get the property", function () {
        chai.assert.equal(element.accessor(), defaultAccessor);
      });

      it("should set the property", function () {
        var newAccessor = function (d) { return d.values; };
        element.accessor(newAccessor);
        chai.assert.equal(element.accessor(), newAccessor);
      });
    });

    describe("transform API", function () {
      var defaultTransform;
      var newTransform;

      beforeEach(function () {
        defaultTransform = "translate(0,0)";
        newTransform = "translate(20,30)";
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

    describe("pathClass API", function () {
      var defaultClass;

      beforeEach(function () {
        defaultClass = "paths";
        element.pathClass(defaultClass);
      });

      it("should get the property", function () {
        chai.assert.equal(element.pathClass(), defaultClass);
      });

      it("should set the property", function () {
        var newClass = "lines";
        element.pathClass(newClass);
        chai.assert.equal(element.pathClass(), newClass);
      });

      it("should set the proper value of the DOM attribute", function () {
        element.pathClass(defaultClass);
        fixture.call(element);

        fixture.selectAll("path")
          .each(function () {
            chai.assert.equal(this.getAttribute("class"), element.pathClass());
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
        element.color(defaultColor);
        fixture.call(element);
        var color = element.color();

        fixture.selectAll("path")
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
        element.stroke(defaultStroke);
        fixture.call(element);

        fixture.selectAll("path")
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