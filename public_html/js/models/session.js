define(function(require) {

	var Backbone = require('backbone'),
		hasFalseVal = require('objectHasFalseValue');



	var SessionModel = Backbone.Model.extend({
		defaults: {
			login: '',
			password: ''
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
			if (hasFalseVal(error)) {
				return error;
			}
		}
	});

	return new SessionModel();
});