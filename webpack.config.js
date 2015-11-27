var webpack = require('webpack');
var AppCachePlugin = require('appcache-webpack-plugin');
module.exports = {
  context: __dirname + "/dev",
  entry: {
      javascript: "./app.js",
      html: "./index.html",
      //json: "./manifest.json"
  },
  output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
  },
  module: {
      loaders: [
          { test: /\.html$/,          loader: 'file?name=[name].[ext]',},
          //{ test: /\.json$/,          loader: 'file?name=[name].[ext]',},
          { test: /\.css$/,           loader: 'style!css' },
          { test: /\.scss$/,          loader: 'style!css!autoprefixer!sass'},
          { test: /\.(png|jpg)$/,     loader: 'url?limit=25000'},
          { test: /\.tpl$/,           loader: 'ractive' }
      ]
  },
  resolve: {
      modulesDirectories: ['node_modules', 'bower_components'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      compress: {
        warnings: false
      }
    }),
    new AppCachePlugin({
      cache: ['bundle.js'],
      settings: ['prefer-online'],
      output: './manifest.appcache'
    })
  ]
};