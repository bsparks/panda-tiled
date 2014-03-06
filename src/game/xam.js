game.module('game.xam')
    .require('engine.sprite', 'game.entity')
    .body(function() {

        game.addAsset('media/xam.png');

        EntityXam = game.Entity.extend({
            init: function(x, y, settings) {
                this._super(x, y, settings);

                /*this.body = new game.Body({
                    mass: 1,
                    position: {
                        x: x,
                        y: y
                    },
                    velocityLimit: {
                        x: 100,
                        y: 1000
                    },
                    collideAgainst: 0,
                    collisionGroup: 1
                });
                this.body.addShape(new game.Rectangle(16, 16));*/

                this.addChild(new game.Sprite('media/xam.png'));
            },

            update: function() {
                if(this.body) {
                    this.x = this.body.position.x;
                    this.y = this.body.position.y;
                }
            }
        });

    });