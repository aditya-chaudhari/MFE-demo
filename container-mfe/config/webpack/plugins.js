'use strict';
const deps = require('../../package.json').dependencies;

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  new ModuleFederationPlugin({
    name: 'performanceMFE',
    filename: 'remoteEntry.js',
    remotes: {
      domainMFE: 'domainMFE@http://domain-mfe.com/remoteEntry.js',
      cartMFE: 'cartMFE@http://cart-mfe.com/remoteEntry.js',
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
