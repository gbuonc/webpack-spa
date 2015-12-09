require("./assets/css/style.scss");
require('script!zepto.js/dist/zepto.min.js');
require('script!zepto.js/src/callbacks.js');
require('script!zepto.js/src/deferred.js');
require('script!offline/offline.min.js');
require('script!localforage/dist/localforage.min.js');

console.log('----------------------\nFQ WebApp BUILD VERSION '+ Date.now()+'\n----------------------');

var app = require('./config');
Offline.options.checkOnLoad = true;
Offline.on('down', function(){
    alert('offline :-(');
});

require('./assets/js/bootstrap.js');
