var app = {
    title : 'Il Fatto Quotidiano - Web App',
    contentEndPoint : 'https://st40.ilfattoquotidiano.it/wp-content/uploads/app.json',
    ui:{
        // Cache DOM nodes
        articleList: document.getElementById('list-scroller'),
        articleDetail: document.getElementById('article-detail'),
        articleListTemplate : document.getElementById('tabs-template').innerHTML,
        articleDetailTemplate : document.getElementById('list-template').innerHTML
    }
};
module.exports = app;
