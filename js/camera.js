
// Wait for PhoneGap to load
if( window.cordova )
	document.addEventListener('deviceready', onDeviceReady);
else
	window.addEventListener('load', onDeviceReady);

// PhoneGap is ready
function onDeviceReady() {
	
	document.querySelector('button').addEventListener( 'click', function() {
		navigator.device.capture.captureImage( captureSuccess, captureError );
	} );
}

function captureSuccess( files ) {
	var img, i;
	
	for( i = 0; i < files.length; i++ ) {
		img = document.createElement('img');
		img.src = files[i].name;
		document.appendChild( img );
	}
}

function captureError( event ) {
	alert( "It didn't work" );
}