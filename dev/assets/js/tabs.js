var app = require('../../config');
require('script!ractive/ractive.min.js'); 

var tabs = {
    init: function(){
        tabs.ractive = new Ractive({
            el: '#main-tabs',
            template: require('../../templates/tabs.tpl'),
            data: app.ui
        });
        // observe active tab state
        tabs.ractive.observe('tabs.*.active', function(newVal, oldVal, keyPath){
            tabs.ractive.set('tabs.*.active', false);
            tabs.ractive.set(keyPath, true);
        });
        // set first active tab
        tabs.ractive.set('tabs.0.active', true);
    }
};
module.exports = tabs;