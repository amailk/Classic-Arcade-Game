/**
 * @description Represents the player
 * @constructor
 */
var Player = function() {
    this.sprite = "images/char-princess-girl.png";
    this.row = app.PLAYER_START_ROW;
    this.col = app.PLAYER_START_COL;

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
        } else if (key === "right" && this.col < app.NUM_COLS - 1) {
            this.col += 1;
        }

        if (key == "up" && this.row > 0) {
            this.row -= 1;
        } else if (key == "down" && this.row < app.NUM_ROWS - 1) {
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
    this.row = app.PLAYER_START_ROW;
    this.col = app.PLAYER_START_COL;

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
    ctx.drawImage(Resources.get(this.sprite), this.col * app.COL_WIDTH, this.row * app.ROW_HEIGHT - app.ROW_HEIGHT / 4);

    if (this.win) {
        var imageWidth = 313;
        var imageHeight = 232;

        centerX = app.CANVAS_WIDTH / 2 - imageWidth / 2;
        centerY = app.CANVAS_HEIGHT / 2 - imageHeight / 2;

        ctx.drawImage(Resources.get("images/won.png"), centerX, centerY);

        this.drawText("Press SPACE to Play Again", app.CANVAS_WIDTH / 2, app.CANVAS_HEIGHT * 0.9);
        this.drawText("Score: " + this.points, app.CANVAS_WIDTH / 2, app.CANVAS_HEIGHT * 0.75);

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

    ctx.font = "24pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
};


