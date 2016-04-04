define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/register'),
		user = require('models/user'),
		FileAPI = require('FileAPI');

	var View = BaseView.extend({
		template: tmpl,
		model: user,
		className: 'content__game-main content__game-main_visible js-register',
		events: {
			'submit .game-menu__form': 'submit',
			'click .js-camera': 'showCamera',
			'mouseover .js-delete-avatar': 'hoverOnPreviewImg',
			'mouseout .js-delete-avatar': 'hoverOnPreviewImg',
			'click .js-shotter': 'capture',
			'click .js-delete-avatar': 'deleteAvatar',
			'click .js-cancel': 'cancel'
		},
		hoverOnPreviewImg: function (event) {
			console.log()
			if (event.originalEvent.type === 'mouseover') {
				this.$('.nav-avatar__delete').addClass('nav-avatar__delete_visible');
				this.$('.nav-avatar__preview').addClass('nav-avatar__preview_faded');
			} else if (event.originalEvent.type === 'mouseout') {
				this.$('.nav-avatar__delete').removeClass('nav-avatar__delete_visible');
				this.$('.nav-avatar__preview').removeClass('nav-avatar__preview_faded');
			} else {
				console.log('errorets');
			}
		},
		submit: function (event) {
			event.preventDefault();
			var data = this.$('.game-menu__form').serializeObject()
			console.info("data", data);

			// var user = new User();
			this.model.save(data, {
				success: function () {
					alert('success');
					user.set({isRegistered: true});
				},
				error: function () {
					alert('error');
				}
			});

			if (user.validationError) {
				console.log(user.validationError)
				this.$('.game-menu__nav-item_input').removeClass('game-menu__nav-item_input_valid').addClass('game-menu__nav-item_input_invalid');
			} else {
				this.$('.game-menu__nav-item_input').removeClass('game-menu__nav-item_input_invalid').addClass('game-menu__nav-item_input_valid');
				this.$('.game-menu__form')[0].reset();
			}
		},
		showCamera: function() {
			var $captureButton = this.$('.js-shotter'),
				$cameraButton = this.$('.js-camera'),
				$cancelButton = this.$('.js-cancel');

			$cameraButton.hide();
			$captureButton.show();
			$cancelButton.show();

			this._avatar = null;

			if (!this.camera) {
				this.initCamera();
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
				this.$('.nav-avatar__delete').removeClass('nav-avatar__delete_invisible');

			} else {
				$preview.find('video').hide();
				$cameraButton.show();
			}

			$captureButton.hide();
			$cancelButton.hide();
		},
		deleteAvatar: function () {
			var $preview = this.$('.js-preview');
			this.$('.nav-avatar__delete').addClass('nav-avatar__delete_invisible');
			this.camera.start();
			$preview.find('canvas').remove();
			$preview.find('video').show();
			this.showCamera();
		},
		cancel: function (event) {
			event.preventDefault();
			this.$('.js-preview').find('video').hide();
			this.$('.js-camera').show();
			this.$('.js-cancel').hide();
			this.$('.js-shotter').hide();
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