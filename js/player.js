/**
 * @description Represents the player
 * @constructor
 */
var Player = function() {
    this.sprite = "images/char-princess-girl.png";
    this.row = playerStartRow;
    this.col = playerStartCol;

    this.win = false;
    this.points = 0;
};

/**
 * @description Depending on the key pressed game actions take place
 * space = resets game at when the player wins
 * left, right, up, down = moves player.
 *
 * @param {string} key
 */
Player.prototype.handleInput = function(key) {
    if (this.win ) {
        if(key == "space") {
            this.reset();
        }

    } else {
        if (key === "left" && this.col > 0) {
            this.col -= 1;
        } else if (key === "right" && this.col < numCols - 1) {
            this.col += 1;
        }

        if (key == "up" && this.row > 0) {
            this.row -= 1;
        } else if (key == "down" && this.row < numRows - 1) {
            this.row += 1;
        }
    }

};

/**
 * @description When player moves to the top row game is marked as won.
 */
Player.prototype.update = function() {
    if(this.row === 0) {
        this.win = true;
    }
};

/**
 * @description Resets the player position and points.
 */
Player.prototype.reset = function() {
    this.row = playerStartRow;
    this.col = playerStartCol;

    this.win = false;
    this.points = 0;

    allCollectibles.forEach(function (collectible) {
        collectible.reset();
    });
};

/**
 * @description Render player and related entities.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col * colWidth, this.row * rowHeight - rowHeight / 4);

    if (this.win) {
        var imageWidth = 313;
        var imageHeight = 232;

        centerX = canvasWidth / 2 - imageWidth / 2;
        centerY = canvasHeight / 2 - imageHeight / 2;

        ctx.drawImage(Resources.get("images/won.png"), centerX, centerY);

    }
};

/**
 * @description Draws text at given x and y coordinates.
 *
 * @param {string} text
 * @param {number} x
 * @param {number} y
 */
Player.prototype.drawText = function(text,x,y) {

    ctx.drawText("Press SPACE to Play Again", canvasWidth / 2, canvasHeight * 0.9);
    ctx.drawText("Score: " + this.points, canvasWidth / 2, canvasHeight * 0.75);

    ctx.font = "24pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
};


