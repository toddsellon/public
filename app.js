// map will be a reference to the Google Map
var map,

// options necessary for Google Maps
	options = {
			center: {
				lat: 0,
				lng: 0
			},
			zoom: 8
	};

// Wait for PhoneGap to load
document.addEventListener('deviceready', onDeviceReady);
window.addEventListener('load', onDeviceReady);

// PhoneGap is ready
function onDeviceReady() {
	
	// Attempt to locate the user with Geolocation
	navigator.geolocation.getCurrentPosition( handleUserPosition, geolocationError );
}

function handleUserPosition( position ) {

	// Options needed for accelerometer
	var acceleratorOptions = {
		frequency: 3000
	};

	// Update the Map options with the position returned by Geolocation
	options.center.lat = position.coords.latitude;
	options.center.lng = position.coords.longitude;
	
	// Instantiate the Google Map over the element with id 'map'
	map = new google.maps.Map( document.getElementById("map"), options);
	
	// If the accelerometer is present..
	if( navigator.accelerometer ) {
		// ..start watching the accelerometer for changes
		navigator.accelerometer.watchAcceleration( handleAcceleration, accelerationError, acceleratorOptions );
	}
}

// Move the map appropriately for the acceleration
function handleAcceleration( acceleration ) {
	// Update the center based on acceleration
	options.center.lng += acceleration.x;
	options.center.lat += acceleration.y;
	
	// Update the Google Map
	map.setCenter( options.center );
}

// Failed to get the user's position
function geolocationError( error ) {
	// console.log is one of the few ways to debug mobile devices (seriously)
	console.log( 'Geolocation failed: ' + error.message );
}

// Failed to get device acceleration
function accelerationError( error ) {
	console.log( 'Accelerometer failed: ' + error.message );
}