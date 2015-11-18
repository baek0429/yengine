/* MODULE is executed by itself and takes "module" which
is needed to run the application. */
var MODULE = (function(){
	'use strict'

	// that = empty module
	var module = {}, 
	that = module;

	// that.group for other .js files.
	that.group = function(){
		that.g = {
			viewControl: that.view,
			mapControl: that.map,
			dataControl: that.parse
		};
	};

	// that.initialize!
	that.initialize = function(){

		that.group();

		that.g.viewControl.init();
		that.g.mapControl.init();
		that.g.dataControl.init();

		// only for the web for now.
		if(typeof window.orientation !== 'undefined') {
			$("body").hide();
			return;
		}

		// the main web page.
		that.host = window.location.protocol + '//' +  window.location.host;

		// brand click to main page.
		$('#brand').click(function(){
			location.href = that.host;
		});
	}
	return module;
}());

// main entry point.
$(document).ready(function(){
	'use strict';
	MODULE.initialize();
});