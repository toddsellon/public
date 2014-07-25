
// Wait for PhoneGap to load
if( window.cordova )
	document.addEventListener('deviceready', onDeviceReady);
else
	window.addEventListener('load', onDeviceReady);

// PhoneGap is ready
function onDeviceReady() {
	
	document.querySelector('button').addEventListener( 'click', function() {
		navigator.device.capture.captureAudio( captureSuccess, captureError );
	} );
}

function captureSuccess( files ) {
	var audio, i;
	
	for( i = 0; i < files.length; i++ ) {
		audio = document.createElement('audio');
		audio.src = files[i].fullPath;
		audio.controls = true;
		document.body.appendChild( audio );
	}
}

function captureError( event ) {
	alert( "It didn't work" );
}