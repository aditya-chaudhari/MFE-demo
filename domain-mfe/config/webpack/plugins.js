'use strict';
const deps = require('../../package.json').dependencies;

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  new ModuleFederationPlugin({
    name: 'domainMFE',
    filename: 'remoteEntry.js',
    exposes: {
      './search': './src/search/index.js',
    },
    shared: {
      ...deps,
      react: {
        singleton: true,
        requiredVersion: deps.react,
        eager: true
      },
      'react-dom': {
        singleton: true,
        eager: true
      },
    },
  }),
  new HtmlWebpackPlugin({
    template: './public/index.html',
  }),
];
