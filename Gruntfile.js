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
                command: "java -cp cpvls_serv.jar main.Main 8080"
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
                files: ['scss/**/*.scss', 'public_html/css/main.src.css'],
                tasks: ['sass:dev', 'concat']
            }
		},

		concurrent: {
            dev: ['watch', 'shell:front', 'shell:back'],
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
                outputStyle: 'nested',
                sourceMap: true
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['**/*.scss'],
                    dest: 'scss/css/',
                    ext: '.css'
                }]
            }
        },

        concat: {
            options: {
                //separator: ';',
            },
            dist: {
                src: ['public_html/css/main.src.css', 'scss/css/**/*.css'],
                dest: 'public_html/css/main.css',
            },
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

    grunt.registerTask('sas', ['sass:dev', 'concat']);

    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);
};