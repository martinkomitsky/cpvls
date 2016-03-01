define(function(require) {

    var baseView = require('views/baseView'),
        tmpl = require('tmpl/splashScreen'),
        event = require('event');

    var View = baseView.extend({
        template: tmpl,
        render: function() {
            $(document).on('keypress', 'body', function(e) {
                console.log('shit');
                $(".content__game-splash").addClass('content__game-splash_hidden');
                $(document).off('keypress')
            }).on('animationend', '.content__game-splash', function(e) {
                $('.content__game-splash').hide();
                event.trigger('navigate', 'main');
                // $('.content__game-main').addClass('content__game-main_visible');
                // $('.game-menu__nav-item').eq(0).focus();
            });
            return baseView.prototype.render.call(this);
        },
        // events: {
        // 	'keypress': function(e) {
        // 		console.warn('keypress')
        // 	}
        // }
    });

    return new View();
    }
);