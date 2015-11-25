require("swiper/dist/css/swiper.css");
require("./assets/css/style.scss");
require('script!zepto.js/dist/zepto.js');
require('script!store.js/store.js');

var app = require('./config');

// 1 setup app UI -------------------------------
require('./assets/js/shell');

// 2 populate initial content -------------------
require('./assets/js/content.js');

// 3 run forrest, run ---------------------------
app.init = function(){
    // hide splash page
    setTimeout(function(){
        $('.splash').hide();
    }, 1000);
    if (!store.enabled) {
        alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
    }
};
app.init();