const SnakePlayer = (function () {

    var direction = new Direction();

    function Direction() {

        const LEFT = 37;
        const UP = 38;
        const RIGHT = 39;
        const DOWN = 40;

        this.RIGHT = RIGHT;

        const directions = {
            [LEFT]: {
                x: -1,
                y: 0,
                not: RIGHT
            },
            [UP]: {
                x: 0,
                y: -1,
                not: DOWN
            },
            [RIGHT]: {
                x: 1,
                y: 0,
                not: LEFT
            },
            [DOWN]: {
                x: 0,
                y: 1,
                not: UP
            }
        };

        this.change = function (keyCode) {
            const direction = directions[keyCode];
            if (direction) {
                if (direction.not !== this.prevDirKey) {
                    this.direction = direction;
                    this.prevDirKey = keyCode;
                }
            }
            return this.direction;
        }
    }


    return function (GameState, GameConfig, GameObjects) {
        return {
            GameState: GameState,
            GameObjects: GameObjects,
            snake: [],
            size: GameConfig.box,
            load: function () {

            },

            init: function () {
                this.snake.push({
                    x: 9 * this.size,
                    y: 9 * this.size
                });
                this.changeDirection(direction.RIGHT);
            },

            isHit: function (snakeHead, food) {
                return (snakeHead.x === food.x && snakeHead.y === food.y);
            },

            isCollidedItSelf: function (snakeHead, snake) {
                return snake.some( snakeBody => this.isHit(snakeBody, snakeHead));
            },

            isOffGround: function (snakeHead, ground) {
                if (snakeHead.x > ground.width - this.size || snakeHead.x < 0 || snakeHead.y < 0 || snakeHead.y > ground.height - this.size) {
                    return true;
                }
                return false
            },

            getNewHead: function () {
                const snake = this.snake;
                const snakeHead = { ...snake[0] };
                const newHead = {
                    x: snakeHead.x + (this.direction.x * this.size),
                    y: snakeHead.y + (this.direction.y * this.size)
                };
                return newHead;
            },
            update: function () {
                const ground = this.GameObjects.ground;
                const food = this.GameObjects.food;

                const snake = this.snake;
                const newHead = this.getNewHead();
                if (this.isCollidedItSelf(newHead, snake) || this.isOffGround(newHead, ground)) {
                    console.log('game over');
                    this.GameState.gameOver = true;
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
                this.direction = direction.change(keyCode);
            },

            render: function (ctx) {
                const snake = this.snake;
                snake.forEach( (snakeBody, i) => {
                    ctx.fillStyle = i === 0 ? 'green' : 'black';
                    ctx.fillRect(snakeBody.x, snakeBody.y, this.size, this.size);
                })
            }
        }
    }
})();