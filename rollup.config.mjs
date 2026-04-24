/* eslint-env node */
import { createRequire } from 'node:module';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssLit from 'rollup-plugin-postcss-lit';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const IS_DEV = !!process.env.ROLLUP_WATCH;

const serverOptions = {
  contentBase: ['./dist'],
  host: 'localhost',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

export default {
  input: 'src/body-miscale-card.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: IS_DEV,
    entryFileNames: 'body-miscale-card.js',
    inlineDynamicImports: true,
  },
  context: 'window',
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    replace({
      preventAssignment: true,
      values: {
        PKG_VERSION_VALUE: IS_DEV ? 'DEVELOPMENT' : pkg.version,
      },
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      sourceMap: IS_DEV,
    }),
    postcss({
      plugins: [
        postcssPresetEnv({
          stage: 1,
          features: {
            'nesting-rules': true,
          },
        }),
      ],
      extract: false,
      inject: false,
    }),
    postcssLit(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.ts', '.js'],
    }),
    IS_DEV && serve(serverOptions),
    !IS_DEV && terser({
      format: {
        comments: false,
      },
      compress: {
        pure_funcs: ['console.log', 'console.debug'],
        drop_debugger: true,
      },
    }),
  ].filter(Boolean),
};