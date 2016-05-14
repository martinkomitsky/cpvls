define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/game'),
		phaser = require('phaser');

	var View = BaseView.extend({
		template: tmpl,
		className: 'game__main game__main_visible js-game',
		initialize: function() {
		},
		render: function() {
			console.log("Script is in action");
			var game = new Phaser.Game(800, 600, Phaser.AUTO, 'playscreen', {
				preload: function() {
					game.load.image('sky', 'images/assets/landscape.jpg');
					game.load.image('sky2', 'images/assets/landscape2.jpg');
					game.load.image('sky3', 'images/assets/landscape3.jpg');
					game.load.image('sky4', 'images/assets/landscape4.jpeg');
					game.load.image('sky5', 'images/assets/landscape5.jpg');
					game.load.image('ground', 'images/assets/platform.png');
					game.load.spritesheet('dude', 'images/assets/zero.png', 141, 0);
                    game.load.spritesheet('opponent', 'images/assets/scorpion.png', 141, 0);
				},
				create: create,
				update: update
			});

			var ground,
				player,
                opponent,
                firstFrame,
                movesList;

			function create() {
				game.physics.startSystem(Phaser.Physics.ARCADE);
				skies = ['sky', 'sky2', 'sky3', 'sky4', 'sky5'];
				//var rand = Math.random() * 5^0,
                var rand = 0;
					sky = game.add.sprite(0, 0, skies[rand]);
                firstFrame = true;
				ground = game.add.sprite(0, game.world.height - 16, 'ground');
				ground.scale.setTo(2, 2);
				ground.game.physics.arcade.enableBody(ground);
				ground.visible = false;
				ground.body.immovable = true;

				cursors = game.input.keyboard.createCursorKeys();
				attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				legAttack = game.input.keyboard.addKey(Phaser.Keyboard.X);
				player = game.add.sprite(32, game.world.height - 450, 'dude');
                opponent = game.add.sprite(game.world.width - 150, game.world.height - 450, 'opponent');
                opponent.anchor.setTo(0.5);
                opponent.scale.setTo(-1, 1);
				game.physics.arcade.enable(player);
                game.physics.arcade.enable(opponent);
                opponent.body.bounce.y = 0;
                opponent.body.gravity.y = 1600;
                opponent.body.collideWorldBounds = true;
				player.body.bounce.y = 0;
				player.body.gravity.y = 1600;
				player.body.collideWorldBounds = true;
				player.animations.add('stay', [0, 1, 2, 3, 4, 5, 6], 10, true);
                player.animations.add('left', [14, 13, 12, 11, 10, 9, 8, 7], 12, true);
                player.animations.add('right', [7, 8, 9, 10, 11, 12, 13, 14], 12, true);
                player.animations.add('jump', [15, 16, 17, 18, 19, 20, 21, 22], 10, false);
                player.animations.add('jumpleft', [22, 21, 20, 19, 18, 17, 16, 15], 10, false);
                player.animations.add('kick', [23, 24], 10, false);
                player.animations.add('leg', [26, 27, 28, 29, 30], 10, false);
                opponent.animations.add('stay', [0, 1, 2, 3, 4, 5, 6], 10, true);
                opponent.animations.add('left', [14, 13, 12, 11, 10, 9, 8, 7], 12, true);
                opponent.animations.add('right', [7, 8, 9, 10, 11, 12, 13, 14], 12, true);
                opponent.animations.add('jump', [15, 16, 17, 18, 19, 20, 21, 22], 10, false);
                opponent.animations.add('jumpleft', [22, 21, 20, 19, 18, 17, 16, 15], 10, false);
                opponent.animations.add('kick', [23, 24], 10, false);
                opponent.animations.add('leg', [26, 27, 28, 29, 30, 31, 32], 10, false);
                movesList = ['stay', 'left', 'right', 'jump', 'jumpleft', 'kick', 'leg'];
                timer = game.time.create(false);
                timer.loop(6000, function() {opponent.animations.play('stay'); opponent.body.velocity.x = 0}, game);
                timer.loop(4000, function() {opponent.animations.play('left');
                                             opponent.body.velocity.x = 100});
                timer.loop(7000, function() {opponent.animations.play('jump'); opponent.body.velocity.x = -100;
                                                opponent.body.velocity.y = -850;
                                                opponent.animations.currentAnim.onComplete.add(function() {opponent.animations.play('stay')}, game);})
                timer.loop(2000, function() {opponent.animations.play('right');
                                            opponent.body.velocity.x = -100});
                timer.start();
                }

			function update() {
				game.physics.arcade.collide(player, ground);
                game.physics.arcade.collide(opponent, ground);
                game.physics.arcade.collide(player, opponent);
				player.body.velocity.x = 0;
                if (player.body.touching.down) {
                    firstFrame = false;
                }
				 if (cursors.left.isDown) {
					console.log("Move to the left");
					player.body.velocity.x = -200;
					if (player.body.touching.down) {
						player.animations.play('left');
					}
				} else if (cursors.right.isDown) {
					console.log("Move to the right");
					player.body.velocity.x = 200;
					if (player.body.touching.down)
						player.animations.play('right');
				} else if (attack.isDown) {
					player.animations.play('kick');
				} else if (legAttack.isDown) {
					player.animations.play('leg');
				} else {
					if (player.body.touching.down)
                        if (player.animations.currentAnim.loop || player.frame == 15) {
                            player.animations.play('stay');
                        } else {
                            player.animations.currentAnim.onComplete.add(function() {player.animations.play('stay')}, game);
                        }
                    else { if (firstFrame == true) {
                        console.log ('we are flying for the first time');

                    opponent.animations.play('stay');
                    player.frame = 15}}
				}
				if (cursors.up.isDown && player.body.touching.down) {
					console.log("Jump");
					if (cursors.left.isDown) {
						player.animations.play('jumpleft');
					} else {
						player.animations.play('jump');
					}
					player.animations.currentAnim.onComplete.add(function() {player.frame = 15}, game);
					player.body.velocity.y = -850;
				}
			}
			return BaseView.prototype.render.call(this);
		},
	});


	return View;
});