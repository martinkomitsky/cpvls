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
			console.log(formData);
			var error = {};
			if (!formData.login) {
				error.login = false;
			}
			if (!formData.email) {
				error.email = false;
			}
			if (!formData.password) {
				error.password = false;
			}
			if (error.login === false || error.password === false) {
				return error;
			}
		}
	});

	return new UserModel();
});