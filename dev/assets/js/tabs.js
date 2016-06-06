var app = require('../../config');
require('script!ractive/ractive.min.js');
var tabs = {
    init: function(){
        tabs.ractive = new Ractive({
            el: '#main-tabs',
            template: require('../../templates/tabs.tpl'),
            data: app.ui
        });
        tabs.ractive.on('showArticleList', function(e){
            // show article list if previously hidden
            app.ui.articleList.style.display ='';
        })
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
