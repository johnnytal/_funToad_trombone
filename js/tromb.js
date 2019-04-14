var trombMain = function(game){
	accelY = 0;
	
	DEFAULT_COLOR = '#0f5420';
	SOUND1COLOR = '#0541aab';
	SOUND2COLOR = '#0f229af';
	
	resetSfx1 = true;
	resetSfx2 = true;
};

trombMain.prototype = {
    create: function(){ 
		sfx1 = game.add.audio('tromb_short');
		sfx2 = game.add.audio('tromb_long');

		game.stage.backgroundColor = DEFAULT_COLOR;
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
    	trombImg = game.add.image(200, 100, 'tromboneImg');
    	
        angleText = game.add.text(300, 50, "Play it!", {font: '32px', fill: 'white'});
        
       	try{window.addEventListener('deviceorientation', readTrombAccel);} catch(e){}
       	
       	initPlugIns();
    }
};

function readTrombAccel(event){
	accelY = Math.round((event.beta + 180) / 8.5) - 15;
	angleText.text = accelY;
	
	if (accelY < 5 && !sfx1.isPlaying && resetSfx1){
		sfx1.play();
		
		resetSfx1 = false;
		
		if (sfx2.isPlaying){
			sfx2.stop();
		}
		
		navigator.vibrate(35);
	}
	
	if (accelY >= 5){
		resetSfx1 = true;
	}
	
	if (accelY < 2 && !sfx2.isPlaying && resetSfx2){
		sfx2.play();
		
		resetSfx2 = false;
		
		if (sfx1.isPlaying){
			sfx1.stop();
		}
		
		navigator.vibrate(50);
	}
	
	if (accelY >= 2){
		resetSfx2 = true;
	}
	
	if (sfx1.isPlaying){
		game.stage.backgroundColor = SOUND1COLOR;
	}
	else if(sfx2.isPlaying){
		game.stage.backgroundColor = SOUND2COLOR;
	}
	else{
		game.stage.backgroundColor = DEFAULT_COLOR;
	}
}

function initPlugIns(){
    try{window.plugins.insomnia.keepAwake();} catch(e){} // keep awake
    try{StatusBar.hide();} catch(e){} // hide status bar
    try{window.androidVolume.setMusic(100, false);} catch(e){} // max media volume
}