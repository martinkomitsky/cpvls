module.exports = function (grunt) {

    grunt.initConfig({
		shell: {
            options: {
                stdout: true,
                stderr: true
            },
			front: {
				command: "node server.js"
			},
            'back': {
                command: "java -cp cpvls_serv.jar main.Main"
            }
		},

		watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    spawn: false,
                    atbegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['scss/**/*.scss', 'scss/**/**/*.scss', 'public_html/css/font-awesome.min.css'],
                tasks: ['sass:dev', 'concat:css'],
                options: {
                    livereload: true,
                    event: ['changed', 'added', 'deleted']
                }
            }
		},

		concurrent: {
            dev: ['watch', 'shell:front', 'shell:back'],
            devfront: ['watch', 'shell:front'],
            options: {
                logConcurrentOutput: true
            }
		},

		fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },

        sass: {
            options: {
                outputStyle: 'nested'
                //sourceMap: true
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'scss',
                    // src: ['**/*.scss'],
                    src: ['main.scss'],
                    dest: 'public_html/css/',
                    ext: '.css'
            	}]
            }
        },

        concat: {
        	css: {
                src: ['public_html/css/font-awesome.min.css', 'public_html/css/main.css'],
                dest: 'public_html/css/main.css',
        	},
        	js: {
				src: ['public_html/js/lib/almond.js', 'public_html/build/js/app.js'],
				dest: 'public_html/build/js/app.js',
        	}
        },

        requirejs: {
            js: {
                options: {
                    almond: true,
                    baseUrl: "public_html/js",
                    mainConfigFile: "public_html/js/config.js",
                    name: "main",
                    optimize: "uglify",
                    out: "public_html/build/js/app.js",
                }
            },
            css: {
                options: {
                    optimizeCss: "standard",
                    cssImportIgnore: null,
                    cssIn: "public_html/css/main.css",
                    out: "public_html/build/css/main.min.css",
                }
            }
        },

        qunit: {
            all: ['./public_html/tests/index.html']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('sas', ['sass:dev', 'concat']);
    grunt.registerTask('build', ['requirejs', 'concat:js']);


    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('front', ['concurrent:devfront']);

    grunt.registerTask('build', ['sass:dev', 'concat:css', 'requirejs']);
    grunt.registerTask('default', ['concurrent']);
};