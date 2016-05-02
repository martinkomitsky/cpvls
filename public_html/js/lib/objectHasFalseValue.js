define(function(require) {

	return function (obj) {
		var res;
		$.each(obj, function (key, val) {
			if (val === false) {
				res = true;
			}
		});
		if (res) {
			return true;
		} else {
			return false;
		}
	};

});


