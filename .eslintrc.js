const path = require("path");

module.exports = {
    /* preset */

    /*Source spec*/
    //source path
    //files		   : [ './**/*' ],
    ignorePatterns: ["/node_modules/", ".eslintrc.js", "/config/jest/*.js"],
    //javascript level
    env: {
        node: true,
        es2020: true,
    },

    /* AST Parser spec */
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
        tsconfigRootDir: ".",
        project: "./tsconfig.json",
    },

    /* Linting Rules */
    //룰 추가
    plugins: ["react", "@typescript-eslint", "import", "jest"],
    //룰 활성화 프리셋
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        // 'plugin:import/recommended',

        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/eslint-recommended",

        "prettier",
        "prettier/@typescript-eslint",
    ],
    rules: {
        //ts
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-inferrable": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"no-debugger" : "off",
        //react
        "react/prop-types": "off",
        "react/display-name": "off",
        //jest
        "jest/no-alias-methods": "warn",
        "jest/prefer-to-be-null": "error",
        "jest/prefer-to-be-undefined": "error",
        "jest/prefer-to-contain": "error",
        "jest/prefer-to-have-length": "error",
    },

    overrides: [
        /* Build */
        {
            files: ["./scripts/**/*"],
            env: {
                node: true,
                es2020: true,
            },
            parserOptions: {
                ecmaFeatures: {},
                ecmaVersion: 2020,
                sourceType: "module",
                tsconfigRootDir: __dirname,
                project: "./scripts/tsconfig.json",
            },
        },
        /* Client */
        {
            files: ["./src/client/**/*", "./test/client/**/*"],
            env: {
                node: false,
                es2020: true,
                jest: true,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2020,
                sourceType: "script",
                tsconfigRootDir: __dirname,
                project: "./src/client/tsconfig.json",
            },
        },
        /* Server */
        {
            files: ["./src/server/**/*", "./test/server/**/*"],
            env: {
                node: true,
                es2020: true,
                jest: true,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2020,
                sourceType: "module",
                tsconfigRootDir: __dirname,
                project: "./src/server/tsconfig.json",
            },
		},
		/* Test Client*/
        {
            files: ["./test/**/*", ],
            env: {
                node: true,
                es2020: true,
                jest: true,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2020,
                sourceType: "scripts",
                tsconfigRootDir: __dirname,
                project: "./test/client/tsconfig.json",
            },
		},
		/* Test Server*/
        {
            files: ["./test/**/*", ],
            env: {
                node: true,
                es2020: true,
                jest: true,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2020,
                sourceType: "module",
                tsconfigRootDir: __dirname,
                project: "./test/server/tsconfig.json",
            },
		},
    ],
};
