module.exports = {
  extends: [
    "airbnb",
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
    es6: true,
    jest: true,
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
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
  }
};
