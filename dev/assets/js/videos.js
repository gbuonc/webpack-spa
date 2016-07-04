var app = require('../../config');
var utils = require('./utils.js');
var videos = {
    activePlayers:[],
    init: function(){
        var self = this;
        // init all brightcove video players in current category
        self.activePlayers = [];
        $('.videoplayer').each(function(i){
            var videoId = $(this).attr('data-video-id');
            var videoPlayer = '<video id="bcPlayer_'+videoId+'" data-account="1328010481001" data-embed="default" data-player ="SJvcSUDx" data-video-id="'+videoId+'" class="bcPlayer" controls></video>';
            $(this).find('.player-wrapper').html(videoPlayer);
            self.activePlayers.push(bc(document.getElementById('bcPlayer_'+videoId)));
        });
    },
    pauseAll: function(){
        // pause all videos in category
        for(var i=0, l= this.activePlayers.length; i<l; i++){
            this.activePlayers[i].pause();
        }
    }
};
module.exports = videos;
