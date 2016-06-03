define(function(require) {

	var Game = function () {
		this.res = {
			currentArena: Math.random() * 10^0,
			arenas: [
				'images/assets/landscape5.jpg',
				'images/assets/1408104008_shao_kahn_throne.jpg',
				'images/assets/1408104091_soul_chamber.jpg',
				'images/assets/1408104102_thepit_day.jpg',
				'images/assets/1408104212_thepit_night.jpg',
				'images/assets/1408104262_wastelands.jpg',
				'images/assets/1408104297_the_cathedral.jpg',
				'images/assets/1408104361_desert.jpg',
				'images/assets/1408104421_the_subway.jpg',
				'images/assets/1408104505_tower.jpg',
				'images/assets/1408104606_the_armory.jpg'
			],
			oldArenas: [
				'images/assets/landscape.jpg',
				'images/assets/landscape2.jpg',
				'images/assets/landscape3.jpg',
				'images/assets/landscape4.jpeg',
				'images/assets/landscape5.jpg'
			],
			objects: {
				ground: 'images/assets/platform.png',
				hpbar: 'images/assets/hpbar.png',
				hpbar_empty: 'images/assets/hpbar_empty.png',
				menu: 'images/assets/menu.png',
				wall: 'images/assets/wall.png',
			},
			characters: {
				obama: {
					sprite: 'images/assets/zero1.png',
				},
				putin: {
					sprite: 'images/assets/scorpion1.png',
				}


			},
			gameModes: [
				'singleplayer',//todo
				'multiplayer'
			],
		};
		this.const = {
			currentGameStatus: 'round',
			players: {
				player: {
					name: Object.keys(this.res.characters)[Math.random() * 2^0],
					nick: 'xxxMerOPNXAPbxxx'
				},
				opponent: {
					name: Object.keys(this.res.characters)[Math.random() * 2^0],
					nick: 'vip://PoKanoVzrivatel777'
				}
			},
		};
		this.res.objects['arena'] = this.res.arenas[this.res.currentArena];

		this.fn = {
			initWall: function (x, y) {
				wall = game.add.sprite(x, y, 'wall');
				wall.scale.setTo(10, 25);
				wall.game.physics.arcade.enableBody(wall);
				wall.visible = false;
				wall.body.immovable = true;
				return wall;
			},
			finishRound: function (loser, winnerName) {
				loser.animations.play('death');
				winnerName = winnerName.toUpperCase();
				console.info('[round fisinsed!]');
				this.const.currentGameStatus = 'fisinsed';
				
				this.objects.stateText.text = winnerName + ' WINS!';
				this.objects.stateText.visible = true;
				this.objects.hpbaropponent_e.visible = false;
				this.objects.hpbaropponent.visible = false;
				this.objects.hpbarplayer.visible = false;
				this.objects.hpbarplayer_e.visible = false;
			}.bind(this),
			checkOverlap: function (spriteA, spriteB) {
				var boundsA = spriteA.getBounds(),
					boundsB = spriteB.getBounds();

				return Phaser.Rectangle.intersects(boundsA, boundsB);
			},
			updateBarHP: function (cropRectBar, initialWidth, amount) {
				cropRectBar.width = initialWidth / 100 * amount;
			}
		}
		this.objects = {};
	};

	Game.prototype.create = function (gameObj) {
		var game = this.game;

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		firstFrame = true;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		background = game.add.sprite(0, 0, 'arena');
		background.scale.setTo(window.innerWidth / background.width, window.innerHeight / background.height);

		gameObj.objects.leftWall = gameObj.fn.initWall(0, 0);
		gameObj.objects.rightWall = gameObj.fn.initWall(window.innerWidth - 10, 0);

		gameObj.objects.ground = game.add.sprite(0, game.world.height - 20, 'ground');
		gameObj.objects.ground.scale.setTo(5, 2);
		gameObj.objects.ground.game.physics.arcade.enableBody(gameObj.objects.ground);
		gameObj.objects.ground.visible = false;
		gameObj.objects.ground.body.immovable = true;

		gameObj.objects.hpbarplayer_e = game.add.sprite(game.world.width / 2, 50, 'hpbar_empty');
		gameObj.objects.hpbaropponent_e = game.add.sprite(game.world.width / 2, 50, 'hpbar_empty');
		gameObj.objects.hpbarplayer = game.add.sprite(game.world.width / 2, 50, 'hpbar');
		gameObj.objects.hpbaropponent = game.add.sprite(game.world.width / 2, 50, 'hpbar');

		cursors = game.input.keyboard.createCursorKeys();
		punchKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		kickKey = game.input.keyboard.addKey(Phaser.Keyboard.X);

		player = game.add.sprite(game.world.width / 100 * 25, game.world.height - 750, 'player');
		player.scale.setTo(2.2, 2.2);

		opponent = game.add.sprite(game.world.width / 100 * 75 , game.world.height - 750, 'opponent');
		opponent.scale.setTo(-2.2, 2.2);

		game.physics.arcade.enable(player);
		game.physics.arcade.enable(opponent);

		$.each([player, opponent], function (key, val) {
			val.body.bounce.y = 0;
			val.body.gravity.y = 1600;
			val.body.collideWorldBounds = false;
			val.animations.add('stay', [0, 1, 2, 3, 4, 5, 6], 10, true);
			val.animations.add('left', [14, 13, 12, 11, 10, 9, 8, 7], 12, true);
			val.animations.add('right', [7, 8, 9, 10, 11, 12, 13, 14], 12, true);
			val.animations.add('jump', [15, 16, 17, 18, 19, 20, 21, 22], 10, false);
			val.animations.add('jumpleft', [22, 21, 20, 19, 18, 17, 16, 15], 10, false);
			val.animations.add('punch', [23, 24], 10, false);
			// if (val === obama)
			val.animations.add('kick', [26, 27, 28, 29, 30], 10, false);
		// player.animations.add('kick', [26, 27, 28, 29, 30], 10, false); //у обамы анимация на 2 тика меньше
		});

		opponent.moveRight = function() {
			opponent.animations.play('right');
			opponent.body.velocity.x = -100;
		}

		opponent.moveLeft = function() {
			opponent.animations.play('left');
			opponent.body.velocity.x = 100;
		}

		opponent.stay = function() {
			opponent.animations.play('stay');
			opponent.body.velocity.x = 0;
		}

		opponent.punch = function() {
			opponent.body.velocity.x = 0;
			opponent.animations.play('punch');
			opponent.animations.currentAnim.onComplete.add(function() {
				opponent.animations.play('stay');
				opponent.body.velocity.x = 0;
			}, game);
		}

		opponent.jump = function() {
			opponent.animations.play('jump');
			opponent.body.velocity.x = -100;
			opponent.body.velocity.y = -1150;
			opponent.animations.currentAnim.onComplete.add(function() {
				opponent.animations.play('stay');
			}, game);
		};

		opponent.kick = function() {
			opponent.body.velocity.x = 0;
			opponent.animations.play('kick');
			opponent.animations.currentAnim.onComplete.add(function() {
				opponent.animations.play('stay');
			}, game);
		}

		opponent.death = function() {
			opponent.body.velocity.x = 0;
			opponent.animations.play('death');
			opponent.animations.currentAnim.onComplete.add(function() {
				opponent.frame = 37;
			}, game);
		}

		opponent.victory = function() {
			opponent.body.velocity.x = 0;
			opponent.animations.play('victory');
			opponent.animations.currentAnim.onComplete.add(function() {
				opponent.frame = 43;
			}, game);
		}

		player.body.customSeparateX = false;
		playerHP = 100;

		opponent.body.customSeparateX = false;
		opponentHP = 100;

		cropRectOpponentHP = new Phaser.Rectangle(0, 0, gameObj.objects.hpbaropponent.width, gameObj.objects.hpbaropponent.height);
		cropRectPlayerHP = new Phaser.Rectangle(0, 0, gameObj.objects.hpbarplayer.width, gameObj.objects.hpbarplayer.height);

		gameObj.objects.hpbarplayer.crop(cropRectPlayerHP);
		gameObj.objects.hpbaropponent.crop(cropRectOpponentHP);
		gameObj.objects.hpbaropponent.initialWidth = gameObj.objects.hpbaropponent.width;
		gameObj.objects.hpbarplayer.initialWidth = gameObj.objects.hpbarplayer.width;

		gameObj.objects.stateText = game.add.text(game.world.centerX, game.world.centerY - 50, ' ', {
			font: '84px mkx_titleregular',
			fill: '#E4E3E4',
			fontStyle: 'italic'
		});
		gameObj.objects.stateText.stroke = '#963131';
		gameObj.objects.stateText.strokeThickness = 4;
		gameObj.objects.stateText.anchor.setTo(0.5, 0.5);
		gameObj.objects.stateText.visible = false;

		gameObj.objects.timeText = game.add.text(game.world.centerX, 55, ' ', {
			font: '40px mkx_titleregular',
			fill: "#E4E3E4",
		});
		gameObj.objects.timeText.stroke = '#847F7F';
		gameObj.objects.timeText.strokeThickness = 2;
		gameObj.objects.timeText.anchor.setTo(0.5, -0.1)

		gameObj.objects.playerNickText = game.add.text( game.world.centerX/3 - 250	, 65, ' ', {
			font: "25px mkx_titleregular",
			fill: "#e4e3e4",
		});
		gameObj.objects.playerNickText.stroke='#847f7f';
		gameObj.objects.playerNickText.strokeThickness = 2;
		
		gameObj.objects.opponentNickText = game.add.text(game.world.centerX + 2*game.world.centerX/3, 65, ' ', {
			font: "25px mkx_titleregular",
			fill: "#e4e3e4",
		});
		gameObj.objects.opponentNickText.stroke='#847f7f';
		gameObj.objects.opponentNickText.strokeThickness = 2;

		movesList = ['stay', 'left', 'right', 'jump', 'jumpleft', 'punch', 'kick'];

		gameObj.const.aiTimer = game.time.create(false);
		gameObj.const.aiTimer.loop(11000, opponent.stay, game);
		gameObj.const.aiTimer.loop(3000, opponent.moveLeft);
		gameObj.const.aiTimer.loop(2000, opponent.punch);
		gameObj.const.aiTimer.loop(7000, opponent.jump);
		gameObj.const.aiTimer.loop(5000, opponent.moveRight);
		gameObj.const.aiTimer.loop(13000, opponent.kick);
		gameObj.const.aiTimer.start();
	};

	Game.prototype.update = function (gameObj) {
		var game = this.game;
		gameObj.objects.hpbaropponent.updateCrop();
		gameObj.objects.timeText.text = 90 - gameObj.const.aiTimer.seconds^0;


		gameObj.objects.playerNickText.text = gameObj.const.players.player.nick;
		gameObj.objects.opponentNickText.text = gameObj.const.players.opponent.nick;

		gameObj.objects.hpbarplayer.updateCrop();
		gameObj.objects.hpbarplayer_e.scale.setTo(-1, 1);
		gameObj.objects.hpbarplayer.scale.setTo(-1, 1);

		game.physics.arcade.collide(player, gameObj.objects.ground);
		game.physics.arcade.collide(opponent, gameObj.objects.ground);
		game.physics.arcade.collide(player, opponent);
		game.physics.arcade.collide(player, gameObj.objects.leftWall);
		game.physics.arcade.collide(player, gameObj.objects.rightWall);
		game.physics.arcade.collide(opponent, gameObj.objects.leftWall);
		game.physics.arcade.collide(opponent, gameObj.objects.rightWall);

		player.body.velocity.x = 0;

		if (player.body.touching.down) {
			firstFrame = false;
		}
		if (cursors.left.isDown) {
			console.log("Move to the left");
			player.body.velocity.x = -300;
			if (player.body.touching.down) {
				player.animations.play('left');
			}
		} else if (cursors.right.isDown) {
			console.log("Move to the right");
			player.body.velocity.x = 300;
			if (player.body.touching.down)
				player.animations.play('right');
		} else if (punchKey.isDown) {
			player.animations.play('punch');
			if (gameObj.fn.checkOverlap(player, opponent)) {
				if (player.frame == 24) {
					opponentHP -= 1;
					gameObj.fn.updateBarHP(cropRectOpponentHP, gameObj.objects.hpbaropponent.initialWidth, opponentHP);
				}
			}
		} else if (kickKey.isDown) {
			player.animations.play('kick');
			if (gameObj.fn.checkOverlap(player, opponent)) {
				if (player.frame == 28) {
					opponentHP -= 2;
					gameObj.fn.updateBarHP(cropRectOpponentHP, gameObj.objects.hpbaropponent.initialWidth, opponentHP);
				}
			}
		} else {
			if (player.body.touching.down) {
				if (player.animations.currentAnim.loop || player.frame == 15) {
					player.animations.play('stay');
				} else {
					player.animations.currentAnim.onComplete.add(function() {player.animations.play('stay')}, game);
				}
			} else {
				if (firstFrame == true) {
					console.log ('we are flying for the first time');
					opponent.animations.play('stay');
					player.frame = 15;
				}
			}
		}
		if (cursors.up.isDown && player.body.touching.down) {
			console.log("Jump");
			if (cursors.left.isDown) {
				player.animations.play('jumpleft');
			} else {
				player.animations.play('jump');
			}
			player.animations.currentAnim.onComplete.add(function() {player.frame = 15}, game);
			player.body.velocity.y = -1150;
		}
		if (opponent.animations.currentAnim.name == 'punch') {
			if (gameObj.fn.checkOverlap(player, opponent)) {
				playerHP -= 1;
				gameObj.fn.updateBarHP(cropRectPlayerHP, gameObj.objects.hpbarplayer.initialWidth, playerHP);
			}
		}
		if (opponent.animations.currentAnim.name == 'kick') {
			if (gameObj.fn.checkOverlap(player, opponent)) {
				playerHP -= 2;
				gameObj.fn.updateBarHP(cropRectPlayerHP, gameObj.objects.hpbarplayer.initialWidth, playerHP);
			}
		}

		if (gameObj.const.currentGameStatus === 'round') {
			if (opponentHP <= 0) {
				gameObj.fn.finishRound(opponent, gameObj.const.players.player.name);
			} else if (playerHP <= 0) {
				gameObj.fn.finishRound(player, gameObj.const.players.opponent.name);
			} else {
				console.warn('pizda');
			}
		}
	};

	Game.prototype.preload = function (gameObj) {
		var game = this.game,
			resources = gameObj.res,
			objects = resources.objects,
			characters = resources.characters,
			players = gameObj.const.players;

		$.each(objects, function (key, val) {
			game.load.image(key, val);
		});

		$.each(players, function (key, val) {
			// debugger
			game.load.spritesheet(key, characters[val.name].sprite, 141, 0);
		});

	};

	return Game;
});
