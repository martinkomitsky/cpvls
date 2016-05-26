define(function (require) {
	var Backbone = require('backbone'),
		tmpl = require('tmpl/appView'),
		so = require('serializeObject'),
		session = require('models/session'),
		user = require('models/user'),

		toolbar = require('views/toolbar');

	var AppView = Backbone.View.extend({
		model: session,
		user: user,
		template: tmpl,
		initialize: function () {
			this.$el = $("#page");
			this.views.list = {};
			this.views.create = {};
			this.bindEvents();
			this.current = 0;
			this.pressed = false;

			this.model.fetch({
				success: function (model, xhr, c) {
					console.log('success', xhr);
					this.model.set({isSignedIn: true});
					this.user.fetch({
						success: function (model, xhr, c) {
							console.log('user fetch success', model, xhr, c);
						}.bind(this),
						error: function (model, xhr) {
							console.log('error', xhr.responseText);
						}
					});
				}.bind(this),
				error: function (model, xhr) {
					console.log('error', xhr.responseText);
				}
			});

		},
		render: function () {
			this.$el.html(this.template(
				{session: this.model.toJSON(), user: this.user.toJSON()}
			));
			this.renderLogin();
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
			this.listenTo(this.model, 'change', this.saveUserID);
			this.listenTo(this.user, 'change', this.renderLogin);
		},

		saveUserID: function (event) {
			console.info('[APPVIEW] session changed', event);
			if (event.attributes.id) {
				this.user.set({id: this.model.get('id')});
			}
			this.renderLogin();
		},

		renderLogin: function (event) {
			console.info('[APPVIEW] user changed', event);
			this.$('.js-toolbar').html(toolbar.render().$el);
		},

		events: {
			'click .js-video-stop': 'stop',
			'click .js-video-play': 'play',
			'click .js-logout': 'logout',
			'keydown': 'keyHandler',
			'focus .js-focus': 'focus',
			'focusout .js-focus': 'resetFocus',
			'mousedown .js-focus': 'mouseDown',
			'mouseup .js-focus': 'mouseUp'
		},

		logout: function (event) {
			this.model.destroy({
				success: function (model, xhr) {
					console.log('success', xhr);
					user.clear();
					session.clear();
					session.set({isSignedIn: false});
					Backbone.history.navigate('#main', {trigger: true});
				}.bind(this),
				error: function (model, xhr) {
					console.log('error', xhr.responseText);
				}
			});
		},

		stop: function (event) {
			this.$('.js-video').toggleClass('js-video-stop js-video-play');
			this.$('.btn-video__icon').toggleClass('fa-pause fa-play');
			this.$('.vbg').attr('src', '');
		},
		play: function (event) {
			this.$('.js-video').toggleClass( 'js-video-play js-video-stop');
			this.$('.btn-video__icon').toggleClass('fa-play fa-pause');
			$video = this.$('.vbg');
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