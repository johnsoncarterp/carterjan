//init function for player entity
game.PlayerEntity = me.Entity.extend({
    //my init function that shows all other functions
    init: function(x, y, settings) {
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.setFlags();
        this.type = "PlayerEntity";
        //makes the camera follow the player
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
//adds animation
        this.addAnimation();
//sets curent animation to idle
        this.renderable.setCurrentAnimation("idle");
    },
    //my set super function
    setSuper: function(x, y) {
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
    },
    // my set player timers function
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastSpear = this.now;
        this.lastAttack = new Date().getTime(); //havent used this yet
    },
    // my set attributes function
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    // my set flags function
    setFlags: function() {
        //keeps track of your characters direction
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    // my add animation function
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    },
    // my update function that lists all of my functions below
    update: function(delta) {
        this.now = new Date().getTime();
        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();
        this.checkAbilityKeys();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //checks if your player is dead
    checkIfDead: function() {
        if (this.health < 0) {
            return true;
        }
        return false;
    },
    // checks key presses function
    checkKeyPressesAndMove: function() {
        // moves player right
        if (me.input.isKeyPressed("right")) {
            //adds to the position of my x to set velocity
            //me.timer.tick makes everything look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
        }
        //moves player left
        else if (me.input.isKeyPressed("left")) {
            this.facing = "left";
            this.flipX(false);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }
        //makes player jump
        if (me.input.isKeyPressed("jump") && !this.body.falling && !this.body.jumping) {
            this.body.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }
        //makes player attack
        this.attacking = me.input.isKeyPressed("attack");
    },
    // my set annimation function
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //sets attack then goes back to idle
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so we start from a new sequence not from the last one
                this.renderable.setAnimationFrame();
            }
        } else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    // my lose health function
    loseHealth: function(damage) {
        this.health = this.health - damage;
        console.log(this.health);
    },
    // my collide handler function
    collideHandler: function(response) {
        if (response.b.type === "EnemyBaseEntity") {
            this.collideWithEnemyBase(response);
        } else if (response.b.type === 'EnemyCreep') {
            this.collideWithEnemyCreep(response);
        }
    },
    // collide with enemy basse function
    collideWithEnemyBase: function(response) {
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        if (ydif < -40 && xdif < 70 && xdif > -35) {
            this.body.falling = false;
            this.body.vel.y = -1;
        }
        else if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x - 1;
        } else if (xdif < 70 && this.facing === 'left' && xdif > 0) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
        }

        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);
        }
    },
    //mycollide with enemy vreep function
    collideWithEnemyCreep: function(response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;

        this.stopMovement(xdif);

        if (this.checkAttack(xdif, ydif)) {
            this.hitCreep(response);
        }
        ;
    },
    //my stop movement function
    stopMovement: function(xdif) {
        if (xdif > 0) {
            this.pos.x = this.pos.x + 1;
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            this.pos.x = this.pos.x - 1;
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
    },
    // my check attack function
    checkAttack: function(xdif, ydif) {
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                ) {
            this.lastHit = this.now;
            //if creeps heath is less than attack execute if statement code
            return true;

        }
        return false;
    },
    //my hit creep function
    hitCreep: function(response) {
        //adds 1 gold for creep kill
        if (response.b.health <= game.data.playerAttack) {
            //adds 1 gold for creep kill
            console.log("current gold: " + game.data.gold);
            game.data.gold += 1;
        }


        response.b.loseHealth(game.data.playerAttack);
    },
    //check ability keys function
    checkAbilityKeys: function() {
        if (me.input.isKeyPressed("skill1")) {
            this.speedBurst();
        } else if (me.input.isKeyPressed("skill2")) {
            this.eatCreep();
        } else if (me.input.isKeyPressed("skill3")) {

            this.throwSpear();
        }
    },
    //my throw spear function
    throwSpear: function() {
        if ((this.now - this.lastSpear) >= game.data.spearTimer && game.data.ability3 > 0) {
            this.lastSpear = this.now;
            var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(spear, 10);
        }
    }

});
