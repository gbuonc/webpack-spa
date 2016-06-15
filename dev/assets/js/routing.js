var app = require('../../config');
var routing = {
    getRoute: function(ctx){
        // ctx comes from page.js
        var category = ctx.params.ctg;
        var article = ctx.params.article;
        /*  if category index doesn't exists in array (elementPos = -1) return first category list (0) ignoring article
            if category is ok, check if we have a valid article index
            if we don't have a correct article but category is ok show requested category list
            (we always return a category, with or without a corresponding article) */
        var routeObj = {};
        routeObj.cat = app.ui.tabs.map(function(x) {return x.id; }).indexOf(category);
        if(routeObj.cat === -1){
            routeObj.cat = 0;  // category does not exist, so show first cat list ignoring article
        }else{
            var articlesInCategory = app.ui.tabs[routeObj.cat].contents.length;
            article = parseInt(article, 10);
            if(article >= 0 && article < articlesInCategory){
                routeObj.article = article;  // set article only if cat is OK and article index is in range
            }
        }
        // highlight current tab
        routing.setTabs(routeObj);
        if(typeof(routeObj.article) === "undefined"){
            routing.showArticleList(routeObj.cat);
        }else{
            routing.showArticleDetails(routeObj);
        }
        // reset internal navigation flag after every request
        app.ui.internalNavigation = false;
    },
    setTabs: function(url){
        // set active item
        $('.tab-navigation').find('.swiper-slide').removeClass('active')
        .eq(url.cat).addClass('active');
        // slide to active tab only if we come from external source (i.e. social sharing), not by tapping internally
        if(!app.ui.internalNavigation){
            app.navTabs.slideTo(url.cat);
        }
    },
    showArticleList: function(i){
        var placeholder = document.getElementById('list-scroller');
        var template = new t(app.ui.articleDetailTemplate);
        app.ui.tabs[i].cat_id = i;
        var fragment = template.render(app.ui.tabs[i]);
        placeholder.innerHTML=fragment;
        // show list
        app.ui.articleList.style.display ='';
    },
    showArticleDetails: function(url){
        app.ui.articleDetail.innerHTML='';
        var template = new t(document.getElementById('article-template').innerHTML);
        var fragment = template.render(app.ui.tabs[url.cat]);
        app.ui.articleDetail.innerHTML=fragment;
        // init carousels
        var articlesNav = new Swiper('.article-navigation', {
            slidesPerView: 1,
            initialSlide: url.article
        });
        app.ui.articleList.style.display ='none';
    }
};
module.exports = routing;
