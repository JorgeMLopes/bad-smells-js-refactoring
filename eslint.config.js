import sonarjs from 'eslint-plugin-sonarjs';

export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    plugins: {
      sonarjs,
    },

    rules: {
      ...sonarjs.configs.recommended.rules,

      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-identical-functions': 'error',
    },
  },
];