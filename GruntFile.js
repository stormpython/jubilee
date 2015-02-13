module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      options: {
        separator: ""
      },
      dist: {
        src: [
          "src/core.js",
          "src/modules/area.js",
          "src/modules/dendrogram.js",
          "src/modules/heatmap.js",
          "src/modules/histogram.js",
          "src/modules/horizon.js",
          "src/modules/line.js",
          "src/modules/map.js",
          "src/modules/pie.js",
          "src/modules/scatterplot.js",
          "src/modules/sparkline.js",
          "src/modules/spider.js",
          "src/modules/sunburst.js",
          "src/modules/sortedTable.js",
          "src/modules/treemap.js",
        ],
        dest: "build/kd3.js"
      }
    },
    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
          "<%= grunt.template.today('yyyy-mm-dd') %> */"
      },
      js: {
        files: {
          "kd3.min.js": ["build/kd3.js"]
        }
      }
    },
    jshint: {
      foo: {
        src: "src/**/*.js"
      },
      options: {
        jshintrc: ".jshintrc"
      }
    },
    watch: {
      js: {
        files: ["src/**/*.js"],
        tasks: ["concat"]
      }
    },
    copy: {
      css: {
        files: [
          { src: "style/kd3.css", dest: "build/kd3.css" }
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          "kd3.min.css" : ["build/kd3.css"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("default", ["concat", "copy", "watch"]);
  grunt.registerTask("production", ["concat", "uglify", "copy", "cssmin"]);
  grunt.registerTask("release", ["production"]);
  grunt.registerTask("lint", ["jshint"]);
};
