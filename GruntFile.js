module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    mocha: {
      all: {
        src: ["test/unit/index.html"]
      },
      options: {
        run: true
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          protocol: "http",
          hostname: "127.0.0.1",
          base: ".",
          livereload: true
        }
      }
    },
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: ["lib/d3/d3.js", "lib/d3-plugins/geo/tile/tile.js"],
        dest: "build/d3.js"
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: ".",
          mainConfigFile: "src/require.config.js",
          name: "node_modules/almond/almond",
          include: ["src/require.config", "jubilee"],
          optimize: "none",
          out: "build/jubilee.js",
          wrap: {
            startFile: "src/start.js",
            endFile: "src/end.js"
          }
        }
      }
    },
    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
          "<%= grunt.template.today('yyyy-mm-dd') %> */"
      },
      js: {
        files: {
          "build/jubilee.min.js": ["build/jubilee.js"]
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
        tasks: []
      }
    },
    copy: {
      css: {
        files: [
          { src: "src/style/jubilee.css", dest: "build/jubilee.css" }
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          "build/jubilee.min.css" : ["build/jubilee.css"]
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
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-mocha");

  grunt.registerTask("default", ["copy", "connect", "concat", "watch"]);
  grunt.registerTask("d3build", ["concat"]);
  grunt.registerTask("production", ["requirejs", "uglify", "copy", "cssmin"]);
  grunt.registerTask("release", ["production"]);
  grunt.registerTask("lint", ["jshint"]);
  grunt.registerTask("test", ["mocha"]);
  grunt.registerTask("build", ["requirejs", "copy"]);
};
