define(
    ['views/baseView', 'tmpl/register'],
    function (baseView, tmpl) {
        var View = baseView.extend({
            template: tmpl
        });

        return new View();
    }
);