var app = require('../../config');
var tabs = require('./tabs.js');
require('script!swiper/dist/js/swiper.min.js');  
require('script!fastclick/lib/fastclick.js');

var ui = {
    init: function(){
        FastClick.attach(document.body);
        var activeTab = 0;
        var $tabPos = $('.currentBar');
        var $navTabs = $('.tab-toggle');
        setTimeout(function(){
            // init carousels
            var navTabs = new Swiper('.tab-navigation', {
                slidesPerView: 'auto',
                touchRatio: 1.5
            });
            var mainTabs = new Swiper ('.tabs-scroller',{
                threshold:50
            });

            navTabs.on('onTap', function(swiper, event){
                mainTabs.slideTo(swiper.clickedIndex);
                tabs.ractive.set('tabs.'+swiper.clickedIndex+'.active', true);
            });
            mainTabs.on('onTransitionEnd', function(swiper){
                navTabs.slideTo(swiper.activeIndex);
                tabs.ractive.set('tabs.'+swiper.activeIndex+'.active', true);
            });
        },0);
    }
};
module.exports = ui;