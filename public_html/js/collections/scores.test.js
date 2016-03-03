define(function(require) {
    QUnit.module('collections/scores');

    QUnit.test('Проверка коллекции на предмет отсортированности', function () {
        var scores = require('collections/scores').toJSON(),
            scoresSorted = _.sortBy(scores, function (model) {
            	return -model.score;
            });

        console.info('scores', scores);
        console.info('scoresSorted', scoresSorted);
        QUnit.ok(_.isEqual(scores, scoresSorted), 'Returned array is sorted');
    });
});