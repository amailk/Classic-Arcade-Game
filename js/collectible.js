/**
 * @description Represents a collectible.
 * @constructor
 * @param {string} sprite
 * @param {number} points
 * @param {number} appearLimit
 * @param {number} timeLimit
 */
var Collectible = function(sprite, points, appearLimit, timeLimit) {
    this.sprite = sprite;
    this.points = points;
    this.timeLimit = timeLimit;
    this.appearLimit = appearLimit;

    this.timeShown = 0;
    this.visible = false;
    this.countShown = 0;
    this.row = 0;
    this.col = 0;
};

/**
 * @description Draws collectibles on the baord
 */
Collectible.prototype.render = function() {
    if (this.visible) {
        ctx.drawImage(Resources.get(this.sprite), this.col * app.COL_WIDTH, (this.row * app.ROW_HEIGHT) - app.ROW_HEIGHT / 2);
    }
};

/**
 * @description Check for collision between player and collectible. Move collectibles to random spaces.
 *
 * @param {number} dt delta time between rendered frames
 */
Collectible.prototype.update = function(dt) {

    if(this.visible && this.row == player.row && this.col == player.col) {
        player.points += this.points;

        this.visible = false;
    }

    if(!this.visible && this.countShown < this.appearLimit) {
        this.randomizePosition();

        this.visible = true;
        this.timeShown = 0;
        this.countShown ++;
    }

    if(!player.win && this.visible) {
        this.timeShown += dt;
        if(this.timeShown > this.timeLimit) {
            this.visible = false;

            this.randomizePosition();
        }
    }
};

/**
 * @description Randomizes the collectible's position within the board.
 */
Collectible.prototype.randomizePosition = function () {
    this.row = randomIntInRange(1,3);
    this.col = randomIntInRange(0,4);

    while(collectibleCollision()){
        this.row = randomIntInRange(1,3);
        this.col = randomIntInRange(0,4);
    }
};

/**
 * @description Resets collectible
 */
Collectible.prototype.reset = function() {
    this.timeShown = 0;
    this.visible = false;
    this.countShown = 0;
};

/**
 * @description Generate random number between min and max.
 * Found via: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 * @param {number} min
 * @param {number} max
 * @returns {number} A random number between min and max.
 */
var randomIntInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description Check for collectible collisions.
 * @returns {boolean} Collectibles collide.
 */
var collectibleCollision = function() {
    var c1 = allCollectibles[0];
    var c2 = allCollectibles[1];

    if (c1.col == c2.col && c1.row == c2.row) {
        return true;
    }

    return false;
};