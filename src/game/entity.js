game.module('game.entity')
.require('engine.sprite')
.body(function() {

    game.Entity = game.Container.extend({
        init: function(x, y, settings) {
            this._super();

            this.x = x;
            this.y = y;

            game.merge(this, settings);
        },

        update: function() {

        }
    });

});