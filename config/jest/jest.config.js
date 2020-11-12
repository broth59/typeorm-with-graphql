// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const path = require('path')
const BABEL_CONFIG = require('../babel/babelrc')


module.exports = {
  
  // Stop running tests after `n` failures
  // bail: 0,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",


	/* Confgiruation Preset */
	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest',
	globals: {
		//typescript
		'ts-jest' : {
			diagnostics: true,
			tsconfig: '../../tsconfig.json',
			babelConfig: BABEL_CONFIG
		}
	},

	

	/* Deinfe Target */
	testEnvironment: 'jsdom',
	// The root directory that Jest should scan for tests and modules within
	rootDir: path.join('..','..'),
	// An array of file extensions your modules use
	moduleFileExtensions: [
		"js",
		"json",
		"jsx",
		"ts",
		"tsx",
		"node"
	], 
	// The glob patterns Jest uses to detect test files
	testMatch: [
		"**/test/**/*.test.[jt]s?(x)",
	],
	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: [
		"/node_modules/"
	],
	// testRegex: [
	// 	/\.[jt]s?(x)/,
	// ],
	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: [
		"/node_modules/"
	],


	/* Define reserved-word */
	moduleNameMapper: {
		/* Path alias */
		"@config/(.+)"  	: "<rootDir>/config/$1",
		//interface
		"@interface/(.+)" 	: "<rootDir>/src/interface/$1",
		"@domain/(.+)"    	: "<rootDir>/src/interface/domain/$1",
		//client      
		"@client/(.+)" 		: "<rootDir>/src/client/$1",
		"@component/(.+)" 	: "<rootDir>/src/client/component/$1",
		"@page/(.+)" 		: "<rootDir>/src/client/component/page/$1",
		"@store/(.+)"       : "<rootDir>/src/client/store/$1",
		"@hooks/(.+)"       : "<rootDir>/src/client/hooks/$1",
		"@decorators/(.+)"  : "<rootDir>/src/client/decorators/$1",

		//server
		"@server/(.+)" 		: "<rootDir>/src/server/$1",

		/* transform */
		"\\.s?css$"	: "identity-obj-proxy"
	},
  
	/* Mock */
	transform: {
		"^.+\\.s?css$"							: "<rootDir>/config/jest/cssTransform.js",
		"^(?!.*\\.(js|jsx|ts|tsx|css|json)$)"	: "<rootDir>/config/jest/fileTransform.js"
	},
	// All imported modules in your tests should be mocked automatically
	automock: false, 
	// Automatically clear mock calls and instances between every test
	clearMocks: true,
	// The directory where Jest should store its cached dependency information
	cacheDirectory: "config/jest/tmp",
	


	/* Compile */
	watchPlugins: [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname"
	]

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,


  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  
  // Run tests from one or more projects
  // projects: undefined,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: undefined,

  // Automatically restore mock state between every test
  // restoreMocks: false,


  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],


  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  

  

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jasmine2",

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // A map from regular expressions to paths to transformers
  // transform: undefined,

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};
