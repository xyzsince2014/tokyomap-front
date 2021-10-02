/**
 * ESLint is a static code analysis tool for identifying progmatic patterns found in JavaScript.
 * See the details of the rules here: https://eslint.org/docs/rules/
 */
module.exports = {
  env: {
    // analyse codes executed by the envs below
    browser: true, // enables objects proper to browsers, e.g. 'document', 'onload'...
    es6: true, // ES6(ES2015) syntax
    node: true, // syntax & variables proper to node.js, e.g. 'require'...
    "jest/globals": true, // whitelist env vars provided by Jest, a unit testing FW for JavaScript
  },
  // extend Shareable Configs
  extends: [
    "airbnb", // Airbnb's eslinst configs
    "plugin:@typescript-eslint/recommended", // "eslint:recommended"の中でTSに不要なものをOFFに(TS型チェックで事足りているもの)
    "plugin:import/errors", // enables eslint-plugin-import
    "plugin:import/warnings", // enables eslint-plugin-import
    "prettier/@typescript-eslint", // uses eslint-config-prettier to disable @typescript-eslint/eslint-plugin incompartible with prettier
    "prettier/react", // nullfy @eslint-plugin-react incompartible with prettier
    "plugin:prettier/recommended", // enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  // config global variables
  globals: {
    Atomics: "readonly", // sets 'Atomics' to readonly. It is an obj which provides operations as static methods
    SharedArrayBuffer: "readonly", // an obj which is used to represent a generic, fixed-length raw binary data buffer
    __DEV__: true, // allows the use of '__DEV__'
  },
  parser: "@typescript-eslint/parser", // ESLintにTSsyntaxを理解させる
  // specify js languages to support other than ES5
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // enables parsing jsx. Parsing tsx is enabled regardless of this config.
    },
    project: "./tsconfig.json", // designates the path to 'tsconfig.json'.
    sourceType: "module", // allows 'import' syntax
    // ecmaVersion: 2018, // enables parsing the latest functionality of ES ※airbnb has enabled already
  },
  plugins: [
    "@typescript-eslint", // ESLintをTypeScriptに使うためのプラグイン
    "jest", // uses eslint-plugin-jest
    "prettier", // uses eslint-plugin-prettier
    "prefer-arrow", // uses eslint-plugin-prefer-arrow, a plugin which prefers allow functions
    "react", // uses eslint-plugin-react
    "react-hooks",
  ],
  root: true, // set . to the root, i.e. ESLinst does not look for config files in parant dirs
  settings: {
    // import resolvers. See the detail here: https://bit.ly/2JKPUAC
    "import/resolver": {
      node: {
        extensions: [".js", "jsx", ".ts", ".tsx"],
      },
    },
    react: {
      version: "detect", // React version. 'detect' automatically picks the version installed.
    },
  },
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          ".storybook/**",
          "src/stories/**",
          "**/*/*.story.*",
          "**/*/*.stories.*",
          "**/__specs__/**",
          "**/*/*.spec.*",
          "**/__tests__/**",
          "**/*/*.test.*",
        ],
      },
    ],

    // eslint official
    "newline-before-return": "off", // an empty line before return statement is NOT neeeded
    "no-console": "warn", // warns 'console.log()' in Production Env
    "require-yield": "error", // disallows generators without yield
    "no-param-reassign": "warn",

    // @typescript-eslint
    "@typescript-eslint/explicit-function-return-type": "off", // requires explicit return types on functions and class methods
    "@typescript-eslint/explicit-member-accessibility": "off", // requires explicit accessibility modifiers on class properties and methods
    indent: "off",
    "@typescript-eslint/indent": "off", // enforces consistent indentation
    "@typescript-eslint/no-unnecessary-type-assertion": "error", // warns of a type assertion which does not change the type of an expression
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "[Rr]eact" },
    ],
    "@typescript-eslint/no-use-before-define": [
      "warn",
      { functions: false, classes: true },
    ],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",

    // prefer-arrow functions
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
        singleReturnOnly: true, // disallows functions with only a 'return' statement
        classPropertiesAllowed: false, // disallows a function defined as a class instance if it can be replaced by an arrow one.
      },
    ],

    // react rules
    "react/jsx-filename-extension": ["error", { extensions: ["jsx", "tsx"] }], // resctricts extensions which may contain jsx
    "react/jsx-one-expression-per-line": "off", // limits to 1 expression per line in jsx
    "react/jsx-uses-vars": "error", // marks variables used in jsx as used
    "react/prop-types": "off", // warns of import props' data types
    "react/prefer-stateless-function": "off", // enforcing stateless components to be pure functions

    // react hooks
    "react-hooks/rules-of-hooks": "error",

    // requires 'import' paths to have extensions except js, jsx, ts, and tsx
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],

    // If there is only a single export from a module, prefer default export over named export.
    "import/prefer-default-export": "off",

    // 'space-before-blocks': ['warn', {functions: 'always', class: 'always'}], // a space before '{' after function or class
    "no-undef": "warn", // warn if an undefined var is used

    // formatting rules (must be written as the last rules)
    "prettier/prettier": [
      "error",
      {
        // prettier options, see https://prettier.io/docs/en/options.html for details.
        bracketSpacing: false, // prevents spaces between brackets,
        printWidth: 100, // the maximum width of sentence displayed without line feeds
        semi: true, // requires ';' to be at the end of each sentence
        singleQuote: true, // uses single quotes
        trailingComma: "all", // adds ',' at the end of last elements
        useTabs: false, // uses space indents,
        arrowParenets: "avoid",
        tabWidth: 2,
        htmlWhitespaceSensitivity: "ignore",
        arrowParens: "avoid",
      },
    ],
  },
};
