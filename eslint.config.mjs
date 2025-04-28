import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginStylistic from '@stylistic/eslint-plugin';

const config = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginStylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),
  pluginJs.configs.recommended,
  {
    ignores: [
      'dist/*',
      '.pnp.cjs',
      '.pnp.loader.mjs',
    ],
  },
];

export default config;
