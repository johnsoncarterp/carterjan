//my class for title screen that is a screen
game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //my on reset evnt function
    onResetEvent: function() {
        //loads image title-screen
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO


        game.data.option1 = (new (me.Renderable.extend({
            //my init function for text
            init: function() {
                //where text is located
                this._super(me.Renderable, 'init', [350, 240, 300, 50]);
                //how text is styled
                this.font = new me.Font("impact", 46, "orangered");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            //my draw function
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Start A New Game", this.pos.x, this.pos.y);
            },
            //my update function
            update: function(dt) {
                return true;
            },
            //my new game function
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', game.data.option2);
                me.input.releasePointerEvent('pointerdown', this);
                //changes game state to NEW
                me.state.change(me.state.NEW);
            }
        })));


        me.game.world.addChild(game.data.option1);

        game.data.option2 = new (me.Renderable.extend({
            //init function for text
            init: function() {
                //where text is located
                this._super(me.Renderable, 'init', [430, 340, 250, 50]);
                //how my text is styled
                this.font = new me.Font("impact", 46, "blueviolet");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            //my draw function
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
            },
            //my update function
            update: function(dt) {
                return true;
            },
            //my  new game function
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', game.data.option1);
                me.input.releasePointerEvent('pointerdown', this);
                //changes game state to LOAD
                me.state.change(me.state.LOAD);

            }
        }));

        me.game.world.addChild(game.data.option2);
    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    //my on destroy event function
    onDestroyEvent: function() {

    }
});
