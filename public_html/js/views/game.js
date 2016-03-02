define(function(require) {

    var BaseView = require('views/baseView'),
        tmpl = require('tmpl/game'),
        phaser = require('phaser'),
        event = require('event');

    var View = BaseView.extend({
        template: tmpl,
        render: function() {
            var game = new Phaser.Game(800, 600, Phaser.AUTO, 'myplayscreen', { preload: preload, create: create, update: update });
            console.log("Script is in action");
            function preload() {
                game.load.image('sky', 'images/assets/landscape.jpg');
                game.load.image('sky2', 'images/assets/landscape2.jpg');
                game.load.image('sky3', 'images/assets/landscape3.jpg');
                game.load.image('sky4', 'images/assets/landscape4.jpeg');
                game.load.image('sky5', 'images/assets/landscape5.jpg');
                game.load.image('ground', 'images/assets/platform.png');
                game.load.spritesheet('dude', 'images/assets/scorpion.png', 116, 0);
                game.load.spritesheet('dudekick', 'images/assets/kick.png', 116, 0);
            }

            var platforms,
                player,
                attack;

            function create() {
                game.physics.startSystem(Phaser.Physics.ARCADE);
                skies = ['sky', 'sky2', 'sky3', 'sky4', 'sky5'];
                var rand = Math.random() * 5^0 % 5,
                    sky = game.add.sprite(0, 0, skies[rand]);

                platforms = game.add.group();
                platforms.enableBody = true;

                var ground = platforms.create(0, game.world.height - 16, 'ground');
                ground.scale.setTo(2, 2);
                ground.visible = false;
                ground.body.immovable = true;

                cursors = game.input.keyboard.createCursorKeys();
                attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

                player = game.add.sprite(32, game.world.height - 450, 'dude');
                game.physics.arcade.enable(player);
                player.body.bounce.y = 0;
                player.body.gravity.y = 1400;
                player.body.collideWorldBounds = true;
                player.animations.add('stay', [0, 1, 2, 3, 4, 5, 6], 10, true);
                player.animations.add('left', [14, 13, 12, 11, 10, 9, 8, 7], 10, true);
                player.animations.add('right', [7, 8, 9, 10, 11, 12, 13, 14], 10, true);
                player.animations.add('jump', [15, 16, 17, 18, 19, 20, 21, 22], 10, false);
                player.animations.add('jumpleft', [22,21,20,19,18,17,16,15], 10, false);
            }

            function update() {
                game.physics.arcade.collide(player, platforms);
                player.body.velocity.x = 0;

                 if (cursors.left.isDown) {
                    console.log("Move to the left");
                    player.body.velocity.x = -150;
                    if (player.body.touching.down) {
                        player.animations.play('left');
                    }
                } else if (cursors.right.isDown) {
                    console.log("Move to the right");
                    player.body.velocity.x = 150;
                    if (player.body.touching.down)
                        player.animations.play('right');
                } else {
                    if (player.body.touching.down) {
                            player.animations.play('stay');
                    }
                }
                if (cursors.up.isDown && player.body.touching.down) {
                    console.log("Jump");
                    if (cursors.left.isDown) {
                        player.animations.play('jumpleft');
                    }
                    else {
                        player.animations.play('jump');
                    }
                    player.animations.currentAnim.onComplete.add(function() {player.frame = 15}, game);
                    player.body.velocity.y = -850;
                }
            }
            return BaseView.prototype.render.call(this);
        },
        initialize: function () {
        },
    });

        return new View();
    }
);