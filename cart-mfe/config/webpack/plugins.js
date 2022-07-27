'use strict';
const deps = require('../../package.json').dependencies;

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  new ModuleFederationPlugin({
    name: 'cartMFE',
    filename: 'remoteEntry.js',
    exposes: {
      './cart': './src/cart.js',
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
