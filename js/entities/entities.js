game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
         this._super(me.Entity, 'init', [x, y, {
                image: "player",
                spritewidth: "64",
                spriteheight: "64",
                width: 64,
                height: 64,
                getShape: function() {
                    return (new me.Rect(0, 0, 64, 64)).toPolygon();
                }
         }]);
//     
//     this.body.setVelocity(5, 0);
     
    },
    
    update: function() {
        if(me.input.isKeyPressed("right")){
           this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
    }
});