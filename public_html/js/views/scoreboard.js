define(function(require) {

    var Backbone = require('backbone'),
		BaseView = require('views/baseView'),
		tmpl = require('tmpl/scoreboard'),
		scores = require('collections/scores');

        var View = BaseView.extend({
            template: function() {
            	return tmpl({scores: scores.toJSON()});
            },
            initialize: function() {
                console.log('init');
            },
            collection: scores,
        });

        return new View();
    }
);