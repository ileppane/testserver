(function() {

  var width = 320; 
  var height = 320*3/4;

  var streaming = false;

  var video = null; // these will be set by the startup() function
  var canvas = null;
  var photo = null;
  var startbutton = null;
  var testimuuttuja = null;
  
  function startup() { // this is run when the page has stopped loading
    testimuuttuja = 123;
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia 
			  || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    navigator.getMedia(
      {video: true, audio: false},
      function(stream) {
        if (navigator.mozGetUserMedia) { video.mozSrcObject = stream; 
	} else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play(); // this is HTMLMediaElement.play(), i.e. the video is started
      },
      function(err) { console.log("An error occured! " + err); }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){    // take picture on click
      takepicture();
      ev.preventDefault();
    }, false);
  }

  function takepicture() {
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');       // VOIKO TÄMÄN POSTATA?
    photo.setAttribute('src', data);
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
  document.write(testimuuttuja);
})();