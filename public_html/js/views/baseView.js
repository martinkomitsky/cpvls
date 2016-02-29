define(
    ['backbone', 'event'],
    function (Backbone, event) {
        var View = Backbone.View.extend({
            template: {},
            initialize: function () {
                console.log('[INIT]')
            },
            render: function () {
                var pressed = false;
                $(document).unbind('keydown').bind('keydown', function(e) {
                    if (e.keyCode == 40) {
                        console.info('down');
                        target = $('.game-menu__nav-item:focus').parent().next().children();
                        if (target.length > 0) {
                            pressed = true;
                            target.focus();
                        }
                    }
                    if (e.keyCode == 38) {
                        console.info('up');
                        target = $(".game-menu__nav-item:focus").parent().prev().children();
                        if (target.length > 0) {
                            pressed = true;
                            target.focus();
                        }
                    }
                });
                // debugger;

                $(document).off('focusout').on('focusout', '.game-menu__nav-item', function(e) {
                    if (!pressed) {
                        console.log(e);
                        e.preventDefault();
                        $(this).focus();
                    }

                }).off('focus').on('focus', '.game-menu__nav-item', function(e) {
                    pressed = false;
                });                    
                this.$el.html(this.template());
            
                return this;
            },
            show: function () {
                $('.content__game').html(this.render().el);
                this.$el.find('.js-back').click(function(e) {
                    e.preventDefault();
                    event.trigger('navigate', $(this).attr('id'));
                    console.log('navigate');
                });
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
                this.$el.off();
            },
            events: {
                'click a': function(e) {
                    console.warn('neekhooya');
                }
            }            
        });

        return View;
    }
);