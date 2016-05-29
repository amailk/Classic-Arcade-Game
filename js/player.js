var Player = function() {
    this.sprite = "images/char-princess-girl.png";
    this.row = 5;
    this.col = 2;

    this.win = false;
    this.points = 0;
};

Player.prototype.handleInput = function(key) {
    if (this.win ) {
        if(key == "space") {
            player.reset();
        }
    } else {
        if (key === "left" && this.col > 0) {
            this.col -= 1;
        } else if (key === "right" && this.col < 4) {
            this.col += 1;
        }

        if (key == "up" && this.row > 0) {
            this.row -= 1;
        } else if (key == "down" && this.row < 5) {
            this.row += 1;
        }
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
    this.points = 0;

    allCollectibles.forEach(function(collectible){
        collectible.reset();
    });
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
