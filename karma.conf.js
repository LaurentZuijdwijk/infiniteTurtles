// Contents of: config/karma.conf.js
module.exports = function(config) {
	config.set({
		basePath: './',

		// Fix for "JASMINE is not supported anymore" warning
		frameworks: ["jasmine"],

		preprocessors: {
			'dist/**/*.js': 'coverage'
		},

		files: [
			'dist/turtle.min.js',
			'spec/**/*.js',
		],
		exclude: [''],
		reporters: ['spec', 'junit', 'coverage'],

		coverageReporter: {
			reporters: [{
				type: 'html',
				dir: 'coverage/'
			}, {
				type: 'text-summary'
			}]
		},
		autoWatch: false,
    singleRun : true,
		browsers: ['Chrome'],
		logLevel: config.LOG_INFO,

		junitReporter: {
			outputFile: 'test_out.xml',
			suite: 'unit'
		},

		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-coverage',
			'karma-spec-reporter',
			'karma-junit-reporter',

		]
	});
}