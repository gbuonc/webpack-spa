var app = {
    title : 'Il Fatto Quotidiano - Web App',
    contentEndPoint : 'https://st40.ilfattoquotidiano.it/wp-content/uploads/app.json',
    offline: {
        serviceWorker : false,
        appCache: false 
    },
    status:{
        internalNavigation : false
    },
    ui:{
        tabs:[]
    },
    debug: true
};
module.exports = app;
