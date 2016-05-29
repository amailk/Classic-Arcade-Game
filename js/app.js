// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png"; //enemy's attributes(variables), row and speed are parameters.
    this.row = row;
    this.x = 0;

    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // dt parameter is going to be multiplied with the movement of the bug for smooth movements.dw about it

    this.x += this.speed * dt;

    if(this.x > 550) {
        this.x = -100;
    }
    //Check for collision between enemy and player
    if ((this.row == player.row) &&(Math.floor(this.x/83) == player.col)) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, (this.row*83)-20)
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = "images/char-princess-girl.png";
    this.reset();

    this.win = false;
    this.points = 0;
};

Player.prototype.handleInput = function(dir) {
    if (dir === "left" && this.col > 0) {
        this.col -= 1;
    } else if (dir === "right" && this.col < 4) {
        this.col += 1;
    }

    if (dir == "up" && this.row > 0) {
        this.row -= 1;
    } else if (dir == "down" && this.row < 5) {
        this.row += 1;
    }

};

Player.prototype.update = function() {
    if(this.row == 0) {
        this.win = true;

    }
};

Player.prototype.reset = function() {
    this.row = 5;
    this.col = 2;

    this.win = false;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col * 101, (this.row*83)-40);

    if (this.win) {
        // canvas center - image center
        centerX = 505/2 - 313/2;
        centerY = 606/2 - 232/2;
        ctx.drawImage(Resources.get("images/won.png"), centerX, centerY);

    }
};

var Collectible = function(sprite, points, row, col, appearLimit, timeLimit) {
    this.sprite = sprite;
    this.points = points;
    this.row = row;
    this.col = col;
    this.timeLimit = timeLimit;
    this.appearLimit = appearLimit;

    this.timeShown = 0;
    this.visible = false;
    this.countShown = 0;
};

Collectible.prototype.render = function() {
    if (this.visible) {
        ctx.drawImage(Resources.get(this.sprite), this.col * 101, (this.row * 83) - 40);
    }
};

Collectible.prototype.update = function(dt) {
    // Check for collision between player and collectible
    if(this.visible && this.row == player.row && this.col == player.col) {
        player.points += this.points;
        console.log(player.points);

        this.row = randomIntInRange(1,3);
        this.col = randomIntInRange(0,4);

    }

    if(!this.visible && this.countShown < this.appearLimit) {
        this.visible = true;
        this.timeShown = 0;
        this.countShown ++;
    }

    if(this.visible) {
        this.timeShown += dt;
        if(this.timeShown > this.timeLimit) {
            this.visible = false;

            this.row = randomIntInRange(1,3);
            this.col = randomIntInRange(0,4);
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(1, 100), new Enemy(2, 150), new Enemy(3, 120)];
// Place the player object in a variable called player
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
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});




// add in player class similar to the enemy
// additional functionailty to check collision, when a bug collides with the player the game has to reset!
// look through whats here! most code should go on app.js

var randomIntInRange = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};