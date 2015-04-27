//init function for hero death manager
game.HeroDeathManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
    },
    //my update function
    update: function() {
        if (game.data.player.dead) {
            console.log("reset");
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }

        return true;
    }
});

