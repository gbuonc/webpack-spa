var app = require('../../config');
require('script!swiper/dist/js/swiper.min.js');
require('script!t.js/t.min.js');
var navbar = {
    init: function(){
        var placeholder = document.getElementById('main-tabs');
        var articleListTemplate = document.getElementById('tabs-template').innerHTML
        var template = new t(articleListTemplate);
        var fragment = template.render(app.currentIssue);
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
            app.status.internalNavigation = true;
            page('/'+app.currentIssue.id+'/'+rel);
        });
    },
    setTabs: function(url){
        // highlight current tab
        $('.tab-navigation').find('.swiper-slide').removeClass('active')
        .eq(url.catIndex).addClass('active');
        // slide to active tab only if we come from external source (i.e. social sharing), not by tapping internally
        if(!app.status.internalNavigation){
            app.navTabs.slideTo(url.catIndex);
        }
    }
};
module.exports = navbar;
