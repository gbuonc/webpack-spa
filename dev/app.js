require("swiper/dist/css/swiper.css");
require("./assets/css/style.scss");
require('script!zepto.js/dist/zepto.js');
require('script!store.js/store.js');
require('script!ractive/ractive.js');  
require('script!iscroll/build/iscroll.js');
require('script!ractive/ractive.js');  
require('script!swiper/dist/js/swiper.js');  

// 1 setup app UI -------------------------------
require('./assets/js/shell.js');

// 2 populate initial content -------------------


// 3 run forrest, run ---------------------------
var app ={
    init: function(){
        // hide splash page
        setTimeout(function(){
            $('.splash').hide();
        }, 1000);
    }
};

app.init();



if (!store.enabled) {
    alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
}

var latest = store.get('latest');

// first write from localstorage if available
if(latest){
    console.log('FROM LOCALSTORAGE');
    latest['Primo Piano'][0].debug ='FROM LOCALSTORAGE';
    writeContent(latest['Primo Piano'][0]);
}
// next try to get latest article
$.getJSON('https://st40.ilfattoquotidiano.it/wp-content/uploads/app.json', function(data){
    console.log('FROM NETWORK');
    data['Primo Piano'][0].debug ='FROM NETWORK';
    console.log(data['Primo Piano'][0]);
    store.set('latest', data);
    writeContent(data['Primo Piano'][0]);
});

$('.vertical-scroller-wrapper').each(function(i){
    var scrollers={};
    var id = $(this).attr('id');
    scrollers[i] = new IScroll('#'+id, {
        click: true
    });
});

function writeContent(response){
    var ractive = new Ractive({
        el: '#container',
        template: require('./templates/test.tpl'),
        data: response
    });
}
