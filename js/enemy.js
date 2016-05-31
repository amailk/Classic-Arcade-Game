/**
 * @description Enemies our player must avoid
 * @constructor
 *
 * @param {number} row
 * @param {number} speed
 * @param {string} sprite
 */
var Enemy = function(row, speed, sprite) {
    this.sprite = sprite;
    this.row = row;
    this.x = 0;

    this.speed = speed;
};

/**
 * @description Update the enemy's position, required method for game
 *
 * @param {number} dt delta time between rendered frames
 */
Enemy.prototype.update = function(dt) {

    if (!player.win) {
        this.x += this.speed * dt;
    }

    if(this.x > app.CANVAS_WIDTH + app.COL_WIDTH) {
        this.x = app.ENEMY_START;
    }

    var enemyRow = Math.floor(this.x / app.ROW_HEIGHT);

    // Check for collision between enemy and player
    if (this.row == player.row && enemyRow == player.col) {
        player.reset();
    }
};

/**
 * @description Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.row * app.ROW_HEIGHT - app.ROW_HEIGHT / 4);
};
