var trombMain = function(game){
	accelY = 0;
	
	DEFAULT_COLOR = '#ffffff';
	SOUND1COLOR = '#ff00ff';
	SOUND2COLOR = '#00ff00';
	
	resetSfx1 = true;
	resetSfx2 = true;
	
	min_angle_1 = 5;
	min_angle_2 = 2;
};

trombMain.prototype = {
    create: function(){ 
		sfx1 = game.add.audio('tromb_short');
		sfx2 = game.add.audio('tromb_long');

		game.stage.backgroundColor = DEFAULT_COLOR;
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.6;
    	
    	
        angleText = game.add.text(300, 50, "Play it!", {font: '32px', fill: 'white'});
        
       	try{window.addEventListener('deviceorientation', readTrombAccel);} catch(e){}
       	
       	initPlugIns();
       	
       	gui();
    }
};

function readTrombAccel(event){
	accelY = roundIt((event.beta + 180) / 8.5 - 15);
	angleText.text = accelY;
	
	if (accelY < min_angle_1 && resetSfx1){
		sfx1.play();
		
		resetSfx1 = false;
			
		navigator.vibrate(35);
	}
	
	if (accelY >= min_angle_1){
		resetSfx1 = true;
	}
	
	if (accelY < min_angle_2 && !sfx2.isPlaying && resetSfx2){
		sfx2.play();
		
		resetSfx2 = false;

		navigator.vibrate(50);
	}
	
	if (accelY >= min_angle_2){
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

function gui(){
	
	var DISTANCE = 70;
	
    plus_accel_front = game.add.sprite(100, 180, 'plus');
    plus_accel_front.scale.set(1.5, 1.5);
    plus_accel_front.inputEnabled = true;
    plus_accel_front.events.onInputDown.add(function(){
    	min_angle_1 += 0.5;
    	backText.text = "Ang 1: " + roundIt(min_angle_1);
    	plus_accel_front.tint = 0xf04030;
    	setTimeout(function(){plus_accel_front.tint = 0xffffff;}, 100);
    }, this);
    
    minus_accel_front = game.add.sprite(300, 180, 'minus');
    minus_accel_front.scale.set(1.5, 1.5);
    minus_accel_front.inputEnabled = true;
    minus_accel_front.events.onInputDown.add(function(){
    	min_angle_1 -= 0.5;
    	backText.text = "Ang 1: " + roundIt(min_angle_1);
    	minus_accel_front.tint = 0xf04030;
    	setTimeout(function(){minus_accel_front.tint = 0xffffff;}, 100);
    }, this);
    
    backText = game.add.text(450, 180, "Ang 1: " + roundIt(min_angle_1),
    {font: '35px', fill: 'black'});

    plus_angle_front = game.add.sprite(100, 30, 'plus');
    plus_angle_front.scale.set(1.5, 1.5);
    plus_angle_front.inputEnabled = true;
    plus_angle_front.events.onInputDown.add(function(){
		min_angle_2 += 0.5;
    	frontText.text = "Ang 2: " + roundIt(min_angle_2);
    	plus_angle_front.tint = 0xf04030;
    	setTimeout(function(){plus_angle_front.tint = 0xffffff;}, 100);
    }, this);
    
    minus_angle_front = game.add.sprite(300, 30, 'minus');
    minus_angle_front.scale.set(1.5, 1.5);
    minus_angle_front.inputEnabled = true;
    minus_angle_front.events.onInputDown.add(function(){
    	min_angle_2 -= 0.5;
    	frontText.text = "Ang 2: " + roundIt(min_angle_2);
    	minus_angle_front.tint = 0xf04030;
    	setTimeout(function(){minus_angle_front.tint = 0xffffff;}, 100);
    }, this);
	
    frontText = game.add.text(450, 30, "Ang 2: " + roundIt(min_angle_2),
    {font: '35px', fill: 'black'});
}

function roundIt(_num){
	return Math.round(_num * 100) / 100;
}
