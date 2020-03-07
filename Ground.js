const Ground = (function () {
    return function (GameConfig) {
        return {
            width: 32 * GameConfig.box,
            height: 32 * GameConfig.box,
            load: function(){

            },
            init: function(){

            },
            render: function (ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, this.width, this.height);
                ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.rect(0, 0, this.width + 1, this.height + 1);
                ctx.stroke();
            }
        };
    }
})();