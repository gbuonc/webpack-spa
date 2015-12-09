var app = require('../../config');
require('script!ractive/ractive.min.js'); 

var tabs = {
    init: function(){
        var ractive = new Ractive({
            el: '#main-tabs',
            template: require('../../templates/tabs.tpl'),
            data: app.ui
        });
    }
};
module.exports = tabs;