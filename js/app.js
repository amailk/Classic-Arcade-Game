
var bug1 = new Enemy(1, 100,"images/enemy-bug-1.png");
var bug2 = new Enemy(2, 150, "images/enemy-bug-2.png");
var bug3 = new Enemy(3, 120,"images/enemy-bug-3.png");

var allEnemies = [bug1, bug2, bug3];

var player = new Player();

// Collectibles
var yellowStar = new Collectible("images/star-1.png", 100, 4, 5);
var purpleStar = new Collectible("images/star-2.png", 50, 2, 3);
var allCollectibles = [yellowStar, purpleStar];

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
