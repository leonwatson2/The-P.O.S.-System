module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options:{
				// style:'compressed',
				style:'condensed',
				sourcemap:'auto'
			},
			css: {
				files: [{
		        expand: true,
		        cwd: 'src/app/styles/sass',
		        src: '*.scss',
		        dest: 'src/app/styles/',
		        ext: '.css'
		      }]
			}
		},
		watch: {
			css: {
				files: 'src/app/styles/sass/*.scss',
				tasks: ['sass', 'copy']
			}
		},
		copy: {
	        main: {
	            files: [
	                {
	                	src: 'src/app/styles/style.css', 
	                	dest:'src/style.css'
	                }
	            ]
	       	}
	    }
    
	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
}