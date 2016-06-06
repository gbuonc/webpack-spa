var app = {
    title : 'Il Fatto Quotidiano - Web App',
    contentEndPoint : 'https://st40.ilfattoquotidiano.it/wp-content/uploads/app.json',
    ui:{
        activeTab : 0,
        currentBar:{
            width:0,
            left:0,
        },
        // Cache DOM nodes
        articleList: document.getElementById('tabs-scroller'),
        tabs:[]
    }
};
module.exports = app;
