require('script!t.js/t.min.js');
var app = require('../../config');
var tabs = {
    init: function(){
        var placeholder = document.getElementById('main-tabs');
        var template = new t(app.ui.articleListTemplate);
        var fragment = template.render(app.ui);
        placeholder.innerHTML=fragment;
            // init carousels
            app.navTabs = new Swiper('.tab-navigation', {
                slidesPerView: 'auto',
                freemode: true,
                freeModeSticky: true
            });
            app.navTabs.on('onTap', function(swiper, event){
                // routing
                var rel = event.target.attributes['data-rel'].value;
                // set internal navigation flag
                app.ui.internalNavigation = true;
                page('/issue/'+rel);
            });
    }
};
module.exports = tabs;
