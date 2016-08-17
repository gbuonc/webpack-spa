var app = require('../../config');
var articles = require('./articles.js');
var navbar = require('./navbar.js');
var routing = {
    getRoute: function(ctx){
        var category = ctx.params.ctg;
        var article = parseInt(ctx.params.article,10);
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
        // set navbar ...............
        navbar.setTabs(routeObj);

        if(typeof(routeObj.article) === "undefined"){
            articles.showList(routeObj); // show category list
        }else{
            articles.showDetails(routeObj); // show article details
        }
        // reset internal navigation flag after every request
        app.status.internalNavigation = false;
    }
};
module.exports = routing;
