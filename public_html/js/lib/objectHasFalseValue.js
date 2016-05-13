define(function(require) {

	return function (obj, excludeKey) {
		var res;
		$.each(obj, function (key, val) {
			if (val === false) {
				if (key !== excludeKey) {
					res = true;
				}
			}
		});
		if (res) {
			return true;
		} else {
			return false;
		}
	};

});


