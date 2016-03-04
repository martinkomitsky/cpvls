define(function (require) {

    var Backbone = require('backbone'),
        event = require('event');

    var View = Backbone.View.extend({
        template: {},
        initialize: function () {
            console.log('[INIT]', this.$el);
            this.bindEvents();
            return this;
        },
        render: function () {
            this.$el.html(this.template());

            return this;
        },
        show: function () {
            $('.content__game').html(this.render().el);
            this.$('.js-focus').eq(0).focus();
            // this.$el.show();
        },
        hide: function () {
            this.$el.hide();
            this.$el.off();
        },
        bindEvents: function() {
            console.info('[bindEvents]');
            var pressed = false;
            $(document).unbind('keydown').bind('keydown', function(e) {
                if (e.keyCode == 40) {
                    console.info('down');
                    target = $('.js-focus:focus').parent().next().children();
                    if (target.length) {
                        pressed = true;
                        target.focus();
                    }
                }
                if (e.keyCode == 38) {
                    console.info('up');
                    target = $(".js-focus:focus").parent().prev().children();
                    if (target.length) {
                        pressed = true;
                        target.focus();
                    }
                }
            });

            $(document).off('focusout').on('focusout', '.js-focus', function(e) {
                if (!pressed) {
                    console.log(e);
                    e.preventDefault();
                    $(this).focus();
                }

            }).off('focus').on('focus', '.js-focus', function(e) {
                pressed = false;
            });
        }
    });

        return View;
    }
);