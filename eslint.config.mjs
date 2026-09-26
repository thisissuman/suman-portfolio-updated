import { defineConfig, globalIgnores } from 'eslint/config';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
export default defineConfig([
  globalIgnores([
    '.next/**',
    '.legacy/**',
    'next-env.d.ts',
    'playwright-report/**',
    'test-results/**',
  ]),
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@next/next': nextPlugin, 'react-hooks': reactHooks },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  { files: ['*.config.js'], rules: { '@typescript-eslint/no-require-imports': 'off' } },
]);
