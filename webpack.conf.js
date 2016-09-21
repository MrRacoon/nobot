var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: './app/index.js',
  devtool: 'source-map',
  output: {
    filename: './dist/app.js'
  },
  externals: [nodeExternals()],
  target: 'node',

  module: {
    loaders: [
      { test: /\.js$/,
        excludes: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    resolve: ['js']
  }
};
