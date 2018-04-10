module.exports = {
  extends: [
    "airbnb-base/legacy",
    "airbnb-base/rules/es6",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: [
    "prettier",
  ],
  rules: {
    "prettier/prettier": ["error", {
      trailingComma: "es5",
      semi: false,
      singleQuote: true,
    }],
  }
};
