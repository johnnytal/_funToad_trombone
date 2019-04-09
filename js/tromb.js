var trombMain = function(game){
	prev_reading = 0;
	accelY = 0;
	notesToPlay = [];
};

trombMain.prototype = {
    create: function(){ 
    	game.stage.backgroundColor = '#0f5420';
    	
		notesToPlay = [
			sfx1 = game.add.audio('B1'),
			sfx2 = game.add.audio('C2'),
			sfx3 = game.add.audio('C_2'),
			sfx4 = game.add.audio('D2'),
			sfx5 = game.add.audio('D_2'),
			sfx6 = game.add.audio('E2'),
			sfx7 = game.add.audio('F2'),
			sfx8 = game.add.audio('G2')
		];
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
    	trombImg = game.add.image(200, 100, 'tromboneImg');
    	
        angleText = game.add.text(250, 50, "Play it!", {font: '32px', fill: 'white'});
        
       	try{window.addEventListener('deviceorientation', readTrombAccel);} catch(e){}
       	
       	initPlugIns();
    }
};

function readTrombAccel(event){
	accelY = Math.round((event.beta + 180) / 8.5) - 15;

	angleText.text = accelY;
	
	if (prev_reading > accelY && accelY < 8 && accelY > -1){
		notesToPlay[accelY].play();
	}
	
	prev_reading = accelY;
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(30, false);} catch(e){} // max media volume
}