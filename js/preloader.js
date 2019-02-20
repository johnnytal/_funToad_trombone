var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
        game.load.audio('trombone', 'assets/audio/trombone.mp3');
    },
    
    create: function(){
        this.game.state.start("Shaker"); 
    }
};