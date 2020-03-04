SnakeGame = (function () {
    let gameOver = false;

    let repeatDraw;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const directions = {};
    directions[LEFT] = {
        x: -1,
        y: 0,
        not: RIGHT
    }
    directions[UP] = {
        x: 0,
        y: -1,
        not: DOWN
    }

    directions[RIGHT] = {
        x: 1,
        y: 0,
        not: LEFT
    }

    directions[DOWN] = {
        x: 0,
        y: 1,
        not: UP
    }

    function keyDown(event) {
        const keyCode = event.keyCode;
        snakePlayer.changeDirection(keyCode);
    }


    document.addEventListener("keydown", keyDown);
    var c = document.getElementById("game");
    var ctx = c.getContext("2d");
    ctx.beginPath();

    var box = 16;

    var ground = {
        width: 32 * box,
        height: 32 * box,
        render: function () {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.rect(0, 0, this.width + 1, this.height + 1);
            ctx.stroke();
        }
    };

    let food = {
        size: box,
        loadImage: function () {
            var foodImage = new Image();
            foodImage.src = 'burger-icon-53-32x32.jpg';
            this.image = foodImage;
        },
        render: function () {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        },
        reset: function () {
            this.x = Math.floor(Math.random() * 30 + 1) * box;
            this.y = Math.floor(Math.random() * 30 + 1) * box;
        }
    };


    let snakePlayer = {
        dead: false,
        snake: [],
        size: box,
        init: function () {
            this.snake.push({
                x: 9 * this.size,
                y: 9 * this.size
            });
        },

        isHit: function (snakeHead, food) {
            return (snakeHead.x === food.x && snakeHead.y === food.y);
        },

        isCollidedItSelf: function (snakeHead, snake) {
            for (let i = 0; i < snake.length; i++) {
                if (this.isHit(snake[i], snakeHead)) {
                    return true;
                }
            }
            return false;
        },

        isOffGround: function (snakeHead, ground) {
            if (snakeHead.x > ground.width - box || snakeHead.x < 0 || snakeHead.y < 0 || snakeHead.y > ground.height - box) {
                return true;
            }
            return false
        },

        getNewHead: function () {
            const snake = this.snake;
            const snakeHead = { ...snake[0] };
            const newHead = {
                x: snakeHead.x + (this.direction.x * box),
                y: snakeHead.y + (this.direction.y * box)
            };
            return newHead;
        },
        update: function (ground, food) {
            const snake = this.snake;
            const newHead = this.getNewHead();
            if (this.isCollidedItSelf(newHead, snake) || this.isOffGround(newHead, ground)) {
                console.log('game over');
                this.dead = true;
                return;
            }

            if (this.isHit(newHead, food)) {
                food.reset();
            } else {
                snake.pop();
            }

            snake.unshift(newHead);
        },
        changeDirection: function (keyCode) {
            const direction = directions[keyCode];
            if (direction) {
                if (direction.not !== this.prevDirKey) {
                    this.direction = direction;
                    this.prevDirKey = keyCode;
                }
            }
        },

        render: function () {
            const snake = this.snake;
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i === 0 ? 'green' : 'black';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }
        }
    }

    food.loadImage();
    food.reset();
    snakePlayer.init();
    snakePlayer.changeDirection(RIGHT);

    function draw() {
        ground.render();
        snakePlayer.update(ground, food);
        if (snakePlayer.dead) {
            clearInterval(repeatDraw);
            return;
        }
        snakePlayer.render();
        food.render();
    }

    repeatDraw = setInterval(draw, 100);

})();