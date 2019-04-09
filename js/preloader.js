var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){
    	game.load.image('bg', 'assets/images/bg.png');
        game.load.image('tromboneImg', "assets/images/trombone.png");

        game.load.audio("B1", "assets/audio/B1.mp3");
        game.load.audio("C_2", "assets/audio/C_2.mp3");
        game.load.audio("C2", "assets/audio/C2.mp3");
        game.load.audio("D_2", "assets/audio/D_2.mp3");
        game.load.audio("D2", "assets/audio/D2.mp3");
        game.load.audio("E2", "assets/audio/E2.mp3");
        game.load.audio("F2", "assets/audio/F2.mp3");
        game.load.audio("G2", "assets/audio/G2.mp3");
    },
    
    create: function(){
        this.game.state.start("Trombone"); 
    }
};