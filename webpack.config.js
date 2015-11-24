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
    new AppCachePlugin({
      cache: ['bundle.js'],
      //network: '*',
      //fallback: ['failwhale.jpg'],
      settings: ['prefer-online'],
      //exclude: ['file.txt', /.*\.js$/],  // Exclude file.txt and all .js files
      output: 'offline.appcache'
    }),
    // new ExtractTextPlugin("[name].css")
  ]
};