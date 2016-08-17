var app = require('../../config');
var adv = require('./adv.js');
var videos = require('./videos.js');
var carousels = require('./carousels.js');
require('script!SwipeView/src/swipeview.js');
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
        var articleDetailTemplate = require('raw!../../partials/articles.tpl');
        var template = new t(articleDetailTemplate);
        var fragment = template.render(app.currentIssue.contents[routeObj.cat]);
        placeholder.innerHTML=fragment;
        // show list
        articles.toggleListVisibility('');
    },
    showDetails: function(routeObj){
        var slides = app.currentIssue.contents[routeObj.cat].articles;
        var articleTemplate = require('raw!../../partials/article_detail.tpl');
        var template = new t(articleTemplate);
        // remove existing event listeners on swipeview carousel instance
        // by cloning and replacing its wrapper
        var el = document.getElementById('article-detail'),
        elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
        // init swipeview
        var swipeview = new SwipeView('#article-detail', {
        	numberOfPages: slides.length,
            loop: false,
        	hastyPageFlip: true,
            gotopage: routeObj.articleIndex
        });

        // Load initial data (3 slides)
        var l = slides.length > 3 ? 3 : slides.length;
        switch(l){
            case 1:
                // show single page
                var fragment = template.render(slides[0]);
                swipeview.masterPages[1].innerHTML=fragment;
            break;
            case 2:
                // show two pages
                var fragment_1 = template.render(slides[0]);
                var fragment_2 = template.render(slides[1]);
                swipeview.masterPages[1].innerHTML=fragment_1;
                swipeview.masterPages[2].innerHTML=fragment_2;
            break;
            default:
                // show swipeview carousel
                for (var i=0; i<l; i++) {
                    var page = i==0 ? slides.length-1 : i-1;
                    var fragment = template.render(slides[page]);
                    swipeview.masterPages[i].innerHTML=fragment;
                }
            break;
        }
        swipeview.onFlip(function(a){
            var $currentSlide = $('.swipeview-active');
            var currentIndex = $currentSlide[0].dataset.upcomingPageIndex;
        	for (var i=0; i<3; i++) {
        		var upcoming = swipeview.masterPages[i].dataset.upcomingPageIndex;
        		if (upcoming != swipeview.masterPages[i].dataset.pageIndex) {
                    var fragment = template.render(slides[upcoming]);
                	swipeview.masterPages[i].innerHTML=fragment;
        		}
        	}
            // ------------------------------
            videos.init();
            carousels.init();
            adv.setupDFPModules();
            var id = app.currentIssue.contents[routeObj.cat].articles[currentIndex].id;
            var u = app.currentIssue.contents[routeObj.cat].articles[currentIndex].url;
            var addr = '#/'+app.currentIssue.id+'/'+routeObj.cat+'/'+id+'/?a='+u;
            history.replaceState({'path': history.state.path}, null, addr);
        });
        articles.toggleListVisibility('none');
    },
    toggleListVisibility: function(disp){
        document.getElementById('list-scroller').style.display = disp;
    }
};
module.exports = articles;
