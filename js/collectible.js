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

// Draws collectibles on the baord
Collectible.prototype.render = function() {
    if (this.visible) {
        ctx.drawImage(Resources.get(this.sprite), this.col * colWidth, (this.row * rowHeight) - rowHeight / 2);
    }
};

// Check for collision between player and collectible
// Move collectibles to random spaces.
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

// Randomizes the collectible's position within the board.
Collectible.prototype.randomizePosition = function () {
    this.row = randomIntInRange(1,3);
    this.col = randomIntInRange(0,4);

    while(collectibleCollision()){
        this.row = randomIntInRange(1,3);
        this.col = randomIntInRange(0,4);
    }
};

// Resets collectible
Collectible.prototype.reset = function() {
    this.timeShown = 0;
    this.visible = false;
    this.countShown = 0;
};

// Found via: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
var randomIntInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Check for collectible collisions.
var collectibleCollision = function() {
    var c1 = allCollectibles[0];
    var c2 = allCollectibles[1];

    if (c1.col == c2.col && c1.row == c2.row) {
        return true;
    }

    return false;
};