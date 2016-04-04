define(function(require) {
    QUnit.module('models/score');

    QUnit.test('ScoreModel - экземпляр Backbone.Model', function() {

        var ScoreModel = require('./score'),
            score = new ScoreModel();

        QUnit.ok(score instanceof Backbone.Model, 'Score is instance of Backbone.Model');

    });
    QUnit.test("Количество очков больше 0", function () {

        var ScoreModel = require('./score'),
            score = new ScoreModel();
            score.score = 24;

        QUnit.ok(score.score >= 0);

    });
});
