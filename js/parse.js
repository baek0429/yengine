/**
daumSearch called
-> global variable in module.parse.serachResultSet 
**/
// var MODULE = {}
var MODULE = (function(module){
	'use strict';

	module.parse = {
		init: function(){
			var that = this; // that = module.parse;
			// initial searchResultSetData value is null.
			that.searchResultSet = {},
			// initial markers should be always set null because it is provided in daumDraw()
			that.markers = [];
			// info window
			that.infowindow = new daum.maps.InfoWindow({zIndex:1});

			// if there is any kind of initial value for searchResultSet draw it.
			if(jQuery.isEmptyObject(that.searchResultSet) === false) {
				that.daumDraw();
			}
		},

		// customized function of daum map api
		daumSearch: function(){
			var that = this;
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
			        var searchResultSet = {status,data,pagination};
			        that.searchResultSet = searchResultSet;
			        that.daumDraw();
			        return;

			    } else if (status === daum.maps.services.Status.ZERO_RESULT) {
			    	alert('검색 결과가 존재하지 않습니다.');
			    	return;

			    } else if (status === daum.maps.services.Status.ERROR) {
			    	alert('검색 결과 중 오류가 발생했습니다.');
			    	return;

			    }
			}
		},

		// customzied function of daum map api
		daumDraw: function(){
			var that = this;
			(function (places){
				var bounds = new daum.maps.LatLngBounds();

				removeMarker();
				for (var i =0; i< places.length; i++){
					var placePosition = new daum.maps.LatLng(places[i].latitude, places[i].longitude),
					marker = addMarker(placePosition, i), 
					itemEl = getListItem(i, places[i], marker);

					bounds.extend(placePosition);

					// mouseout 했을 때는 인포윈도우를 닫습니다
					(function(marker, title) {
						daum.maps.event.addListener(marker, 'mouseover', function() {
							displayInfowindow(marker, title);
						});

						daum.maps.event.addListener(marker, 'mouseout', function() {
							that.infowindow.close();
						});

						itemEl.onmouseover =  function () {
							displayInfowindow(marker, title);
						};

						itemEl.onmouseout =  function () {
							that.infowindow.close();
						};
					})(marker, places[i].title);
				}
				module.g.mapControl.map.setBounds(bounds);

				function removeMarker() {
					for ( var i = 0; i < that.markers.length; i++ ) {
						that.markers[i].setMap(null);
					}   
					that.markers = [];
				}

				function addMarker(position, idx, title) {

					// TODO: new sprite with time info png. instead of imageSrc.

				    var imageSrc = 'http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
				        imageSize = new daum.maps.Size(36, 37),  // 마커 이미지의 크기
				        imgOptions =  {
				            spriteSize : new daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
				            spriteOrigin : new daum.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
				            offset: new daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
				        },
				        markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
				        marker = new daum.maps.Marker({
				            position: position, // 마커의 위치
				            image: markerImage 
				        });

				    marker.setMap(module.map.map); // 지도 위에 마커를 표출합니다
				    that.markers.push(marker);  // 배열에 생성된 마커를 추가합니다

				    return marker;
				}

				function getListItem(index, places) {
					var el = document.createElement('li'),
					itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
					'<div class="info">' +
					'   <h5>' + places.title + '</h5>';

					if (places.newAddress) {
						itemStr += '    <span>' + places.newAddress + '</span>' +
						'   <span class="jibun gray">' +  places.address  + '</span>';
					} else {
						itemStr += '    <span>' +  places.address  + '</span>'; 
					}

					itemStr += '  <span class="tel">' + places.phone  + '</span>' +
					'</div>';           

					el.innerHTML = itemStr;
					el.className = 'item';

					return el;
				}

				function displayInfowindow(marker, title) {
					var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

					that.infowindow.setContent(content);
					that.infowindow.open(module.g.mapControl.map, marker);
				}

			})(that.searchResultSet.data.places);
		}
	}
	return module;
}(MODULE));