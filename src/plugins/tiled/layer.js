game.module('plugins.tiled.layer')
    .body(function() {

        game.Tiled = game.Tiled || {};

        // abstract layer
        game.Tiled.Layer = game.Container.extend({
            init: function(scene, json) {
                this._super();

                this._scene = scene;

                game.merge(this, json);
            },

            setMap: function(map) {
                this._map = map;
                this.onAddedToMap();
            },

            onAddedToMap: function() {

            },

            clear: function() {
                for (var i = this.children.length-1; i > -1; i--) {
                    this.removeChild(this.children[i]);
                }
            }
        });
    })