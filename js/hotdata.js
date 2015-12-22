// 100 hot data by each field.
// for unit building test
// var MODULE = {}
var MODULE = (function(module){
	module.hotdata = {
		init: function(){
			// note that hot100 object is stored directly.
			// garbage collector?
			// basic structure for the daumDraw();
			module.hot100 = {};
			// test materials
			module.hot100.data = {};
			module.hot100.status = {};
			module.hot100.data.places = [];
			module.hot100.pagination = {};

			for (var i = 0; i < 100; i++) {
				module.hot100.status = "OK";
				module.hot100.data.places[i] = module.hotdata.fetch100fortest();
				module.hot100.pagination = "0";
			}
		},
		fetch100fortest: function(){
			var that = this;

			that.hot100 = {};
			var lat = Math.random()+36;
			var lng = Math.random()+36;
			var time = Math.round(48*Math.random())/2;

			var obj = {Title:"test", Time: time, Lat:lat, Lng:lng};

			return obj;
		}
	}
	return module;
}(MODULE));