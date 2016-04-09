define(function(require) {

	var Backbone = require('backbone');

	var UserModel = Backbone.Model.extend({
		defaults: {
			name: 'Unknown player',
			login: '',
			password: ''
		},
		// url: 'http://localhost/backbone/api/save.php',
		url: 'http://localhost:8080/api/user/',
		validate: function (formData) {
			console.log('formData', formData);
			var error = {};

			$.each(formData, function (key, val) {
				console.log(key, val, this)
				if (!val) {
					error[key] = false;
				}

			});

			if (_.size(error)) {
				return error;
			}
		}
	});

	return new UserModel();
});