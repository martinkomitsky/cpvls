define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/register'),
		user = require('models/user'),
		FileAPI = require('FileAPI');

	var View = BaseView.extend({
		template: function() {
			return tmpl({user: user});
		},
		model: user,
		className: 'game__main game__main_visible js-register',
		events: {
			'submit .js-form': 'submit',
			'click .js-camera': 'showCamera',
			'mouseover .js-delete-avatar': 'hoverOnPreviewImg',
			'mouseout .js-delete-avatar': 'hoverOnPreviewImg',
			'click .js-shotter': 'capture',
			'click .js-delete-avatar': 'deleteAvatar',
			'click .js-cancel': 'cancel'
		},
		show: function () {
			this.$('.game-menu__form').attr('novalidate', 'novalidate');
			return BaseView.prototype.show.call(this);
		},
		initialize: function () {

		},
		hoverOnPreviewImg: function (event) {
			if (event.originalEvent.type === 'mouseover') {
				this.$('.avatar__delete').addClass('avatar__delete_visible');
				this.$('.avatar__preview').addClass('avatar__preview_faded');
			} else if (event.originalEvent.type === 'mouseout') {
				this.$('.avatar__delete').removeClass('avatar__delete_visible');
				this.$('.avatar__preview').removeClass('avatar__preview_faded');
			} else {
			}
		},
		submit: function (event) {
			event.preventDefault();
			var data = this.$('.js-form').serializeObject()

			this.model.save(data, {
				success: function (model, xhr) {
					user.set({isRegistered: true});
					this.render();
					this.trigger('navigate')
				}.bind(this),
				error: function (model, xhr) {
					alert('error');
				}
			});

			if (user.validationError) {
				this.$('.menu__item_input').
					removeClass('menu__item_input_valid');
				$.each(user.validationError, function(key, val) {
					if (!val) {
						this.$('.menu__item_input[name=' + key + ']').addClass('menu__item_input_invalid');
					} else {
						this.$('.menu__item_input[name=' + key + ']').addClass('menu__item_input_valid');
					}
				}.bind(this));

			} else {
				this.$('.menu__item_input')
					.removeClass('menu__item_input_invalid')
					.addClass('menu__item_input_valid');

				this.$('.js-form')[0].reset();
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