define(function (require) {
	var Backbone = require('backbone'),
		tmpl = require('tmpl/appView');

	var AppView = Backbone.View.extend({
		initialize: function () {
			this.$el = $(".page");
			this.views.list = {};
			this.views.create = {};
			this.views.that = this;
			this.bindEvents();
		},
		render: function () {
			this.$el.html(tmpl());
			return this;
		},
		views: {
			add: function (Views) {
				_.each(Views, function (View, name) {
					this.create[name] = View;
					console.warn(name, View)
				}, this);
			},
			get: function (viewName) {
				var view = this.list[viewName];
				if (!view) {
					view = new this.create[viewName]();
					this.that.listenTo(view, 'show', this.hide)
					view.render();
					this.that.$('.game').append(view.$el);
					this.list[viewName] = view;
				}

				return view;
			},
			hide: function (view) {
				_.each(this.views.list, function (vi) {
					if (view !== vi) {
						vi.hide();
					}
				}, this);
			},
		},
		bindEvents: function () {
			console.info('[bindEvents]');
			var pressed = false;
			$(document).bind('keydown', function(e) {
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

			$(document).on('focusout', '.js-focus', function(e) {
				if (!pressed) {
					console.log(e);
					e.preventDefault();
					$(this).focus();
				}

			}).on('focus', '.js-focus', function(e) {
				pressed = false;
			});

			$(document).on('keypress', 'body', function(e) {
				$(".content__game-splash").addClass('content__game-splash_hidden');
				$(document).off('keypress')
			}).on('animationend', '.content__game-splash', function(e) {
				$('.content__game-splash').hide();
			});

		}

	});
	return new AppView();
});