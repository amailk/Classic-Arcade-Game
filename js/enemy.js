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

    if (!player.win) {
        this.x += this.speed * dt;
    }

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
