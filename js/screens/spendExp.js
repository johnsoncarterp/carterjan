game.SpendExp = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO



        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("impact", 26, "orangered");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Press F1-F4 To Buy, Press F5 To Skip", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Current Gold: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "F1: Increase Gold Production/ Current Level: " + game.data.exp1.toString() + "Cost:   " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "F2: Increase Starting Gold / Current Level: " + game.data.exp2.toString() + "Cost:   " + ((game.data.exp2 + 1) * 10), this.pos.x, this.pos.y + 150);
                this.font.draw(renderer.getContext(), "F3: Increase Attack Strength / Current Level: " + game.data.exp3.toString() + "Cost:   " + ((game.data.exp3 + 1) * 10), this.pos.x, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "F4: Increase Health / Current Level: " + game.data.exp4.toString() + "Cost:   " + ((game.data.exp4 + 1) * 10), this.pos.x, this.pos.y + 250);
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

    }
});


