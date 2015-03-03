module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    bowerRequirejs: {
      target: {
        rjsConfig: "src/require.config.js"
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: ".",
          mainConfigFile: "src/require.config.js",
          name: "lib/almond/almond.js",
          include: ["src/require.config.js", "src/index.js"],
          out: "build/kd3.js",
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
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-bower-requirejs");

  grunt.registerTask("default", ["requirejs", "copy", "watch", "bowerRequirejs"]);
  grunt.registerTask("production", ["concat", "uglify", "copy", "cssmin"]);
  grunt.registerTask("release", ["production"]);
  grunt.registerTask("lint", ["jshint"]);
  grunt.registerTask("requirejs", ["requirejs"]);
};
