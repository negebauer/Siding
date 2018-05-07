module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb-base/rules/es6',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      arrowFunctions: true,
      binaryLiterals: true,
      blockBindings: true,
      classes: true,
      defaultParams: true,
      destructuring: true,
      experimentalObjectRestSpread: true,
      restParams: true,
      forOf: true,
      generators: true,
      modules: true,
      objectLiteralComputedProperties: true,
      objectLiteralDuplicateProperties: true,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
      octalLiterals: true,
      regexUFlag: true,
      regexYFlag: true,
      spread: true,
      superInFunctions: true,
      templateStrings: true,
      unicodeCodePointEscapes: true,
      globalReturn: true,
      jsx: true
    },
  },
  env: {
    es6: true,
    jest: true,
  },
  plugins: [
    'prettier',
  ],
  rules: {
    'prettier/prettier': ['error', {
      trailingComma: 'es5',
      semi: false,
      singleQuote: true,
    }],
  }
};
