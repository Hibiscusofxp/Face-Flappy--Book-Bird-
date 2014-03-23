var menu_state = {
    create: function() {

        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);

        var style = { font: "30px Arial", fill: "#ffffff" };
        var x = game.world.width/2;
        var y = game.world.height/2;

        var text = this.game.add.text(x, y - 50, "Press space to start", style);
        text.anchor.setTo(0.5, 0.5); 

        // If the user already played
        if (score > 0) {
            // Display its score
            var score_label = this.game.add.text(x, y + 50, "Score: " + score, style);
            score_label.anchor.setTo(0.5, 0.5); 
        }
    },

    start: function() {
        this.game.state.start('main');
    },
};