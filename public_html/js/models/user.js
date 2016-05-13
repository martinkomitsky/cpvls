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
			console.log('formData', formData);
			var error = {};

			$.each(formData, function(key, val) {
				if (!val) {
					error[key] = false;
				} else {
					error[key] = true;
				}
			});

			if (hasFalseVal(error)) {
				return error;
			}
		},
		sync: function (method, model, options) {
			console.info('method', method, model, this)
			switch (method) {
				case 'create':
					options.url = '/api/orders/cancelOrder';
					return Backbone.sync('create', model, options);
				case 'read':
					options.url = '/api/user/' + model.get('id');
					return Backbone.sync(method, this, options);
				case 'update':
				// handle update ...
				case 'delete':
				// handle create ...
			}
		}
	});

	return new UserModel();
});