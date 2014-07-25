
// Wait for PhoneGap to load
if( window.cordova )
	document.addEventListener('deviceready', onDeviceReady);
else
	window.addEventListener('load', onDeviceReady);

// PhoneGap is ready
function onDeviceReady() {
	
	document.querySelector('button').addEventListener( 'click', function(e) {
		e.preventDefault();
		navigator.device.capture.captureImage( captureSuccess, captureError );
	} );
}

function captureSuccess( files ) {
	var img, i, file;
	
	for( i = 0; i < files.length; i++ ) {
		file = files[i];
		img = document.createElement('img');
		img.src = file.fullPath;
		document.body.appendChild( img );
	}
}

function captureError( event ) {
	alert( "It didn't work" );
}