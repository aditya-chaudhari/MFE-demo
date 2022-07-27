const plugins = require('./plugins.js');
const loaders = require('./loaders.js');
const minimizerPlugins = require('./minimizerPlugin.js');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  target: 'web',
  output: {
    path: `${path.resolve(__dirname, '../..')}/dist`,
    filename: '[name].bundle.js',
  },
  devServer: {
    port: 3000,
    allowedHosts: "all"
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      ...minimizerPlugins,
    ],
  },
  module: {
    rules: [
      ...loaders,
    ],
  },
  plugins: [
    ...plugins,
  ],
};
