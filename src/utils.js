var Utils = Utils || {
	
	extend : function(params, defaults) {
		if ( typeof params !== "object" ) { return defaults };

		for ( var index in defaults ) {
			if ( typeof params[index] === "undefined" ) { params[index] = defaults[index]; };
		}
		
		return params;
	}
	
};