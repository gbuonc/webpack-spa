var app = require('../../config');
var adv = require('./adv.js');
var routing = {
    getRoute: function(ctx){
        // ctx comes from page.js
        var category = ctx.params.ctg;
        var article = parseInt(ctx.params.article,10);
        console.log('GET ROUTE',category, article );
        /*  if category index doesn't exists in array (elementPos = -1) return homepage ignoring article
            if category is ok, check if we have a valid article index
            if we don't have a correct article but category is ok show requested category list
            (we always return a category, with or without a corresponding article) */
        var routeObj = {};

        // set category..............
        if(!app.currentIssue.contents[category]){
            page('/'+app.currentIssue.id+'/homepage'); // if category does not exists, show homepage
        }else{
            routeObj.cat = category;
            routeObj.catIndex = app.currentIssue.tabs.map(function(x) {return x.slug; }).indexOf(category);
        }
        // set article...............
        var articlesInCategory = app.currentIssue.contents[category].articles.map(function(x) {return x.id; });
        var articleExists = (articlesInCategory.indexOf(article) >=0) ? true : false;
        if(article && articleExists){
            routeObj.article = article;
            routeObj.articleIndex = articlesInCategory.indexOf(article);
        }
        console.log(routeObj);
        routing.setTabs(routeObj);
        if(typeof(routeObj.article) === "undefined"){
            routing.showArticleList(routeObj); // show category list
        }else{
            routing.showArticleDetails(routeObj); // show article details
        }
        // reset internal navigation flag after every request
        app.status.internalNavigation = false;
    },
    setTabs: function(url){
        // highlight current tab
        $('.tab-navigation').find('.swiper-slide').removeClass('active')
        .eq(url.catIndex).addClass('active');
        // slide to active tab only if we come from external source (i.e. social sharing), not by tapping internally
        if(!app.status.internalNavigation){
            app.navTabs.slideTo(url.catIndex);
        }
    },
    showArticleList: function(routeObj){
        var placeholder = document.getElementById('list-scroller');
        var articleDetailTemplate = document.getElementById('list-template').innerHTML;
        var template = new t(articleDetailTemplate);
        var fragment = template.render(app.currentIssue.contents[routeObj.cat]);
        placeholder.innerHTML=fragment;
        // show list
        routing.toggleArticleListVisibility('');
    },
    showArticleDetails: function(routeObj){
        var articleDetail = document.getElementById('article-detail');
        articleDetail.innerHTML='';
        var template = new t(document.getElementById('article-template').innerHTML);
        var fragment = template.render(app.currentIssue.contents[routeObj.cat]);
        articleDetail.innerHTML=fragment;
        // init carousels
        var articlesNav = new Swiper('.article-navigation', {
            slidesPerView: 1,
            touchAngle: 15,
            initialSlide: routeObj.articleIndex,
            onInit: function(swiper){
                adv.setupDFPModules(routeObj.articleIndex);
            }
        });
        articlesNav.on('onSlideChangeEnd', function(swiper){
            var id = app.currentIssue.contents[routeObj.cat].articles[swiper.activeIndex].id;
            var u = app.currentIssue.contents[routeObj.cat].articles[swiper.activeIndex].url;
            // just change url via location href for sharing purposes
            location.href='/#/issue/'+routeObj.cat+'/'+id+'/?a='+u;
            adv.setupDFPModules(swiper.activeIndex);
        });
        routing.toggleArticleListVisibility('none');
    },
    toggleArticleListVisibility: function(disp){
        document.getElementById('list-scroller').style.display = disp;
    }
};
module.exports = routing;
