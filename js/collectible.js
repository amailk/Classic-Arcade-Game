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

        this.visible = false;
    }

    if(!this.visible && this.countShown < this.appearLimit) {
        this.row = randomIntInRange(1,3);
        this.col = randomIntInRange(0,4);

        this.visible = true;
        this.timeShown = 0;
        this.countShown ++;
    }

    if(!player.win && this.visible) {
        this.timeShown += dt;
        if(this.timeShown > this.timeLimit) {
            this.visible = false;

            this.row = randomIntInRange(1,3);
            this.col = randomIntInRange(0,4);
        }
    }
};

Collectible.prototype.reset = function() {
    this.timeShown = 0;
    this.visible = false;
    this.countShown = 0;
};

var randomIntInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};