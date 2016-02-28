var video;
var canvas;
var copiar;
var repeticion;
var imagen1 = null;
var imagen2 = null;
var context;

var width = 320;
var height = 0;
var streaming = false;
var resembleControl;

function capturar_frame() {
    
	context.drawImage(video, 0, 0, width, height);
	imagen1=imagen2;
	imagen2=canvas.toDataURL('image/png');
	if (imagen1!=null) {
		resembleControl = resemble(imagen1).compareTo(imagen2).onComplete(al_completar);
	}

}

function al_completar(data){
	if(data.misMatchPercentage != 0){
			
		if ( Math.ceil(data.misMatchPercentage) <= 2 ) {
			resultado.innerHTML = "ESTÁTICO";
		}else{
			resultado.innerHTML = "MOVIMIENTO";
		}
	}
}

function inicio () {
	video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    copiar = document.getElementById('copiar');

window.URL = window.URL || window.webkitURL;
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

					navigator.getUserMedia({audio: false, video: true},function(video)
					{
						document.getElementById("video").src = window.URL.createObjectURL(video);
					},function(error)
					{
						alert("Error" + error);
						console.log("Error" + error);
					});
					
    /*navigator.mozGetUserMedia(
		{
			video: true,
			audio: false
		},
		function(stream) {
			video.mozSrcObject = stream;
		},
		function(err) {
			console.log("Error! " + err);
		}
	);*/

	copiar.addEventListener('click', function(ev){
		repeticion = setInterval(capturar_frame, 100);
		ev.preventDefault();
    }, false);

    estado.addEventListener('click', function(ev){
		video.className += " no_display";
		ev.preventDefault();
    }, false);

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
}
