import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import security from 'eslint-plugin-security';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
    {
        files: ['**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.node,
            sourceType: 'module',
            parser: tsParser,
        },
        plugins: {
            '@typescript-eslint': tseslintPlugin,
            'security': security,
            'prettier': prettier,
        },
        rules: {
            // Prettier Integration
            'prettier/prettier': 'error',

            // TypeScript ESLint Rules
            ...tseslintPlugin.configs.recommended.rules,

            // Security Plugin Rules
            ...security.configs.recommended.rules,

            'no-console': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            'no-unused-vars': 'off',
            'no-undef': 'off',
            'no-fallthrough': 'error',
        },
        ignores: ["dist/**/*"]
    },
];
