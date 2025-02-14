module.exports = {
  // 环境配置
  env: {
    browser: true,
    es2021: true,
    node: true
  },

  // 规则配置
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'plugin:prettier/recommended'
  ],

  // 使用 TypeScript 解析器
  parser: '@typescript-eslint/parser',

  // 解析器选项
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },

  // 插件
  plugins: ['react', '@typescript-eslint'],

  // 自定义规则
  rules: {
    // 关闭 React 的 prop-types 检查（如果使用 TypeScript，推荐关闭）
    'react/prop-types': 'off',
    // 允许不显式定义函数返回值类型（根据项目需求调整）
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 启用 Prettier 的规则，并将其设置为错误级别
    'prettier/prettier': 'error'
  },

  // 设置
  settings: {
    react: {
      pragma: 'React',
      version: 'detect' // 自动检测 React 版本
    }
  }
}
