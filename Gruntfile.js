module.exports = function(grunt) {

    // buildject configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['build/**/*'],
            tmp: ['.tmp']
        },
        useminPrepare: {
            // html: 'src/index.html',
            options: {                                  // Target options
                dest: 'build'
            },
            build:{
                files: [{
                    expand: true,
                    cwd: './src',
                    src: ['**/*.html']
                }]
            }
        },
        usemin: {
            options: {
                assetsDirs: ['build']
            },
            build:{
                files: [{
                    expand: true,
                    cwd: './build',
                    src: ['**/*.html']
                }]
            }
        },
        htmlmin: {                                          // Task
            build: {                                        // Target
                options: {                                  // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    processScripts: ['text/ng-template']
                },
                files: [{
                    expand: true,
                    cwd: './build',
                    src: ['**/*.html'],
                    dest: 'build/'
                }]
            }
        },
        copy: {
            html: {
                files: [
                  {expand: true, cwd: './src', src: ['**/*.html'], dest: 'build/', filter: 'isFile'}
                ]
            },
            bootstrap: {
                files: [
                  {expand: true, cwd: './src', src: ['style/bootstrap/**/*'], dest: 'build/'}
                ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');

    grunt.registerTask('default',
        [
            'clean',
            'copy',
            'useminPrepare',
            'concat:generated',
            'uglify:generated',
            'cssmin:generated',
            'usemin',
            'htmlmin',
            'clean:tmp'
        ]
    );
};
