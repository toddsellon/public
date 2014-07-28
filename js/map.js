// map will be a reference to the Google Map
var map,

	// options necessary for Google Maps
	options = {
			center: { },
			zoom: 8
	},
	
	// Original acceleration
	origin = null,
	accelerationSensitivity = 5;

// Wait for PhoneGap to load
if( window.cordova )
	document.addEventListener('deviceready', onDeviceReady);
else
	window.addEventListener('load', onDeviceReady);

// PhoneGap is ready
function onDeviceReady() {
	
	// Attempt to locate the user with Geolocation
	navigator.geolocation.getCurrentPosition( handleUserPosition, geolocationError );
}

function handleUserPosition( position ) {

	// Update the Map options with the position returned by Geolocation
	options.center.lat = position.coords.latitude;
	options.center.lng = position.coords.longitude;
	
	// Instantiate the Google Map over the element with id 'map'
	map = new google.maps.Map( document.getElementById("map"), options);
	
	// Start watching the accelerometer for changes
	navigator.accelerometer.watchAcceleration( handleAcceleration,
												accelerationError,
												{ frequency: 3000 } );
}

// Move the map appropriately for the acceleration
function handleAcceleration( acceleration ) {
	
	// Save the original coordinates if they are not already saved
	origin = origin || acceleration;
	
	// Determine if tilted horizontally
	if( acceleration.x > origin.x + accelerationSensitivity ) {
		options.center.lng--;
	} else if( acceleration.x < origin.x - accelerationSensitivity ) {
		options.center.lng++;
	}
	
	// Determine if tilted vertically
	if( acceleration.y > origin.y + accelerationSensitivity ) {
		options.center.lat--;
	} else if( acceleration.y < origin.y - accelerationSensitivity ) {
		options.center.lat++;
	}
	
	// Update the Google Map
	map.setCenter( options.center );
}

// Failed to get the user's position
function geolocationError( error ) {
	// console.log is one of the few ways to debug mobile devices (seriously)
	console.log( 'Geolocation failed: ' + JSON.stringify( error ) );
}

// Failed to get device acceleration
function accelerationError( error ) {
	console.log( 'Accelerometer failed: ' + JSON.stringify( error ) );
}