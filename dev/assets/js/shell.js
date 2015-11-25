var app = require('../../config');

require('script!swiper/dist/js/swiper.js');  
require('script!ractive/ractive.js'); 
require('script!velocity/velocity.js');
require('script!fastclick/lib/fastclick.js');

// prepare interface
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
FastClick.attach(document.body);

console.log(app);
var ui = {
    init: function(){
        // write shell to canvas
        var ractive = new Ractive({
            el: '#main-content',
            template: require('../../templates/shell.tpl'),
            data: app.ui
        });
        var activeTab = 0;
        var $tabPos = $('.currentBar');
        var $navTabs = $('.tab-toggle');

        // init tabs
        var initTabs = function(){
            var currentSlide = navTabs.slides[activeTab];
            var w = currentSlide.clientWidth;
            $tabPos.css('width',w+'px').hide();
            $(currentSlide).addClass('active');
        };
        var navTabs = new Swiper('.tab-navigation', {
            slidesPerView: 'auto',
            touchRatio: 1.5,
            onTap(swiper, event){
                mainTabs.slideTo(swiper.clickedIndex);
            }
        });
        var mainTabs = new Swiper ('.tabs-scroller',{
            threshold:30,
            onInit(swiper){
                initTabs();
            },
            onTransitionEnd(swiper){
                var currentSlide = navTabs.slides[swiper.activeIndex];
                var offset = navTabs.translate;
                var w = currentSlide.clientWidth;
                var position = currentSlide.offsetLeft;
                // animate active tabs placeholder
                $navTabs.removeClass('active');
                $tabPos.show().velocity({
                    translateZ: 0, // Force HA by animating a 3D property
                    translateX: position+offset+'px',
                    width: w
                }, {
                    duration: 500,
                    complete: function(){
                        $(currentSlide).addClass('active');
                        $tabPos.hide();
                    }
                });
            }
        });
        // link nav tabs to main tabs
        mainTabs.params.control = navTabs;
    }
};

ui.init();




