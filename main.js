// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() { 
		// Function called first to load all the assets
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('bird', 'assets/48px-Facebook_like_thumb.png');
        this.game.load.image('pipe', 'assets/facebook-icon.png');
        this.game.load.audio('jump', 'assets/facebook_ping.mp3');
    },

    create: function() { 
    	// Fuction called after 'preload' to setup the game    

        // Bird part
        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.jump_sound = this.game.add.audio('jump');
        this.bird.body.gravity.y = 1000;
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this);
        this.bird.anchor.setTo(-0.2, 0.5);

        // Pipe part
        this.pipes = this.game.add.group();
        this.pipes.createMultiple(20, 'pipe');
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);     // pass function object no ()!
        // wrong:  this.timer = this.game.events.loop(1500, this.add_row_of_pipes(), this);

        this.score = -1;
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "start", style);
    },

    jump: function() {
        if (this.bird.is_alive == false)
            return;

        this.bird.body.velocity.y = -350;
        var animation = this.game.add.tween(this.bird);
        animation.to({angle: -20}, 100);
        animation.start(); 

        this.jump_sound.play();
    },

    add_row_of_pipes: function() {
        var hole = Math.floor((Math.random() * 5) + 1);
        for (var i = 0; i < 8; i++) {
            if (i != hole && i != hole + 1) {
                var x = 400;
                var y = i * 60 + 10;
                var pipe = this.pipes.getFirstDead();
                pipe.reset(x,y);
                pipe.body.velocity.x = -200; 
                pipe.outOfBoundsKill = true;
            }
        }
        this.score += 1;
        this.label_score.content = this.score;
    },


    
    update: function() {
		// Function called 60 times per second

        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }

        if (this.bird.inWorld == false)
            this.restart_game();

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipes, null, this);
    },

    hit_pipes: function() {

        if (this.bird.is_alive == false)
            return;

        this.bird.is_alive = false;

        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive( function(p) {
            p.body.velocity.x = 0;
        }, this)
    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);
        this.game.state.start('main');
    },
};


// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 