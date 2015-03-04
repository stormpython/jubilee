module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
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
    requirejs: {
      compile: {
        options: {
          baseUrl: ".",
          mainConfigFile: "src/require.config.js",
          name: "node_modules/almond/almond",
          include: ["src/require.config", "elasti"],
          optimize: "none",
          out: "build/elasti.js",
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
          "build/elasti.min.js": ["build/elasti.js"]
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
          { src: "src/style/elasti.css", dest: "build/elasti.css" }
        ]
      }
    },
    cssmin: {
      dist: {
        files: {
          "build/elasti.min.css" : ["build/elasti.css"]
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

  grunt.registerTask("default", ["copy", "connect", "watch"]);
  grunt.registerTask("production", ["requirejs", "uglify", "copy", "cssmin"]);
  grunt.registerTask("release", ["production"]);
  grunt.registerTask("lint", ["jshint"]);
  grunt.registerTask("build", ["requirejs", "copy"]);
};
