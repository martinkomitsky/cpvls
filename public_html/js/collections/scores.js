define(function(require) {

	var Backbone = require('backbone'),
	Score = require('models/score');

	var Collection = Backbone.Collection.extend({
		initialize: function() {
			console.log('Collection initialized');
		},
		model: Score,
		comparator: function(score) {
			return -score.get('score');
		},
		url: '/api/highscores/',
		sync: function (method, model, options) {
			console.info('method', method, model, options);
			options.url = this.url;
			switch (method) {
				case 'create':
					break;
				case 'read':
					Backbone.sync('read', this, options);
					break;
				case 'update':
					break;
				case 'delete':
					break;
			}
		}
	});

// [
// 	{ name: 'Zchireenoffskeey', score: 5140 },
// 	{ name: 'Kiseljoff', score: 4517 },
// 	{ name: 'Poroshenko', score: 1522 },
// 	{ name: 'POLINITY', score: 5513 },
// 	{ name: 'Milonoff', score: 5517 },
// 	{ name: 'NITRAM', score: 5555 },
// 	{ name: 'BELYANOFF', score: 5508 },
// 	{ name: 'PUHOVITY', score: 5500 },
// 	{ name: 'Timoschenko', score: 5534 },
// 	{ name: 'Yatsenyook', score: 2575}
// ]

	return new Collection();
});