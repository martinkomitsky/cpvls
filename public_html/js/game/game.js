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
				'ground': 'images/assets/platform.png',
				'hpbar': 'images/assets/hpbar.png',
				'hpbar-empty': 'images/assets/hpbar_empty.png',
				'menu': 'images/assets/menu.png',
				'wall': 'images/assets/wall.png',
			},
			characters: [
				'images/assets/zero.png',
				'images/assets/scorpion.png'
			],
			gameModes: [
				'singleplayer',//todo
				'multiplayer'
			]
		}
		this.res.objects['arena'] = this.res.arenas[this.res.currentArena];

		this.fn = {
			initWall: function  (x, y) {
				wall = game.add.sprite(x, y, 'wall');
				wall.scale.setTo(10, 25);
				wall.game.physics.arcade.enableBody(wall);
				wall.visible = false;
				wall.body.immovable = true;
				return wall;
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

		ground = game.add.sprite(0, game.world.height - 16, 'ground');
		ground.scale.setTo(5, 2);
		ground.game.physics.arcade.enableBody(ground);
		ground.visible = false;
		ground.body.immovable = true;

		hpbarplayer_e = game.add.sprite(game.world.width / 2, 50, 'hpbar-empty');
		hpbaropponent_e = game.add.sprite(game.world.width / 2, 50, 'hpbar-empty');
		hpbarplayer = game.add.sprite(game.world.width / 2, 50, 'hpbar');
		hpbaropponent = game.add.sprite(game.world.width / 2, 50, 'hpbar');

		cursors = game.input.keyboard.createCursorKeys();
		punchKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		kickKey = game.input.keyboard.addKey(Phaser.Keyboard.X);

		player = game.add.sprite(game.world.width/100*25, game.world.height - 750, 'player');
		player.scale.setTo(2.2,2.2);

		opponent = game.add.sprite(game.world.width/100*75 , game.world.height - 750, 'opponent');
		opponent.scale.setTo(-2.2,2.2);
		opponent.anchor.setTo(0.5);

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
			val.animations.add('kick', [26, 27, 28, 29, 30, 31, 32], 10, false);
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
			opponent.animations.play('punch');
			opponent.animations.currentAnim.onComplete.add(function() {
				opponent.animations.play('stay')
			}, game)
		}

		opponent.jump = function() {
			opponent.animations.play('jump');
			opponent.body.velocity.x = -100;
			opponent.body.velocity.y = -1000;
			opponent.animations.currentAnim.onComplete.add(function() {
				opponent.animations.play('stay')
			}, game);
		};

		player.body.customSeparateX = false;
		playerHP = 100;

		opponent.body.customSeparateX = true;
		opponentHP = 100;

		cropRectOpponentHP = new Phaser.Rectangle(0, 0, hpbaropponent.width, hpbaropponent.height);
		cropRectPlayerHP = new Phaser.Rectangle(0, 0, hpbarplayer.width, hpbarplayer.height);

		hpbarplayer.crop(cropRectPlayerHP);
		hpbaropponent.crop(cropRectOpponentHP);
		hpbaropponent.initialWidth = hpbaropponent.width;
		hpbarplayer.initialWidth = hpbarplayer.width;

		stateText = game.add.text(game.world.centerX,game.world.centerY -50, ' ', {
			font: '84px mkx_titleregular',
			fill: '#fff',
			fontStyle: 'italic'
		});
		stateText.stroke = '#963131';
		stateText.strokeThickness = 4;
		stateText.anchor.setTo(0.5, 0.3);
		stateText.visible = false;

		movesList = ['stay', 'left', 'right', 'jump', 'jumpleft', 'punch', 'kick'];

		timer = game.time.create(false);
		timer.loop(11000, opponent.stay, game);
		timer.loop(3000, opponent.moveLeft);
		timer.loop(2000, opponent.punch);
		timer.loop(7000, opponent.jump);
		timer.loop(5000, opponent.moveRight);
		timer.start();
	};

	Game.prototype.update = function (gameObj) {
		var game = this.game;
		hpbaropponent.updateCrop();

		hpbarplayer.updateCrop();
		hpbarplayer_e.scale.setTo(-1, 1);
		hpbarplayer.scale.setTo(-1, 1);

		game.physics.arcade.collide(player, ground);
		game.physics.arcade.collide(opponent, ground);
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
			if (gameObj.checkOverlap(player, opponent)) {
				if (player.frame == 24) {
					opponentHP -= 1;
					cropRectOpponentHP.width = hpbaropponent.initialWidth / 100 * opponentHP;
				}
			}
		} else if (kickKey.isDown) {
			player.animations.play('kick');
			if (gameObj.checkOverlap(player, opponent)) {
				if (player.frame == 28) {
					opponentHP -= 2;
					cropRectOpponentHP.width = hpbaropponent.initialWidth / 100 * opponentHP;
				}
			}
		} else {
			if (player.body.touching.down)
				if (player.animations.currentAnim.loop || player.frame == 15) {
					player.animations.play('stay');
				} else {
					player.animations.currentAnim.onComplete.add(function() {player.animations.play('stay')}, game);
				}
			else {
				if (firstFrame == true) {
					console.log ('we are flying for the first time');
					opponent.animations.play('stay');
					player.frame = 15
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
			if (gameObj.checkOverlap(player, opponent)) {
				playerHP -= 2;
				cropRectPlayerHP.width = hpbarplayer.initialWidth / 100 * playerHP;
			}
		}
		if (opponentHP <= 0) {
			gameObj.finishRound(opponent, 'PLAYER 1');
		}
		if (playerHP <= 0) {
			gameObj.finishRound(player, 'PLAYER 2');
		}


	};
	Game.prototype.preload = function (gameObj) {
		var game = this.game,
			resources = gameObj.res,
			objects = resources.objects,
			characters = resources.characters;

		$.each(objects, function (key, val) {
			game.load.image(key, val);
		});

		$.each(['player', 'opponent'], function (key, val) {
			game.load.spritesheet(val, characters[Math.random() * 2^0], 141, 0);
		});

	};
	Game.prototype.checkOverlap = function (spriteA, spriteB) {
		var boundsA = spriteA.getBounds(),
			boundsB = spriteB.getBounds();

		return Phaser.Rectangle.intersects(boundsA, boundsB);
	}

	Game.prototype.finishRound = function (loser, winnerName) {
			loser.kill();
			stateText.text = winnerName + ' WINS!';
			stateText.visible = true;
			hpbaropponent_e.visible = false;
			hpbaropponent.visible = false;
			hpbarplayer.visible = false;
			hpbarplayer_e.visible = false;
		}
	return Game;
});
