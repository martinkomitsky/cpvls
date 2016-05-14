define(function(require) {

	var Backbone = require('backbone'),
		hasFalseVal = require('objectHasFalseValue');

	var UserModel = Backbone.Model.extend({
		defaults: {
			login: '',
			password: '',
			email: ''
		},
		url: '/api/user/',
		validate: function (formData) {
			var reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
			console.log('formData', formData);
			var error = {};

			$.each(formData, function(key, val) {
				if (!val) {
					error[key] = false;
				} else {
					switch (key) {
						case 'email':
							error[key] = reg.test(val);
							break;

						case 'login':
							error[key] = val.length > 5 && val.length < 20;
							break;

						case 'password':
							error[key] = val.length > 5 && val.length < 20;
							break;

						// default:
						// 	error[key] = false;
					}
				}
			});

			if (hasFalseVal(error)) {
				return error;
			}
		},
		sync: function (method, model, options) {
			console.info('method', method, model, this);
			switch (method) {
				case 'create':
					options.url = this.url;
					Backbone.sync('create', this, options);
					break;
				case 'read':
					options.url = this.url + model.get('id');
					Backbone.sync('read', this, options);
					break;
				case 'update':
				console.log('[user: handle update]');// later
				case 'delete':
				console.log('[user: handle create]');// later
			}
		}
	});

	return new UserModel();
});