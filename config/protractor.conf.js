var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
	allScriptsTimeout: 11000,
	specs: [
		'../e2e/**/*.e2e-spec.ts'
	],
	capabilities: {
		'browserName': 'chrome'
	},
	directConnect: true,
	baseUrl: 'http://localhost:8100/',
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function() {}
	},
	beforeLaunch: function() {
		require('ts-node').register({
			project: 'e2e'
		});
	},
	onPrepare: function() {
		jasmine.getEnv().addReporter(new SpecReporter());
	}
};
