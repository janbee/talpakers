const CracoAlias = require('craco-alias');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.paths.json');

module.exports = {
  jest: {
    configure: {
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
    },
  },
  style: {
    css: {
      loaderOptions: {
        modules: {
          // Export class names from CSS modules as original and in camelCase
          // Say your class is called .top-bar, then you can refer to it
          // in your *.jsx/*.tsx files as styles["top-bar"] or styles.topBar
          // See https://github.com/webpack-contrib/css-loader#exportlocalsconvention
          exportLocalsConvention: 'camelCase',
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: './src',
        /* tsConfigPath should point to the file where "baseUrl" and "paths" are specified*/
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
