define(function (require) {
	var Backbone = require('backbone'),
		tmpl = require('tmpl/appView'),
		so = require('serializeObject');

	var AppView = Backbone.View.extend({
		initialize: function () {
			this.$el = $(".page");
			this.views.list = {};
			this.views.create = {};
			this.bindEvents();
			this.current = 0;
			this.pressed = false;
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
			this.scope = viewName;
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
			this.current = 0;
			this.menus = this.$('.js-' + this.scope + ' .js-focus');
			_.each(this.views.list, function (vi) {
				if (view !== vi) {
					vi.hide();
				}
			}, this);
		},
		bindEvents: function () {
			console.info('[bindEvents]');
		},
		events: {
			'click .js-video-stop': 'stop',
			'click .js-video-play': 'play',
			'keydown': 'keyHandler',
			'focus .js-focus': 'focus',
			'focusout .js-focus': 'resetFocus',
			'mousedown .js-focus': 'mouseDown',
			'mouseup .js-focus': 'mouseUp'
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
		},
		keyHandler: function (event) {
			if (event.keyCode == 40) {
				this.next = this.current + 1;
				if (this.next <= this.menus.length - 1) {
					this.pressed = true;
					this.current = this.next;
					this.menus.eq(this.current).focus();
				}
			}
			if (event.keyCode == 38) {
				this.next = this.current - 1;
				if (this.next >= 0) {
					this.pressed = true;
					this.current = this.next;
					this.menus.eq(this.current).focus();
				}
			}
		},
		focus: function () {
			this.pressed = false;
		},
		resetFocus: function (event) {
			if (!this.pressed) {
				$(event.target).focus();
			}
		},
		mouseDown: function (event) {
			this.pressed = true;
		},
		mouseUp: function (event) {
			this.pressed = false;
		}
	});
	return new AppView();
});