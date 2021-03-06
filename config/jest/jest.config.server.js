// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const JEST_CONFIG = require('./jest.config')
const BABEL_CONFIG = require('../babel/babelrc')

module.exports = {

  	...JEST_CONFIG,

	/* Confgiruation Preset */
	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest',
	globals: {
		//typescript
		'ts-jest' : {
			diagnostics: true,
			tsconfig: './test/server/tsconfig.json',
			babelConfig: BABEL_CONFIG
		}
	},

	/* Deinfe Target */
	testEnvironment: 'node',
	testMatch: [
		"**/test/server/**/*.[jt]s?(x)",
	],

	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: [
		"/node_modules/"
	],
	testTimeout: 10000

	/* test environment */
	// setupFiles:['./test/server/setup/refl.ts'],

};
