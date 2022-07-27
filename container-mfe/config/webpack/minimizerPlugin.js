'use strict';

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = [
    new CssMinimizerPlugin({
      parallel: false,
      minimizerOptions: {
        processorOptions: {
          parser: safePostCssParser,
          map: false,
        },
      },
    }),
    // need to check best way to minimize image
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['imagemin-mozjpeg', { quality: 80 }],
          ],
        },
      },
    }),
  ];
