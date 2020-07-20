module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'jest'
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended"
  ],
  env: {
    browser: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  "rules": {
    "react/prop-types": 0
  }
};
