
// this is irritating
// same as $('#map')[0] = document.getElemenetById('map');
// for those who are not famailr with jquery.

var MODULE = (function(module){
	module.map = {
		init:function(){
			var that = this; // module.map = that;
			that.map = that.mapCreate();
			that.zoomControl(that.map);
			that.filterResult();
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
		zoomControl: function(map){

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
		// fetchResult: function(){

		// }
	}
	return module;
}(MODULE));
