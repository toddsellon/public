
// Wait for PhoneGap to load
if( window.cordova )
	document.addEventListener('deviceready', onDeviceReady);
else
	window.addEventListener('load', onDeviceReady);

// PhoneGap is ready
function onDeviceReady() {
	
	document.querySelector('button').addEventListener( 'click', function(e) {
		e.preventDefault();
		navigator.device.capture.captureAudio( captureSuccess, captureError );
	} );
}

function captureSuccess( files ) {
	var audio, i, file;
	
	for( i = 0; i < files.length; i++ ) {
		file = files[i];
		
		document.body.innerHTML += '<p>' + file.fullPath + '</p>';
		
		/*
		// Android: amr, iOS: wav
		audio = document.createElement('audio');
		audio.src = file.fullPath;
		audio.controls = true;
		document.body.appendChild( audio );
		*/
	}
}

function captureError( event ) {
	alert( "It didn't work" );
}