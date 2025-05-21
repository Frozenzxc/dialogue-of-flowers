import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import stylistic from '@stylistic/eslint-plugin';

export default withNuxt(stylistic.configs['recommended'], eslintConfigPrettier, eslintPluginPrettierRecommended, {
    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        'vue/multi-word-component-names': 'off',
        'import/named': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/require-default-prop': 'off',
        'vue/valid-v-for': 'off',
        'vue/require-v-for-key': 'off',
        'vue/block-order': [
            'error',
            {
                order: ['script', 'template', 'style'],
            },
        ],
    },
});
