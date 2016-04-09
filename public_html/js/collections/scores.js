define(function(require) {

	var Backbone = require('backbone'),
	Score = require('models/score');

	var Collection = Backbone.Collection.extend({
		initialize: function() {
			console.log("Collection initialized");
		},
		model: Score,
		comparator: function(score) {
			return -score.get('score');
		}
	});

	return new Collection([
		{ name: 'Zchireenoffskeey', score: 5140 },
		{ name: 'Kiseljoff', score: 4517 },
		{ name: 'Poroshenko', score: 1522 },
		{ name: 'POLINITY', score: 5513 },
		{ name: 'Milonoff', score: 5517 },
		{ name: 'NITRAM', score: 5555 },
		{ name: 'BELYANOFF', score: 5508 },
		{ name: 'PUHOVITY', score: 5500 },
		{ name: 'Timoschenko', score: 5534 },
		{ name: 'Yatsenyook', score: 2575}
	]);
});