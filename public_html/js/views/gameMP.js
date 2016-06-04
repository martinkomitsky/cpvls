define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/gameMP'),
		phaser = require('Phaser'),
		user = require('models/user'),
		G = require('game/game')//,
		peer = require('lib/peer');

	var View = BaseView.extend({
		template: function () {
			return tmpl({
				player: this.player,
				opponent: this.opponent
			});
		},
		model: user,
		className: 'game__main game__main_visible js-gameMP',
		initialize: function() {
			this.gameObj = new G();
			var peer = new Peer({key: 'qe9bruuypj02j4i'}),
				conn = null,
				currentID = null;

			this.listenTo(this.model, 'change', this.userCallback);

			this.on('startTimer', this.startTimer);
			this.on('startGame', this.startGame);

			this.master = false;
			console.warn(this.model.toJSON().login, 'adasassad');
			this.player = {
				ready: false,
				name: this.model.toJSON().login || 'GUEST'
			};

			this.opponent = {
				name: 'Waiting for an opponent...',
				ready: false
			};
			self = this;
			peer.on('open', function(id) {
				currentID = id;
				console.log('My peer ID is: ' + id);

				var credentials = {
					id: id,
					name: self.player.name
				}


				$.post('/api/game.html', {name: JSON.stringify(credentials)});
				var ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port + '/api/gameplay');

				ws.onopen = function (event) {
					console.info('[ws opened]');
					self.render();
				};

				ws.onmessage = function (event) {
					var wsdata;
					try {
						wsdata = JSON.parse(event.data)
					} catch (e) {
						console.warn('huge shit');
					}
					console.log('ws message', wsdata);
					wsdata.enemyName = JSON.parse(wsdata.enemyName);
					var peerID = wsdata.enemyName.id;
					self.opponent.name = wsdata.enemyName.name;
					self.render();


					self.master = wsdata.master;

					if (peerID) {
						console.info(peerID + " is our enemy");
						conn = peer.connect(peerID);
						self.conn = conn;
						conn.on('open', function() {
							conn.send(JSON.stringify({message: 'HI! I am peer ' + currentID}));
						});

						peer.on('connection', function (conn) {
							conn.on('data', function (data) {
								console.info('Received', data);
								data = JSON.parse(data);

								if (data.message === 'ready') {
									self.opponent.ready = true;
									self.render();

									self.trigger('startTimer');
								}
								if (data.message === 'not ready') {
									self.opponent.ready = false;
									self.trigger('startTimer');
									self.render();
								}

								if (data.message === 'left') {
									self.gameObj.const.players.opponent.inst.moveLeft();
								}
								if (data.message === 'right') {
									self.gameObj.const.players.opponent.inst.moveRight();
								}
								if (data.message === 'jump') {
									self.gameObj.const.players.opponent.inst.jump();
								}
								if (data.message === 'kick') {
									self.gameObj.const.players.opponent.inst.kick();
								}
								if (data.message === 'punch') {
									self.gameObj.const.players.opponent.inst.punch();
								}
								if (data.message === 'stay') {
									self.gameObj.const.players.opponent.inst.stay();
								}

								if (data.message === 'hp') {
									self.gameObj.const.players.opponent.inst.hp(data.amount);
								}

							});

						});
						// let i = 0;
						// var message = self.master ? {message:'ping'}: {message:'pong'};
						// setInterval(function () {
						// 	i++;
						// 	message.i = i;
						// 	conn.send(JSON.stringify(message));
						// }, 1000);
					}
				}
			});

		},
		render: function() {
			return BaseView.prototype.render.call(this);
		},
		events: {
			'click .js-ready': 'ready'
		},

		userCallback: function (model) {
			this.player.name = this.model.toJSON().login;
		},
		startTimer: function () {
			console.warn('startTimer!!!');
			if (this.player.ready && this.opponent.ready) {
				var i = 1;
					if (!this.interval) {
						this.interval = setInterval(function () {
							if (i === 2) {
								$('.timer').text('');
								clearInterval(self.interval);
								self.interval = undefined;
								console.info(i, 'stop!');
								$('.timer, .game__menu-wrapper').hide();
								self.trigger('startGame');
							} else {
								console.info('countdown to start', i);
								$('.timer').text(i);
								i++;
							}
						}, 1000);
					}
			} else {
				console.warn("CLEARING interval")
				clearInterval(this.interval);
				$('.timer').text('');
				this.interval = undefined;
			}
		},
		startGame: function () {
			console.log('startGame!');
			var state = {
				preload: this.gameObj.preload.bind(this, this.gameObj, this.conn),
				create: this.gameObj.create.bind(this, this.gameObj, this.conn),
				update: this.gameObj.update.bind(this, this.gameObj, this.conn)
			};
			this.game = new Phaser.Game("100", "100", Phaser.AUTO, 'playscreen', state);
			window.game = this.game;

		},
		ready: function () {
			if (!$('.js-ready').hasClass('js-disabled')) {
				if (this.player.ready === false) {
					this.player.ready = true;
					this.conn.send(JSON.stringify({message: 'ready'}));
					this.trigger('startTimer');
					this.render();
				} else {
					this.player.ready = false;
					this.conn.send(JSON.stringify({message: 'not ready'}));
					this.trigger('startTimer');
					this.render();
				}
			} else {
				console.warn('js-disabled!');
			}
		}
	});

	return View;
});