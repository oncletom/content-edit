module.exports = function(grunt) {

	grunt.initConfig({
		// Import package manifest
		pkg: grunt.file.readJSON("content-edit.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
      core: {
        src: ["src/plugin.js"],
        dest: "dist/jquery.content-edit.js"
      },
      history: {
        src: ["src/history.js"],
        dest: "dist/jquery.content-edit-history.js"
      },
			options: {
				banner: '(function($){ "use strict";',
				footer: "})(jQuery,document,window);"
			}
		},

		// Lint definitions
		jshint: {
			plugin: ["dist/*.js", "!dist/*.min.js"],
      tests: {
        src: ["test/**/*.js"],
        options: {
          undef: false,
          "-W024": true,
          globals: {
            asyncTest: true,
            deepEqual: true,
            equal: true,
            expect: true,
            module: true,
            notDeepEqual: true,
            notEqual: true,
            notStrictEqual: true,
            ok: true,
            QUnit: true,
            throws: true,
            start: true,
            stop: true,
            strictEqual: true,
            test: true
          }
        }
      },
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
      core: {
        src: ["dist/jquery.content-edit.js"],
        dest: "dist/jquery.content-edit.min.js"
      },
      history: {
        src: ["dist/jquery.content-edit-history.js"],
        dest: "dist/jquery.content-edit-history.min.js"
      },
			options: {
				banner: "<%= meta.banner %>",
        report: "gzip"
			}
		},

    // Testing
    qunit: {
      all: ["test/**/*.html"]
    },

    watch: {
      scripts: {
        files: "src/*.js",
        tasks: ['concat', 'uglify']
      }
    }

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["build"]);
	grunt.registerTask("build", ["concat", "jshint", "uglify"]);
	grunt.registerTask("test", ["jshint", "qunit"]);
};
