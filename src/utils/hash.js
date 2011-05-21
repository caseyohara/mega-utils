// require Utils

Utils.Hash = function(config){

	var self = this;
	var defaults = { slash: true	};
	var config = Utils.extend(config, defaults);

	
	self.initialize = function(){
		if ( config.slash ) { add_slash_to_path() };
		return self;
	};


	self.get = function(){
		return location.hash;
	};


	self.set = function(hash){
		if ( config.slash ) { add_slash_to_path() };
		hash = config.slash ? add_slash_to_hash(hash) : hash;
		location.hash = hash.replace(/-/g, "/");
		return self.get();
	};


	self.segments = function(){
		var hash = self.get();
		var segments = remove_trailing_slash(hash).split("/");
		segments.shift();
		return segments;
	};
	

	self.segment = function(index){
		var segments = self.segments();
		var segment = segments[index - 1];
		if ( typeof segment === 'undefined' ) {
			console.log("Error: Hash segment at index " + index + " does not exist");
			return false;
		}
		return segment;
	};


	self.element = function(){
		var segments = self.segments();
		var element = "";
		
		for ( var index in segments ) {
			var segment = segments[index];
			var even = (index % 2);
			var odd = ! even;
			
			if ( index == 0 ) {
				element += "#" + segment;
			}
			
			else {

				if ( odd ) {
					element += " > ." + segment;
				}

				if ( even ) {
					if ( ! isNaN(segment) ) {
						var parent = segments[index - 1];
						
						if ( parent.charAt(parent.length - 1) === "s") {
							parent = parent.substring(0, parent.length - 1);
						}
						
						element += " > ." + parent + ":eq(" + ( segment - 1 ) + ")";						
					}
					else {
						element += " > ." + segment;	
					}
				}
				
			}
		};
		
		return element;
	};


	self.onChange = function(func){
		
		if( ! jQuery && jQuery().hashchange ) {
			$(window).hashchange( func );
		}
		else {
			window.onhashchange = func;
		}

	};


	
	// private
	
	function add_slash_to_path() {
		if( location.pathname.charAt(location.pathname.length-1) !== "/"){
			location.pathname += "/";
		}
	}
	
	function add_slash_to_hash(hash) {
		if( hash.charAt(0) !== "/"){
			hash = "/" + hash;
		}
		return hash;
	}
	
	function remove_trailing_slash(hash) {
		if( hash.charAt(hash.length - 1) === "/"){
			hash = hash.substring(0, hash.length - 1);
		}
		return hash;
	};



	return self.initialize();
};