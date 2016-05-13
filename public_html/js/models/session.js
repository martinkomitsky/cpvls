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
			console.log('formData', formData);
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
		// sync: function (method, model, options) {
		// 	console.info('method', method, model, options);
		// 	switch (method) {
		// 		case 'create':
		// 			options.url = this.url;
		// 			// this.set(data);
		// 			return Backbone.sync('create', this, options);
		// 		case 'read':
		// 			options.url = this.url;
		// 			return Backbone.sync('read', this, options);
		// 		case 'update':
		// 		// handle update ...
		// 		case 'delete':
		// 			options.url = this.url;
		// 			return Backbone.sync('delete', this, options);
		// 	}
		// }
	});

	return new SessionModel();
});