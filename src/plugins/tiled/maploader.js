game.module('plugins.tiled.maploader')
    .require('engine.core')
    .body(function() {

        game.Tiled = game.Tiled || {};

        game.Tiled.MapCache = {};

        game.Tiled.MapLoader = PIXI.JsonLoader.extend({
            _tilesetsToLoad: 0,
            _tilesets: [],

            init: function(url, crossorigin) {
                this._super(url, crossorigin);
            },

            load: function() {
                if(game.Tiled.MapCache[this.url]) {
                    this.json = game.Tiled.MapCache[this.url];
                    this.onLoaded();
                } else {
                    this._super();
                }
            },

            onJSONLoaded: function() {
                var scope = this,
                    selfOnLoaded = scope.onLoaded.bind(scope);

                if (scope.ajaxRequest.readyState === 4) {
                    if (scope.ajaxRequest.status === 200 || window.location.protocol.indexOf('http') === -1) {
                        scope.json = JSON.parse(scope.ajaxRequest.responseText);

                        // load and cache all the tilesets
                        for (var i = 0; i < scope.json.tilesets.length; i++) {
                            var tileset = scope.json.tilesets[i];
                            var image = new PIXI.ImageLoader(scope.baseUrl + tileset.image, scope.crossorigin);
                            // bug in the imageLoader sprite thing where it doesn't have these yet
                            image.texture.width = tileset.imagewidth;
                            image.texture.height = tileset.imageheight;

                            scope._tilesets.push(image);
                        }

                        for (var j = 0; j < scope._tilesets.length; j++) {
                            scope._tilesets[j].addEventListener('loaded', selfOnLoaded);
                        }

                        game.Tiled.MapCache[scope.url] = scope.json;

                        scope._tilesetsToLoad = scope.json.tilesets.length;
                        scope.onLoaded();
                    } else {
                        scope.onError();
                    }
                }
            },

            onLoaded: function() {
                if (this._tilesetsToLoad > 0) {
                    this._tilesetsToLoad--;
                    var tset = this.json.tilesets[this._tilesetsToLoad];
                    this._tilesets[this._tilesetsToLoad].loadFramedSpriteSheet(tset.tilewidth, tset.tileheight, tset.name);
                } else {
                    this.loaded = true;
                    this.dispatchEvent({
                        type: 'loaded',
                        content: this
                    });
                }
            }

        });

        game.Loader.inject({
            init: function(scene) {
                this._super(scene);

                this.loader.loadersByType.tiled = game.Tiled.MapLoader;
            }
        });

    });