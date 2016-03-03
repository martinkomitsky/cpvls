define(function (require) {
    QUnit.module("models/score");

    QUnit.test("ScoreModel - экземпляр Backbone.Model", function () {

        var ScoreModel = require('./score'),
            score = new ScoreModel();

        QUnit.ok(score instanceof Backbone.Model);

    });
});
