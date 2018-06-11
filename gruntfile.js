module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            // uglify: {
            //     files: ['public/**/*.js'],
            //     tasks: ['jshint'],
            //     options: {
            //         livereload: true
            //     }
            // },
            // styles: {
            //     files: ['public/**/*.less'],
            //     tasks: ['less'],
            //     options: {
            //         nospawn: true
            //     }
            // }
        },

        // jshint: {
        //     options: {
        //         jshintrc: '.jshintrc',
        //         ignores: ['public/libs/**/*.js']
        //     },
        //     all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
        // },

        // less: {
        //     development: {
        //         options: {
        //             compress: true,
        //             yuicompress: true,
        //             optimization: 2
        //         },
        //         files: {
        //             'public/build/index.css': 'public/less/index.less'
        //         }
        //     }
        // },

        // uglify: {
        //     development: {
        //         files: {
        //             'public/build/admin.min.js': 'public/js/admin.js',
        //             'public/build/detail.min.js': [
        //                 'public/js/detail.js'
        //             ]
        //         }
        //     }
        // },

        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        // mochaTest: {
        //     options: {
        //         reporter: 'spec'
        //     },
        //     src: ['test/**/*.js']
        // },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            // tasks: ['nodemon', 'watch', 'less', 'uglify', 'jshint'],
            options: {
                logConcurrentOutput: true
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-watch') //类似热加载
    grunt.loadNpmTasks('grunt-contrib-nodemon') //实时监听入口文件
    grunt.loadNpmTasks('grunt-concurrent') //针对慢任务。比如css预渲染，优化编译时间
    grunt.option('force', true) //开发时遇到错误，防止中断服务
    grunt.registerTask('default', ['concurrent'])
}