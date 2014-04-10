module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
        options: {
            paths: []
        },
        dynamic_mappings_development: {
            options: {
                yuicompress: false,
                ieCompat: true
            },
            files: {}
        }
    },
    watch: {
        files: ['<%= less.options.paths %>'],
        tasks: ['less:dynamic_mappings_development'],
        options: {
          spawn: false
        }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['less:dynamic_mappings_development']);

};