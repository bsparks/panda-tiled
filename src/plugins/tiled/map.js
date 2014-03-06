game.module('plugins.tiled.map')
    .require('engine.core', 'plugins.tiled.maploader', 'plugins.tiled.objectlayer', 'plugins.tiled.tilelayer')
    .body(function() {

        // namespace
        game.Tiled = game.Tiled || {};

        game.Tiled.Map = game.Container.extend({
            init: function(path, scene) {
                this._super();

                this._scene = scene;

                var map = new game.Tiled.MapLoader(path);

                map.addEventListener('loaded', this.onLoaded.bind(this));

                map.load();
            },

            addChild: function(child) {
                // should only add Tiled.Layer items to the map!
                child.setMap(this);

                this._super(child);
            },

            onLoaded: function(event) {
                this.loaded = true;
                game.merge(this, event.content.json);

                // need to modify some data for the tilesets (TODO: make a class?)
                for(var t=0;t<this.tilesets.length;t++) {
                    var tileset = this.tilesets[t];

                    tileset.numTiles = (tileset.imageheight / tileset.tileheight) * (tileset.imagewidth / tileset.tilewidth);
                    tileset.lastgid = tileset.firstgid + tileset.numTiles - 1;
                }

                // now add all the layers as children
                // TODO: collision layers
                for (var i = 0; i < this.layers.length; i++) {
                    var layer = this.layers[i];

                    if (layer.type === 'objectgroup') {
                        this.addChild(new game.Tiled.ObjectLayer(this._scene, layer));
                    }

                    if(layer.type === 'tilelayer') {
                        this.addChild(new game.Tiled.TileLayer(this._scene, layer));
                    }
                }
            }
        });

    });