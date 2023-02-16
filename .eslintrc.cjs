/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-name': 'off',
    // 自定义规则进行覆盖，有错误
    'eslint.lintTask.enable': true,
    'eslint.alwaysShowStatus': true,
    'eslint.validate': [
      'javascript',
      'javascriptreact',
      'typescript',
      'typescriptreact'
    ],
    'editor.codeActionsOnSave': {
      'source.fixAll.eslint': true
    }
  }
}
