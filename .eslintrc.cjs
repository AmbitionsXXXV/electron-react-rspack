module.exports = {
  ignorePatterns: ["configs/*.ts", "forge.config.ts", "src/main/lib/*.ts"],
  extends: ['./node_modules/etc-fe-eslint-config/typescript/react', 'prettier'],
  rules: {
    'guard-for-in': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
}
