var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
    	game.load.image('bg', 'assets/images/bg.png');
        game.load.image('tromboneImg', "assets/images/trombone.png");
        
        game.load.image('minus', "assets/images/minus.png");
        game.load.image('plus', "assets/images/plus.png");

        game.load.audio("tromb_long", "assets/audio/tromb_long.mp3");
        game.load.audio("tromb_short", "assets/audio/tromb_short.mp3");
    },
    
    create: function(){
        this.game.state.start("Trombone"); 
    }
};