require('script!swiper/dist/js/swiper.min.js');
require('script!t.js/t.min.js');
var app = require('../../config');
var shell = {
    navbarTabs: {
        init: function(){
            var placeholder = document.getElementById('main-tabs');
            var articleListTemplate = document.getElementById('tabs-template').innerHTML
            var template = new t(articleListTemplate);
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
                app.status.internalNavigation = true;
                page('/issue/'+rel);
            });
        }
    },
    articleList:{
        init: function(){
            $('.list-scroller').on('click', '.article-detail-link', function(e){
                // set internal navigation flag
                app.status.internalNavigation = true;
                var $el = $(this);
                var rel = $el.attr('data-rel');
                var cat =$el.attr('data-cat');
                var url = $el.attr('href');
                page('/issue/'+cat+'/'+rel+'/'+url);
                e.preventDefault();
            })
        }
    }

}
module.exports = shell;
