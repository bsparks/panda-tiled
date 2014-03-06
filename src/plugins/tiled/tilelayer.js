game.module('plugins.tiled.tilelayer')
    .require('plugins.tiled.layer', 'engine.sprite')
    .body(function() {

        game.Tiled = game.Tiled || {};

        game.Tiled.TileLayer = game.Tiled.Layer.extend({
            data: [],

            init: function(scene, json) {
                this._super(scene, json);
            },

            onAddedToMap: function() {
                this.buildSprites();
            },

            // this is prolly a really horrible way to do this, this is just a start
            buildSprites: function() {
                var layer = this,
                    tile;

                for (var y = 0; y < layer.height; y++) {
                    for (var x = 0; x < layer.width; x++) {
                        if (!layer.getTile(x, y)) {
                            continue;
                        }

                        layer.addChild(new game.Sprite(x * this._map.tilewidth, y * this._map.tileheight, layer.getTile(x, y)));
                    }
                }
            },

            getTile: function(x, y) {
                var index = x + (y * this.width),
                    gid = 0,
                    tileset = null,
                    tile;

                gid = this.data[index];

                if(gid === 0) {
                    // no sprite!
                    return null;
                }

                for (var t = 0; t < this._map.tilesets.length; t++) {
                    tileset = this._map.tilesets[t];

                    if (gid >= tileset.firstgid && gid <= tileset.lastgid) {
                        break;
                    } else {
                        tileset = null;
                    }
                }

                if (!tileset) {
                    console.warn('matching tileset not found for gid: ' + gid);
                    return null;
                }

                // the tiles are built in the cache this way during maploader, 0 based for tiles, 1 based for gid (0 means empty)
                tile = tileset.name + '-' + (gid - tileset.firstgid);

                return tile;
            },

        });

    });