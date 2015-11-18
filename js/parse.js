var MODULE = (function(module){
	'use strict';

	module.parse = {
		init: function(){
			var that = this;
		},

		daumSearch: function(){
			var ps = new daum.maps.services.Places();  
			var keyword = $('#quickSearch')[0].value;
			if (!keyword.replace(/^\s+|\s+$/g, '')) {
				alert('키워드를 입력해주세요!');
				return false;
			}
			ps.keywordSearch(keyword,placesSearchCB);

			function placesSearchCB(status, data, pagination) {
				if (status === daum.maps.services.Status.OK) {

			        // 정상적으로 검색이 완료됐으면
			        // 검색 목록과 마커를 표출합니다
			        // displayPlaces(data.places);

			        // // 페이지 번호를 표출합니다
			        // displayPagination(pagination);
			        console.log(data.places[0]);

			    } else if (status === daum.maps.services.Status.ZERO_RESULT) {

			    	alert('검색 결과가 존재하지 않습니다.');
			    	return;

			    } else if (status === daum.maps.services.Status.ERROR) {

			    	alert('검색 결과 중 오류가 발생했습니다.');
			    	return;

			    }
			}
		},

		daumDraw: function(){

		}
	}

	return module;
}(MODULE));