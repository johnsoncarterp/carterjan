//my class for load profile that is a screen 
game.LoadProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //my onreset function
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO

        document.getElementById("input").style.visibility = "visible";
        document.getElementById("load").style.visibility = "visible";

//unbinding keys B Q E W A
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.A);

        me.game.world.addChild(new (me.Renderable.extend({
            //my init function for the text
            init: function() {
                //where text is located
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                //how text is styled
                this.font = new me.Font("impact", 26, "lime");
            },
            //my draw function
            draw: function(renderer) {
                //my text 
                this.font.draw(renderer.getContext(), "Enter Username And Password", this.pos.x, this.pos.y);
            },
            //my update function
            update: function(dt) {
                return true;
            }
        })));




    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    //my on destroy event function
    onDestroyEvent: function() {
        document.getElementById("input").style.visibility = "hidden";
         document.getElementById("load").style.visibility = "hidden";
    }
});


