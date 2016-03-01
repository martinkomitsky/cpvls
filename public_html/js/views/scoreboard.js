define(function(require) {

    var Backbone = require('backbone'),
		baseView = require('views/baseView'),
		tmpl = require('tmpl/scoreboard'),
		scores = require('collections/scores');

        var View = baseView.extend({
            template: function() {
            	return tmpl({scores: scores.toJSON()});
            },
            collection: scores,
        });

        return new View();
    }
);