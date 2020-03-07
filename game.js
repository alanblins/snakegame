SnakeGame = (function () {

    const GameConfig = {
        box: 16
    }
    const GameState = {
        gameOver: false
    }

    const food = new Food(GameConfig);
    const ground = new Ground(GameConfig);
    const GameObjects = { food, ground };
    const snakePlayer = new SnakePlayer(GameState, GameConfig, GameObjects);

    food.load();
    food.init();
    ground.load();
    ground.init();
    snakePlayer.load();
    snakePlayer.init();

    const ctx = getContextCanvas();
    document.addEventListener("keydown", keyDown);

    const repeatDraw = setInterval(function () {
        update();
        render();
    }, 100);

    function update() {
        snakePlayer.update();
    }

    function render() {
        ground.render(ctx);
        snakePlayer.render(ctx);
        food.render(ctx);
        if (GameState.gameOver) {
            clearInterval(repeatDraw);
            return;
        }
    }

    function keyDown(event) {
        const keyCode = event.keyCode;
        snakePlayer.changeDirection(keyCode);
    }

    function getContextCanvas() {
        var c = document.getElementById("game");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        return ctx;
    }

})();