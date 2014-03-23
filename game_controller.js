// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

var score = 0;

game.state.add('load', load_state);  
game.state.add('menu', menu_state);  
game.state.add('main', main_state);  
game.state.start('laod'); 
    