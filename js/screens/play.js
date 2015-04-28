//my class for play screen that is a screen
game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;
        // makes it load level01
        me.levelDirector.loadLevel("level01");
        // resets player
        this.resetPlayer(10, 0);
        
        //my managers and spend gold
        var gameTimerManager = me.pool.pull("GameTimerManager", 0, 420, {});
        me.game.world.addChild(gameTimerManager, 5);
        
        var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 420, {});
        me.game.world.addChild(heroDeathManager, 5);
        
        var experienceManager = me.pool.pull("ExperienceManager", 0, 420, {});
        me.game.world.addChild(experienceManager, 5);
        
        var spendGold = me.pool.pull("SpendGold", 0, 420, {});
        me.game.world.addChild(spendGold, 5);

        //binding keys B Q W E RIGHT A LEFT SPACE
        me.input.bindKey(me.input.KEY.B, "buy");
        me.input.bindKey(me.input.KEY.Q, "skill1");
        me.input.bindKey(me.input.KEY.W, "skill2");
        me.input.bindKey(me.input.KEY.E, "skkill3");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "attack");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.SPACE, "jump");

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    //my ondestroy event function
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    },
    //my reset player function
    resetPlayer: function(x, y) {
        game.data.player = me.pool.pull("player", x, y, {});
        me.game.world.addChild(game.data.player, 5);
    }

});
