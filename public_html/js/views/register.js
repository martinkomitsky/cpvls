define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/register'),
		user = require('models/user'),
		FileAPI = require('FileAPI');

	var View = BaseView.extend({
		template: function() {
			return tmpl({
				user: user,
				errorReason: this.errorReason,
				validationError: user.validationError || {},
				formData: this.formData || {},
				errorAnimation: this.errorAnimation
			});
		},
		model: user,
		className: 'game__main game__main_visible js-register',
		events: {
			'submit .js-form': 'submit',
			'reset .js-form': 'reset',
			'click .js-camera': 'showCamera',
			'mouseover .js-delete-avatar': 'hoverOnPreviewImg',
			'mouseout .js-delete-avatar': 'hoverOnPreviewImg',
			'click .js-shotter': 'capture',
			'click .js-delete-avatar': 'deleteAvatar',
			'click .js-cancel': 'cancel'
		},
		show: function () {
			console.log("show()", this, this.$('.game-menu__form'));
			this.$('.js-form').attr('novalidate', 'novalidate');
			return BaseView.prototype.show.call(this);
		},
		initialize: function () {
			this.errorReason = false;
			this.errorAnimation = true;
			return BaseView.prototype.initialize.call(this);
		},
		submit: function (event) {
			event.preventDefault();
			this.formData = this.$('.js-form').serializeObject();
			this.formData.email = this.formData.email.toLowerCase();
			this.formData.login = this.formData.login.toLowerCase();

			this.model.save(this.formData, {
				success: function (model, xhr) {
					console.log(xhr);
					user.set({isRegistered: true});
					this.errorReason = false;
					this.render();
					this.show();
					this.formData = null;
					this.$('.js-form').trigger('reset');
					this.errorAnimation = true;
					Backbone.history.navigate('#main', {trigger: true});
				}.bind(this),
				error: function (model, xhr) {
					xhr.responseText == xhr.responseText || '{}';
					this.errorReason = JSON.parse(xhr.responseText).error;
					this.render();
					this.show();
					this.errorAnimation = false;
					console.log(this.errorReason);
				}.bind(this)
			});

			if (user.validationError) {
				console.warn('[validation error]', user.validationError);
			}
			this.render();
			this.show();
		},
		reset: function () {
			$.each(this.$('.js-input'), function (key, val) {
				$(val).attr('value', '');
			});
		},
		bindEvents: function () {
			this.listenTo(this.model, 'change', function (event) {
				console.log('change', event);
			});
		},
		hoverOnPreviewImg: function (event) {
			if (event.originalEvent.type === 'mouseover') {
				this.$('.avatar__delete').addClass('avatar__delete_visible');
				this.$('.avatar__preview').addClass('avatar__preview_faded');
			} else if (event.originalEvent.type === 'mouseout') {
				this.$('.avatar__delete').removeClass('avatar__delete_visible');
				this.$('.avatar__preview').removeClass('avatar__preview_faded');
			} else {
				console.log('errorets');
			}
		},
		showCamera: function() {
			var $captureButton = this.$('.js-shotter'),
				$cameraButton = this.$('.js-camera'),
				$cancelButton = this.$('.js-cancel')
				$preview = this.$('.js-preview');

			$cameraButton.hide();
			$captureButton.show();
			$cancelButton.show();
			this.$('.js-preview').find('video').show();

			$preview.find('video').show();
			this._avatar = null;

			if (!this.camera) {
				this.initCamera();
			} else {
				this.camera.start();
			}
		},
		capture: function (event) {
			event.preventDefault();
			var $preview = this.$('.js-preview'),
				$cameraButton = this.$('.js-camera'),
				$captureButton = this.$('.js-shotter'),
				$cancelButton = this.$('.js-cancel');

			if (this.camera.isActive()) {
				var shot = this.camera.shot();

				this._avatar = shot.file;

				shot.preview(218).get(function (err, img) {
					$preview.find('video').hide();
					$preview.append(img);
				});
				this.camera.stop();
				this.$('.avatar__delete').removeClass('avatar__delete_invisible');

			} else {
				$preview.find('video').hide();
				this.camera.start();
				$cameraButton.show();
			}

			$captureButton.hide();
			$cancelButton.hide();
		},
		deleteAvatar: function () {
			var $preview = this.$('.js-preview');
			this.$('.avatar__delete').addClass('avatar__delete_invisible');
			this.camera.start();
			$preview.find('canvas').remove();
			$preview.find('video').show();
			this.showCamera();
		},
		cancel: function (event) {
			event.preventDefault();
			this.camera.stop();
			this.$('.js-preview').find('video').hide();
			this.$('.js-camera').show();
			this.$('.js-cancel').hide();
			this.$('.js-shotter').hide();
			this.camera.stop();

		},
		initCamera: function () {
			var $preview = this.$('.js-preview'),
				$cameraButton = this.$('.js-camera');
				$captureButton = this.$('.js-shotter');

			FileAPI.Camera.publish($preview, { width: 218, height: 218 }, function (err, cam) {
				this.camera = cam;
				if (err) {
					console.warn('error');//todo notifier
					$preview.find('video').hide();
					$preview.css('width','0').css('height','0');

					$cameraButton.show();
					$captureButton.hide();

					return;
				}

			}.bind(this));
		}
	});

	return View;
});