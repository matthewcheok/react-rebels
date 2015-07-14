var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.resolve(__dirname, 'src')
    }]
  }
};
