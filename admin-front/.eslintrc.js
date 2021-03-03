/** @format */

const eslintConfig = {
    parser: '@typescript-eslint/parser',
    plugins: ['typescript', 'react-hooks', '@typescript-eslint'],
    extends: [
        'airbnb',
        'plugin:prettier/recommended', // 支持perttier作为rules
        'plugin:import/typescript',
    ],
    env: {
        browser: true,
        // node: true,
        // jest: true,
    },
    globals: {
        JSX: 'readonly',
        React: 'readonly',
        // Electron: "readonly",
    },
    rules: {
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        // "react/jsx-indent": [2, 4, {indentLogicalExpressions: true}], // jsx 空格为4
        // "react/jsx-indent-props": [2, 4],
        'import/extensions': [
            'error',
            'always',
            {
                ts: 'never',
                tsx: 'never',
                js: 'never',
                jsx: 'never',
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ],
        // "no-unused-vars": "off",
        // "@typescript-eslint/no-unused-vars": "error",
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        // "no-shadow": "off",
        // "@typescript-eslint/no-shadow": "error",
        // "no-redeclare": "off",
        // "@typescript-eslint/no-redeclare": "error",
        // "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
        // "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
        // "react/jsx-wrap-multilines": [
        //     "error",
        //     {
        //         declaration: "parens",
        //         assignment: "parens",
        //         return: "parens",
        //         arrow: "parens",
        //         condition: "parens",
        //         logical: "parens",
        //         prop: "ignore",
        //     },
        // ],
        'react/jsx-props-no-spreading': [
            'error',
            {
                exceptions: ['Form', 'Form.Item'],
            },
        ],
        // "react/require-default-props": ["off"],
    },
};

module.exports = eslintConfig;
