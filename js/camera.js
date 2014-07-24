
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
	var img, i, div;
	
	for( i = 0; i < files.length; i++ ) {
		div = document.createElement('div');
		div.style.border = '1px solid #ccc';
		div.style.minWidth = '50px';
		div.style.minHeight = '50px';
		img = document.createElement('img');
		img.src = files[i].name;
		div.appendChild( img );
		document.appendChild( div );
	}
}

function captureError( event ) {
	alert( "It didn't work" );
}