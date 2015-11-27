var app = {
    title : 'Il Fatto Quotidiano - Web App',
    ui:{
        activeTab : 0,
        tabs:[
            {
                id : 'FQ',
                label : 'Il Fatto Quotidiano',
                color:'#de0000'
            },
            {
                id : 'TV',
                label : 'Il Fatto TV',
                color:'#404040'
            },
            {
                id : 'Magazine',
                label : 'FQ MAgazine',
                color:'#555a41'
            },
            {
                id : 'Blog',
                label : 'Blog',
                color:'#1faeae'
            }
        ]
    },
    storage:{}
};
module.exports = app;