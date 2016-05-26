define(function(require) {

	var Backbone = require('backbone'),
		hasFalseVal = require('objectHasFalseValue');

	var SessionModel = Backbone.Model.extend({
		defaults: {
			login: '',
			password: '',
			isSignedIn: false
		},
		url: '/api/session/',
		validate: function (formData) {
			console.info('[formData]', formData);
			var error = {};
			$.each(formData, function(key, val) {
				if (!val) {
					error[key] = false;
				} else {
					error[key] = true;
				}
			});
			if (hasFalseVal(error, 'isSignedIn')) {
				return error;
			}
		},
		sync: function (method, model, options) {
			options.url = this.url;
			switch (method) {
				case 'create':
					Backbone.sync('create', this, options);
					break;
				case 'read':
					Backbone.sync('read', this, options);
					break;
				case 'update':
					console.info('[unsupported method, ignoring]');
					break;
				case 'delete':
					Backbone.sync('delete', this, options);
					break;
			}
		}
	});

	return new SessionModel();
});