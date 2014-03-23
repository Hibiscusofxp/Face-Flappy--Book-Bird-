var load_state = {
    preload: function() {
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('bird', 'assets/48px-Facebook_like_thumb.png');
        this.game.load.image('pipe', 'assets/facebook-icon.png');
        this.game.load.audio('jump', 'assets/facebook_ping.mp3');
    },

    create: function() {
        this.game.state.start('menu');
    },

    update: function() {

    },
};