define(function(require) {

	var Backbone = require('backbone');

    var Model = Backbone.Model.extend({
    	defaults: {
			name: '',
			score: 0
		}
    });

    return Model;
});