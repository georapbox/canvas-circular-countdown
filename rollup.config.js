// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const libraryName = 'CanvasCircularCountdown';

const banner = `/*!
 * ${pkg.name}
 * ${pkg.description}
 *
 * @version v${pkg.version}
 * @author ${pkg.author}
 * @homepage ${pkg.homepage}
 * @repository ${pkg.repository.url}
 * @license ${pkg.license}
 */`;

export default commandLineArgs => {
  const configs = [
    // UMD Development
    {
      input: 'src/index.js',
      output: {
        banner,
        name: libraryName,
        file: `dist/${libraryName}.umd.js`,
        format: 'umd'
      },
      plugins: [
        // Uncomment the following 2 lines if your library has external dependencies
        // resolve(), // teach Rollup how to find external modules
        // commonjs(), // so Rollup can convert external modules to an ES module
        babel({
          exclude: ['node_modules/**']
        })
      ]
    },
    // CommonJS (for Node) and ES module (for bundlers) build
    {
      input: 'src/index.js',
      external: [], // indicate which modules should be treated as external
      output: [
        {
          banner,
          file: `dist/${libraryName}.cjs.js`,
          format: 'cjs',
          exports: 'auto'
        },
        {
          banner,
          file: `dist/${libraryName}.esm.js`,
          format: 'es'
        }
      ],
      plugins: [
        babel({
          exclude: ['node_modules/**']
        })
      ]
    }
  ];

  if (commandLineArgs.environment === 'BUILD:production') {
    // Production
    configs.push({
      input: 'src/index.js',
      output: [
        {
          banner,
          name: libraryName,
          file: `dist/${libraryName}.umd.min.js`,
          format: 'umd'
        },
        {
          banner,
          file: `dist/${libraryName}.cjs.min.js`,
          format: 'cjs',
          exports: 'auto'
        },
        {
          banner,
          file: `dist/${libraryName}.esm.min.js`,
          format: 'es'
        }
      ],
      plugins: [
        // Uncomment the following 2 lines if your library has external dependencies
        // resolve(), // teach Rollup how to find external modules
        // commonjs(), // so Rollup can convert external modules to an ES module
        babel({
          exclude: ['node_modules/**']
        }),
        terser({
          output: {
            comments: /^!/
          }
        })
      ]
    });
  }

  return configs;
};
