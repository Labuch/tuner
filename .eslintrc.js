module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
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
    browser: true,
    es6:true, 
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
