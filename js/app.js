
var allEnemies = [new Enemy(1, 100), new Enemy(2, 150), new Enemy(3, 120)];

var player = new Player();

// Collectibles
var starCollectible = new Collectible("images/Star.png", 100, 3, 4, 4, 5);
var allCollectibles = [starCollectible];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// left up right down- need to call a handleInput methods = increment or decrement x and y values. left= move the player on the y axis.
//need to define another handleInput that will listen to your keyboard strokes.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
