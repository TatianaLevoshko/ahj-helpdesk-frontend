import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginStylistic from '@stylistic/eslint-plugin';

function cleanGlobals(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.trim(), value]),
  );
}

export default [
  {
    languageOptions: {
      globals: {
        ...cleanGlobals(globals.browser),
        ...cleanGlobals(globals.node),
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  },

  //  Стилистика кода
  pluginStylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),

  //  Базовые рекомендованные правила ESLint
  pluginJs.configs.recommended,

  // Файлы и папки, которые не проверяем
  {
    ignores: [
      'dist/**',
      '.pnp.cjs',
      '.pnp.loader.mjs',
    ],
  },
];
