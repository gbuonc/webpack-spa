var app = {
    title : 'Il Fatto Quotidiano - Web App',
    contentEndPoint : 'https://st40.ilfattoquotidiano.it/wp-content/uploads/app.json',
    ui:{
        // Cache DOM nodes
        articleList: document.getElementById('list-scroller'),
        articleContent: document.getElementById('article-detail')
    }
};
module.exports = app;
