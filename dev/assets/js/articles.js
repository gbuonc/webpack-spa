var app = require('../../config');
var adv = require('./adv.js');
var videos = require('./videos.js');
var carousels = require('./carousels.js');
require('script!swiper/dist/js/swiper.min.js');
require('script!t.js/t.min.js');
var articles = {
    init: function(){
        $('.list-scroller').on('click', '.article-detail-link', function(e){
            // set internal navigation flag
            app.status.internalNavigation = true;
            var $el = $(this), rel = $el.attr('data-rel'), cat =$el.attr('data-cat'), url = $el.attr('href');
            page('/'+app.currentIssue.id+'/'+cat+'/'+rel+'/'+url);
            e.preventDefault();
        })
    },
    showList: function(routeObj){
        document.getElementById('article-detail').innerHTML='';
        var placeholder = document.getElementById('list-scroller');
        var articleDetailTemplate = document.getElementById('list-template').innerHTML;
        var template = new t(articleDetailTemplate);
        var fragment = template.render(app.currentIssue.contents[routeObj.cat]);
        placeholder.innerHTML=fragment;
        // show list
        articles.toggleListVisibility('');
    },
    showDetails: function(routeObj){
        var articleDetail = document.getElementById('article-detail');
        var template = new t(document.getElementById('article-template').innerHTML);
        var fragment = template.render(app.currentIssue.contents[routeObj.cat]);
        articleDetail.innerHTML=fragment;
        // init carousels
        var articlesNav = new Swiper('.article-navigation', {
            slidesPerView: 1,
            touchAngle: 15,
            initialSlide: routeObj.articleIndex,
            onInit: function(swiper){
                videos.init();
                carousels.init();
                adv.setupDFPModules(routeObj.articleIndex);
            }
        });
        articlesNav.on('onSlideChangeEnd', function(swiper){
            // pause all active videos in current category
            videos.pauseAll();
            carousels.showGalleryBtn();
            // change url via location href for sharing purposes
            var id = app.currentIssue.contents[routeObj.cat].articles[swiper.activeIndex].id;
            var u = app.currentIssue.contents[routeObj.cat].articles[swiper.activeIndex].url;
            location.href='/#/issue/'+routeObj.cat+'/'+id+'/?a='+u;
            // init in page adv
            adv.setupDFPModules(swiper.activeIndex);
        });
        articles.toggleListVisibility('none');
    },
    toggleListVisibility: function(disp){
        document.getElementById('list-scroller').style.display = disp;
    }
};
module.exports = articles;
