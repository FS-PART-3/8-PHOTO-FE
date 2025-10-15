/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.history/**',
      '*.lock',
      '.env*',
      '.DS_Store',
    ],
  },
  ...compat.extends('airbnb', 'prettier'),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      'prettier/prettier': ['error'],
      'react/react-in-jsx-scope': 'off', // Next.js에서는 React import 불필요
      'react/prop-types': 'off', // prop-types 불필요
      'jsx-a11y/anchor-is-valid': 'off', // Next.js Link 컴포넌트 사용시
      'import/no-unresolved': 'off', // Next.js의 특수 경로 해결
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // JSX를 .js 파일에서도 허용
      'import/prefer-default-export': 'off', // 단일 export 시 default export 강제 비활성화
      camelcase: 'off', // Next.js 폰트 변수명 허용
    },
  },
];

export default eslintConfig;
