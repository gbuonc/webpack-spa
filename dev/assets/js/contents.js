var app = require('../../config');
require('script!ractive/ractive.min.js'); 

var contents = {
    init: function(){
        console.log('init'); 
        var ractive = new Ractive({
            el: '#tabs-scroller',
            template: require('../../templates/contents.tpl'),
            data: app.ui
        });
    }
};
module.exports = contents;