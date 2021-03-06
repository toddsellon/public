// Array in which all created images are stored
var images = [];

// If images were previously created..
if( localStorage.images ) {
	// Try to parse the JSON data from localStorage
	try {
		images = JSON.parse( localStorage.images );
	} catch( e ) {
		// Exception for incorrectly formatted data
		images = [];
		console.log( 'Failed to load images ' + localStorage.images );
	}
}

// Wait for PhoneGap to load
if( window.cordova )
	document.addEventListener('deviceready', onDeviceReady);
else
	window.addEventListener('load', onDeviceReady);

// PhoneGap is ready
function onDeviceReady() {
	
	var i;
	for( i = 0; i < images.length; i++ ) {
		createImage( images[i] );
	}
	
	// Listen for 'Look' button being pressed
	document.querySelector('button').addEventListener( 'click', function(e) {
		e.preventDefault();
		
		// Attempt to capture an image and call 'captureSuccess' if successful
		navigator.device.capture.captureImage( captureSuccess, captureError );
	} );
	
	// Show any previously stored images
	showImages( );
}

function captureSuccess( files ) {
	var i, file;
	
	for( i = 0; i < files.length; i++ ) {
		file = files[i];
		
		createImage( file.fullPath );
		
		// Add the new file to the array of files
		images.push( file.fullPath );
	}
	
	// Update localStorage to include the new image(s)
		localStorage.images = JSON.stringify( images );
}

function captureError( event ) {
	alert( "It didn't work" );
}

function createImage( src ) {
	var img = document.createElement('img');
	img.src = src;
	document.body.appendChild( img );
}