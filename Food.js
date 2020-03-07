const Food = (function () {

    return function (GameConfig) {
        return {
            size: GameConfig.box,
            load: function () {
                var foodImage = new Image();
                foodImage.src = 'burger-icon-53-32x32.jpg';
                this.image = foodImage;
            },
            init: function () {
                this.reset();
            },
            render: function (ctx) {
                ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
            },
            reset: function () {
                this.x = Math.floor(Math.random() * 30 + 1) * this.size;
                this.y = Math.floor(Math.random() * 30 + 1) * this.size;
            }
        };
    }
})();