game.module(
    'game.main'
)
    .require(
        'engine.core',
        'engine.scene',
        'engine.physics',
        'plugins.tiled.map',

        'game.xam'
)
    .body(function() {

        game.addAsset('media/alagard.fnt');
        game.addAsset('media/maps/test.tiled');

        SceneGame = game.Scene.extend({
            backgroundColor: 0x000000,
            gravity: 2000,

            init: function() {
                this.world = new game.World(0, this.gravity);

                var groundBody = new game.Body({
                    position: {
                        x: game.system.width / 2,
                        y: 850
                    },
                    collisionGroup: 0
                });
                var groundShape = new game.Rectangle(game.system.width, 100);
                groundBody.addShape(groundShape);
                this.world.addBody(groundBody);

                var text = new game.BitmapText('Hello World', {
                    font: 'Alagard'
                });
                var guiLayer = new game.Tiled.Layer(null, {
                    name: 'foo'
                });
                guiLayer.addChild(text);

                var map = new game.Tiled.Map('media/maps/test.tiled', this);

                this.stage.addChild(map);
                this.stage.addChild(guiLayer);

            },

            addObject: function(object) {
                if(this.world && object.body) {
                    this.world.addBody(object.body);
                }

                this._super(object);
            }
        });

        game.System.idtkScale = 'ScaleAspectFill';

        game.start();

    });