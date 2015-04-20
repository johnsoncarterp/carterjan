game.LoadProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO

        document.getElementById("input").style.visibility = "visisble";
        document.getElementById("load").style.visibility = "visible";


        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.A);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("impact", 26, "lime");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Enter Username And Password", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            }
        })));




    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        document.getElementById("input").style.visibility = "hidden";
         document.getElementById("load").style.visibility = "hidden";
    }
});


