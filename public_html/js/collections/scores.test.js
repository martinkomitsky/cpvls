define(function(require) {
    QUnit.module('collections/scores');

    QUnit.test('Проверка коллекции на предмет отсортированности', function () {
        var scores = require('collections/scores');
        scores.add([
            { name: 'Asrodeep', score: 111321312312135140 },
            { name: 'Caddak', score: 432 },
            { name: 'Veef', score: -7 },
            { name: 'Ses', score: -500 },
        ]);
        scores = scores.toJSON();

        var scoresSorted = _.sortBy(scores, function (model) {
                return -model.score;
            });

        QUnit.ok(_.isEqual(scores, scoresSorted), 'Returned array is sorted (lib sort)');
        QUnit.ok(scores[0].score === 111321312312135140 && scores[scores.length -1].score == -500, 'Returned array is sorted');

    });
});