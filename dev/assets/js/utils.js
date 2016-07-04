var app = require('../../config');
var utils = {
    formatJson : function(issue){
        // json structure ........
        app.currentIssue = {
            id: issue['id'],
            tabs: [],
            contents:{
                homepage:{
                    articles:[]
                }
            }
        };
        // temporary array to store posts id
        tmpArr= [];
        issue.posts.map(function(obj){ tmpArr.push(obj.id) });
        // tabs ...................
        for(key in issue.categories){
            app.currentIssue.tabs.push(issue.categories[key]);
        }
        // transform post type in a object format suitable for templates
        for(index in issue.posts){
            var post = issue.posts[index];
            var oldPostType = post.post_type ? post.post_type : 'article';
            var newPostType = {};
            newPostType['is_'+oldPostType] = true;
            post.post_type = newPostType;
            console.log(post.title, newPostType);
        }

        // homepage ...............
        for(var i = 0, l=issue.homepage.length; i<l; i++){
            // get id of articles in homepage
            var id = parseInt(issue.homepage[i].postid, 10);
            // find its position in posts array
            var index = tmpArr.indexOf(id);
            if(index != -1){
                // push article obj to homepage array
                var tempObj = JSON.parse(JSON.stringify(issue.posts[index])); // clone obj by value, not reference
                tempObj.isInHomepage = true;
                app.currentIssue.contents.homepage.articles.push(tempObj);
            }
        }
        // all categories ...........
        for(key in issue.categories){
            // create an array for every category
            app.currentIssue.contents[key] = {};
            app.currentIssue.contents[key].articles = [];
            for(var i = 0, l=issue.categories[key].posts.length; i<l; i++){
                // get id of articles in current category
                var postId = parseInt(issue.categories[key].posts[i], 10);
                // find its position in posts array
                var index = tmpArr.indexOf(postId);
                if(index != -1){
                    // push article obj to category array
                    app.currentIssue.contents[key].articles.push(issue.posts[index]);
                }
            }
        }
        console.log(app.currentIssue);
    },
    log: function(message){
        if(app.debug){
            console.debug('[IFQ >> '+message+']');
        }
    }
};
module.exports = utils;
