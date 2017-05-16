var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
	 pushState: true,
     swipeBackPage:false,

});

$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


myApp.onPageInit('home', function (page) {

    var onSuccess_location = function(position) {
        $('.currentlocation').html(
        	  'Current Latitude: '  + position.coords.latitude  + '<br>' +
              'Currrent Longitude: ' + position.coords.longitude + '<br><br><br><br>'
        );
    };

    function onError_location(error) {
        console.log(
        	  'code: ' + error.code + '<br>' +
              'message: ' + error.message + '<br>'
        );
    }

    navigator.geolocation.getCurrentPosition(onSuccess_location, onError_location);

    // function onSuccess_watchPosition(position) {
    // 	alert('posotion changed');
    //     $('.changedlocation').html(
    //     	'Changed Latitude: '  + position.coords.latitude  + '<br/>'+ 
	   //      'Changed Longitude: ' + position.coords.longitude + '<br/>'
	   //  );
    // }

    // function onError_watchPosition(error) {
    //     console.log(
    //     	'code: '    + error.code    + '<br>' +
    //         'message: ' + error.message + '<br>'
    //      );
    // }
    // var watchID = navigator.geolocation.watchPosition(onSuccess_watchPosition, onError_watchPosition, { timeout: 30000 });

    var onWeatherSuccess = function (position) {

	    Latitude = position.coords.latitude;
	    Longitude = position.coords.longitude;

	    getWeather(Latitude, Longitude);
	}

	// Get weather by using coordinates

	function getWeather(latitude, longitude) {

	    // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
	    var OpenWeatherAppKey = "70f5a077d1ec62b5ba2cd71feccd7702";

	    var queryString =
	      'http://api.openweathermap.org/data/2.5/weather?lat='
	      + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';

	    $.getJSON(queryString, function (results) {

	        if (results.weather.length) {

	            $.getJSON(queryString, function (results) {

	                if (results.weather.length) {

	                	var sunriseDate = new Date(results.sys.sunrise);
	                    var sunsetDate = new Date(results.sys.sunset);

	                	$('.weather').html(
	                		'desc '+results.name+'<br>'+
	                		'temp '+results.main.temp +'<br>'+
	                		'winds '+results.wind.speed +'<br>'+
	                		'sunrise '+sunriseDate.toLocaleTimeString() +'<br>'+
	                		'sunset '+sunsetDate.toLocaleTimeString()

	                	);
	                }

	            });
	        }
	    }).fail(function () {
	        console.log("error getting location");
	    });
	}

	// Error callback

	function onWeatherError(error) {
	    console.log('code: ' + error.code + '\n' +
	        'message: ' + error.message + '\n');
	}

    $('.getweather').click(function(){

    	navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError, { enableHighAccuracy: true });
    })




    var Latitude = undefined;
	var Longitude = undefined;

	// Get geo coordinates


	$('.getmap').click(function(){

			alert('clicked');
			console.log('clicked');
			getMapLocation();
	})

	function getMapLocation() {

	    navigator.geolocation.getCurrentPosition
	    (onMapSuccess, onMapError, { enableHighAccuracy: true });
	}

	// Success callback for get geo coordinates

	var onMapSuccess = function (position) {

	    Latitude = position.coords.latitude;
	    Longitude = position.coords.longitude;

	    getMap(Latitude, Longitude);

	}

	// Get map by using coordinates

	function getMap(latitude, longitude) {

	    var mapOptions = {
	        center: new google.maps.LatLng(0, 0),
	        zoom: 1,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

	    map = new google.maps.Map
	    (document.getElementById("map"), mapOptions);


	    var latLong = new google.maps.LatLng(latitude, longitude);

	    var marker = new google.maps.Marker({
	        position: latLong
	    });

	    marker.setMap(map);
	    map.setZoom(15);
	    map.setCenter(marker.getPosition());
	}

	// Success callback for watching your changing position

	var onMapWatchSuccess = function (position) {

	    var updatedLatitude = position.coords.latitude;
	    var updatedLongitude = position.coords.longitude;

	    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

	        Latitude = updatedLatitude;
	        Longitude = updatedLongitude;

	        getMap(updatedLatitude, updatedLongitude);
	    }
	}

	// Error callback

	function onMapError(error) {
	    console.log('code: ' + error.code + '\n' +
	        'message: ' + error.message + '\n');
	}

	// Watch your changing position

	function watchMapPosition() {

	    return navigator.geolocation.watchPosition
	    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
	}


	$('.getplaces').click(function(){

			alert('clicked');
			console.log('clicked');
			getPlacesLocation();
	})


	var Map;
	var Infowindow;
	var Latitude = undefined;
	var Longitude = undefined;

	// Get geo coordinates

	function getPlacesLocation() {
	    navigator.geolocation.getCurrentPosition
	    (onPlacesSuccess, onPlacesError, { enableHighAccuracy: true });
	}

	// Success callback for get geo coordinates

	var onPlacesSuccess = function (position) {

	    Latitude = position.coords.latitude;
	    Longitude = position.coords.longitude;

	    getPlaces(Latitude, Longitude);

	}

	// Get places by using coordinates

	function getPlaces(latitude, longitude) {

	    var latLong = new google.maps.LatLng(latitude, longitude);

	    var mapOptions = {

	        center: new google.maps.LatLng(latitude, longitude),
	        zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP

	    };

	    Map = new google.maps.Map(document.getElementById("places"), mapOptions);

	    Infowindow = new google.maps.InfoWindow();

	    var service = new google.maps.places.PlacesService(Map);
	    service.nearbySearch({

	        location: latLong,
	        radius: 500,
	        type: ['atm']
	    }, foundStoresCallback);

	}

	// Success callback for watching your changing position

	var onPlacesWatchSuccess = function (position) {

	    var updatedLatitude = position.coords.latitude;
	    var updatedLongitude = position.coords.longitude;

	    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

	        Latitude = updatedLatitude;
	        Longitude = updatedLongitude;

	        getPlaces(updatedLatitude, updatedLongitude);
	    }
	}

	// Success callback for locating stores in the area

	function foundStoresCallback(results, status) {

	    if (status === google.maps.places.PlacesServiceStatus.OK) {

	        for (var i = 0; i < results.length; i++) {

	            createMarker(results[i]);

	        }
	    }
	}

	// Place a pin for each store on the map

	function createMarker(place) {

	    var placeLoc = place.geometry.location;

	    var marker = new google.maps.Marker({
	        map: Map,
	        position: place.geometry.location
	    });

	    google.maps.event.addListener(marker, 'click', function () {

	        Infowindow.setContent(place.name);
	        Infowindow.open(Map, this);

	    });
	}

	// Error callback

	function onPlacesError(error) {
	    console.log('code: ' + error.code + '\n' +
	        'message: ' + error.message + '\n');
	}

	// Watch your changing position

	function watchPlacesPosition() {

	    return navigator.geolocation.watchPosition
	    (onPlacesWatchSuccess, onPlacesError, { enableHighAccuracy: true });
	}




})







