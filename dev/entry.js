require("./style.css");
require('script!zepto.js/dist/zepto.js');
require('script!store.js/store.js');
require('script!ractive/ractive.js');  

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

function writeContent(response){
    var ractive = new Ractive({
        el: '#container',
        template: require('./test.template'),
        data: response
    });
}
