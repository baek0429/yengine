
// Note that
// $('#map')[0] = document.getElemenetById('map');
// for those who are not famailr with jquery.

// Note that 
// for unit-build default MODULE is needed
// var MODULE = {}
var MODULE = (function(module){
	module.map = {
		init:function(){
			var that = this; // that = module.map;
			that.map = that.mapCreate();
			that.addZoomControl(that.map); 
			that.filterResult(); // ready filtering result function
			// that.searchControl();
		},

		// map initialize with the default location
		mapCreate: function(){
			// get container by id 'map'
			var $container = $('#map');

			// options
			var options = {
				center: new daum.maps.LatLng(37.4971206,127.028254),
				level: 9
			};

			// map
			var map = new daum.maps.Map($container[0], options);
			return map;
		},

		// add zoom control to map
		// takes Map object and returns nothing
		addZoomControl: function(map){

			// zoomcontrol
			var zoomControl = new daum.maps.ZoomControl();
			map.addControl(zoomControl, daum.maps.ControlPosition.BOTTOMLEFT);
		},

		filterResult: function(){
			options = {
				filterExpression: 'filterTableFindAll',
				placeholder: 'Quicksearch for the result',
				label: '',
				inputSelector: '#quickSearch'
			};
			$(document).ready(function() {
        		// apply filterTable to all tables on this page
        		$('table').filterTable(options);
        	});
		}
	}
	return module;
}(MODULE));
