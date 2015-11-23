var AppCachePlugin = require('appcache-webpack-plugin');
module.exports = {
    context: __dirname + "/dev",
    entry: {
        javascript: "./entry.js",
        html: "./index.html",
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "file?name=[name].[ext]",},
            { test: /\.css$/, loader: "style!css" },
            { test: /\.template$/, loader: 'ractive' }
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
    })
  ]
};