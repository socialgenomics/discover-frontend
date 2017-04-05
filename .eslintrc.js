module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
  ],
  env: {
    browser: true
  },
  plugins: [
    'ember'
  ],
  rules: {
    "ember/alias-model-in-controller": 0, //2
    "ember/avoid-leaking-state-in-components": 0, //2
    "ember/closure-actions": 0, //1
    "ember/jquery-ember-run": 2, //2
    "ember/local-modules": 0, //2
    "ember/named-functions-in-promises": 0, //2
    "ember/no-empty-attrs": 2, //2
    "ember/no-function-prototype-extensions": 2, //2
    "ember/no-observers": 0, //2
    "ember/no-on-calls-in-components": 2, //2
    "ember/no-side-effects": 2, //2
    "ember/order-in-components": 0, //2
    "ember/order-in-controllers": 0, //2
    "ember/order-in-models": 0, //2
    "ember/order-in-routes": 0, //2
    "ember/routes-segments-snake-case": 2, //2
    "ember/use-brace-expansion": 0, //1
    "ember/use-ember-get-and-set": 0, //1
  }
};
