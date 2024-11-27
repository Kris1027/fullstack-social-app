import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
    // JavaScript recommended rules
    js.configs.recommended,

    // TypeScript recommended rules
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslintParser, // TypeScript parser
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
        },
    },

    // Main configuration
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        ignores: ['dist'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser, // Add browser globals
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier,
        },
        rules: {
            ...reactHooks.configs.recommended.rules, // React hooks rules
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prettier/prettier': 'warn', // Prettier linting
        },
    },
];
