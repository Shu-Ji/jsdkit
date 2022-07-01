module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',

        // 请确保格式化代码插件放在最后
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        // 请不要随意添加、修改、删除规则
        radix: 'off',
        'react/jsx-no-target-blank': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 'off',

        '@typescript-eslint/no-explicit-any': 'error',
    },
};
