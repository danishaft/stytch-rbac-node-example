import globals from 'globals'
import pluginJs from '@eslint/js'
import prettierConfig from "eslint-config-prettier";

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
        },
        rules: {
            // Avoid Bugs
            'no-console': 'warn',
            'no-undef': 'error',
            semi: 'error',
            'semi-spacing': 'error',

            // Best Practices
            eqeqeq: 'warn',
            'no-invalid-this': 'error',
            'no-return-assign': 'error',
            'no-unused-expressions': ['error', { allowTernary: true }],
            'no-useless-concat': 'error',
            'no-useless-return': 'error',
            'no-constant-condition': 'warn',
            'no-unused-vars': [
                'warn',
                { argsIgnorePattern: 'req|res|next|__' },
            ],

            // Enhance Readability
            indent: ['error', 4, { SwitchCase: 1 }],
            'no-mixed-spaces-and-tabs': 'warn',
            'space-before-blocks': 'error',
            'space-in-parens': 'error',
            'space-infix-ops': 'error',
            'space-unary-ops': 'error',
            quotes: ['error', 'single'],
            'linebreak-style': ['error', 'unix'],
            'max-len': ['error', { code: 200 }],
            'max-lines': ['error', { max: 500 }],
            'keyword-spacing': 'error',
            'multiline-ternary': ['error', 'never'],
            'no-mixed-operators': 'error',
            'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
            'no-whitespace-before-property': 'error',
            'nonblock-statement-body-position': 'error',
            'object-property-newline': [
                'error',
                { allowAllPropertiesOnSameLine: true },
            ],

            // ES6
            'arrow-spacing': 'error',
            'no-confusing-arrow': 'error',
            'no-duplicate-imports': 'error',
            'no-var': 'error',
            'object-shorthand': 'off',
            'prefer-const': 'error',
            'prefer-template': 'warn',
            'brace-style': ['off', 'stroustrup'],
            'comma-dangle': ['error', 'never'],
            'one-var': ['off'],
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
        },
    },
    pluginJs.configs.recommended,
    prettierConfig,
]
