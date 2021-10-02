module.exports = {
  env: {
    // analyse codes executed by the envs below
    browser: true, // enables objects proper to browsers, e.g. `document`, `onload`...
    es6: true, // ES6(ES2015) syntax
    node: true, // syntax & variables proper to node.js, e.g. `require`...
    'jest/globals': true, // whitelist env vars provided by Jest, a unit testing FW for JavaScript
  },
  // global variables
  globals: {
    Atomics: 'readonly', // sets `Atomics` to readonly. It is an obj which provides operations as static methods
    SharedArrayBuffer: 'readonly', // an obj which is used to represent a generic, fixed-length raw binary data buffer
    __DEV__: true, // allows using `__DEV__`
  },
  // Shareable Configs
  extends: [
    'plugin:react/recommended',
    'airbnb', // Airbnb's eslinst configs, which includes almost all rules in "eslint:recommended"
    'plugin:import/recommended', // enables eslint-plugin-import
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended', // 組込ルールに関するESLint公式推奨設定"eslint:recommended"の中でTSの文法と衝突するものをOFF
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier', // uses eslint-config-prettier
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // specify js languages to support other than ES5
    ecmaFeatures: {
      jsx: true, // enables parsing jsx. Parsing tsx is enabled regardless of this config.
    },
    ecmaVersion: 12,
    project: './tsconfig.eslint.json',
    sourceType: 'module', // allows 'import' syntax
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint', // ESLintをTypeScriptに使うためのプラグイン
    'import',
    'jsx-a11y',
    'prefer-arrow', // uses eslint-plugin-prefer-arrow, a plugin which prefers allow functions
    'react', // uses eslint-plugin-react
    'react-hooks', // uses eslint-plugin-react-hooks
    'jest', // uses eslint-plugin-jest
  ],
  root: true, // set . to the root in order to prevent ESLint from looking for config files from parent dirs
  settings: {
    // cf. https://github.com/import-js/eslint-plugin-import#importextensions
    'import/resolver': {
      node: {
        extensions: ['.js', 'jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect', // React version. `detect` automatically picks the version installed.
    },
  },
  rules: {
    'newline-before-return': 'off', // an empty line before return statement is NOT neeeded
    'no-console': 'warn', // warns `console.log()` in Production Env
    'require-yield': 'error', // disallows generators without yield
    'no-param-reassign': 'error',
    'no-use-before-define': 'off',
    'no-empty-function': 'off',
    'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
    'no-void': ['error', {allowAsStatement: true}],
    'no-case-declarations': 'error',
    'no-unused-vars': 'off',
    'space-before-blocks': ['warn', {functions: 'always'}], // a space before '{' after function or class
    'no-undef': 'error', // warn if an undefined var is used
    'import/prefer-default-export': 'off', // If there is only a single export from a module, prefer default export over named export

    // eslint-plugin-jsx-a11y
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/click-events-have-key-events': 'off',

    // typescript-eslint/eslint-plugin
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off', // requires explicit return types on functions and class methods
    '@typescript-eslint/explicit-member-accessibility': 'off', // requires explicit accessibility modifiers on class properties and methods
    '@typescript-eslint/indent': 'off', // enforces consistent indentation
    '@typescript-eslint/no-unnecessary-type-assertion': 'error', // warns of a type assertion which does not change the type of an expression
    // todo: '@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: '_'}],
    '@typescript-eslint/no-unused-vars': ['warn', {varsIgnorePattern: '_'}],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-empty-function': 'off',
    // todo: '@typescript-eslint/no-unsafe-assignment': 'error',
    // todo: '@typescript-eslint/no-unsafe-call': 'error',
    // todo: '@typescript-eslint/no-unsafe-member-access': 'error',
    // todo: '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',

    // prefer-arrow functions
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: true, // disallows functions with only a `return` statement
        classPropertiesAllowed: false, // disallows a function defined as a class instance if it can be replaced by an arrow one.
      },
    ],

    // react rules
    'react/jsx-filename-extension': ['error', {extensions: ['jsx', 'tsx']}],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-uses-vars': 'error',
    'react/prefer-stateless-function': 'error',
    'react/react-in-jsx-scope': 'off',

    // react hooks
    'react-hooks/rules-of-hooks': 'error',

    // todo: 'react-hooks/exhaustive-deps': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // requires `import` paths to have extensions except js, jsx, ts, and tsx
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // forbids the import of external modules not declared in the package.json
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.storybook/**',
          'src/stories/**',
          '**/*/*.story.*',
          '**/*/*.stories.*',
          '**/__specs__/**',
          '**/*/*.spec.*',
          '**/__tests__/**',
          '**/*/*.test.*',
        ],
      },
    ],
  },
  // apply `'react/prop-types': 'off'` only to tsx's
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
