//init function for enemy base entity
game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                sritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        //showing that broken if false
        this.broken = false;
        //showing that health = enemy base health
        this.health = game.data.enemyBaseHealth;
        // showing that its always updating
        this.alwaysUpdate = true;
        //binds the oncollision
        this.body.onCollision = this.onCollision.bind(this);
        //adds annimation for enemtt base entity
        this.type = "EnemyBaseEntity";
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    //my update function
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            game.data.win = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //my oncollision function
    onCollision: function() {

    },
    //my lose health function
    loseHealth: function(damage) {
        this.health = this.health - damage;
        console.log(this.health);
    }

});

