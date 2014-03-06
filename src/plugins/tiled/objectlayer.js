game.module('plugins.tiled.objectlayer')
    .require('plugins.tiled.layer')
    .body(function() {

        var stringToFunction = function(str) {
            var arr = str.split(".");

            var fn = (window || this);
            for (var i = 0, len = arr.length; i < len; i++) {
                fn = fn[arr[i]];
            }

            if (typeof fn !== "function") {
                throw new Error("function not found");
            }

            return fn;
        };

        game.Tiled = game.Tiled || {};

        game.Tiled.ObjectLayer = game.Tiled.Layer.extend({
            type: 'objectgroup',
            objects: [],

            init: function(scene, json) {
                this._super(scene, json);

                this.instantiateObjects();
            },

            instantiateObjects: function() {
                var i = 0,
                    obj, klass,
                    inst;

                // first clear out any old ones
                this.clear();

                for (i = 0; i < this.objects.length; i++) {
                    obj = this.objects[i];

                    if(typeof obj.type === 'string') {
                        klass = stringToFunction(obj.type);
                    } else {
                        klass = obj.type;
                    }

                    inst = new (klass)(obj.x, obj.y, obj.properties);

                    this.addChild(inst);
                    this._scene.addObject(inst);
                }
            }
        });

    });