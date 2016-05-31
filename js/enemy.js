// Enemies our player must avoid
var Enemy = function(row, speed, sprite) {

    // The image/sprite for our enemies, this uses
    this.sprite = sprite;
    this.row = row;
    this.x = 0;

    this.speed = speed;
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {

    if (!player.win) {
        this.x += this.speed * dt;
    }

    if(this.x > canvasWidth + colWidth) {
        this.x = enemyStart;
    }

    var enemyRow = Math.floor(this.x / rowHeight);

    // Check for collision between enemy and player
    if (this.row == player.row && enemyRow == player.col) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.row * rowHeight - rowHeight / 4);
};
