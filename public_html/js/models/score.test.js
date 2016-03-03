define(function (require) {
    QUnit.module("models/score");

    QUnit.test("ScoreModel - экземпляр Backbone.Model", function () {

        var ScoreModel = require('./score'),
            score = new ScoreModel();

        QUnit.ok(score instanceof Backbone.Model, 'Zadikis');

    });

    QUnit.test("test sest", function () {
        var //Backbone = require('backbone'),
            //_ = require('underscore'),

        	scores = require('collections/scores').toJSON(),
        	scoresSorted = _.sortBy(scores, '-score');
        console.info('scores', scores);
        console.info('scoresSorted', scoresSorted);
        var areArraysEqual = function(array1, array2) {
            if (array1.length !== array2.length) {
                return false;
            }
            for (var i = 0; i < array1.length; i++) {
                if (array1[i].name !== array2[i].name && array1[i].score !== array2[i].score) {
                	console.log("huynya")
                    return false;
                }
            }
            return true;
        };

        QUnit.ok(areArraysEqual(scores, scoresSorted), 'Returned array is sorted');
    });
});