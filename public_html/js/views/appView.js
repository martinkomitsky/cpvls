define(function (require) {
	var Backbone = require('backbone'),
		tmpl = require('tmpl/appView'),
		so = require('serializeObject');

	var AppView = Backbone.View.extend({
		initialize: function () {
			this.$el = $(".page");
			this.views.list = {};
			this.views.create = {};
			this.that = this;
			this.bindEvents();
		},
		render: function () {
			this.$el.html(tmpl());
			return this;
		},
		views: {},
		add: function (Views) {
			_.each(Views, function (View, name) {
				this.views.create[name] = View;
			}, this);
		},
		get: function (viewName) {
			var view = this.views.list[viewName];
			if (!view) {
				view = new this.views.create[viewName]();
				this.listenTo(view, 'show', this.hide)
				view.render();
				this.$('.game').append(view.$el);
				this.views.list[viewName] = view;
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
					// console.log(e);
					e.preventDefault();
					$(this).focus();
				}

			}).on('focus', '.js-focus', function(e) {
				pressed = false;
			});
		},
		events: {
			'click .js-video-stop': 'stop',
			'click .js-video-play': 'play'
		},
		stop: function (e) {
			this.$('.js-video').toggleClass('js-video-stop js-video-play');
			this.$('.btn-video__icon').toggleClass('fa-pause fa-play');
			this.$('.vbg').attr('src', '');
		},
		play: function (e) {
			this.$('.js-video').toggleClass( 'js-video-play js-video-stop');
			this.$('.btn-video__icon').toggleClass('fa-play fa-pause');
			$video = this.$('.vbg')
			$video.attr('src', $video.attr('data-src'));
		}

	});
	return new AppView();
});