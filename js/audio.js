function canPlayAudio() {
	if (document.createElement('audio').canPlayType) {
		if (!document.createElement('audio').canPlayType('audio/mpeg') &&
			!document.createElement('audio').canPlayType('audio/ogg')) {

		} else {
			// HTML5 audio + mp3 support
			document.getElementById('player').style.display = 'block';
		}
	}
}

// **** Audio Element ****
function removeAudioElement() {

	var audio = document.getElementsByTagName("audio")[0];
	
	/*
	alert("REMOVE audio.currentTime: "+audio.currentTime)	
	alert("REMOVE audio.duration: "+audio.duration)
	*/
	
	if(audio.currentTime){
		audio.pause();
		audio.currentTime = 0;
	}
	
	document.body.removeChild(audio);
	
	//alert("REMOVE audio.duration: "+audio.duration)	
}

function addAudioElement() {
	
	/*
	//alert("addAudioElement")
	
	//Delete Previous	
	try {
		removeAudioElement();
		//alert("removeAudioElement")
	}
	catch(e) {
		 //alert("Error: "+e)
	}
	
	// Set Audio Files
	if(_fcPlayer.curentCardOnDisplay.currentFace==1 && !_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][_fcPlayer.curentCardOnDisplay.currentFace]){
		var audioMp3 = _fcPlayer.mediaLocation.audio+(_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][0])+".mp3"
		var audioOgg = _fcPlayer.mediaLocation.audio+(_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][0])+".ogg"

	} else {
		var audioMp3 = _fcPlayer.mediaLocation.audio+(_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][_fcPlayer.curentCardOnDisplay.currentFace])+".mp3"
		var audioOgg = _fcPlayer.mediaLocation.audio+(_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][_fcPlayer.curentCardOnDisplay.currentFace])+".ogg"
	}


	// Create Audio Element
	var audio = document.createElement("audio");
	document.body.appendChild(audio);

	// Loading Audio
	audio.load();
	audio.preload = "auto"
	
	// Check compatibility
	if (audio.canPlayType('audio/mpeg')) {
		audio.src = audioMp3;	
	} else {
		audio.src = audioOgg;	
	}
	
	document.getElementById("audiop").disabled = true;
	
	// Event driven to be compatible with WebKit
	audio.addEventListener('loadedmetadata', function(e) { 
													   
  		//alert('Got loadedmetadata!'); 
		document.getElementById("audiop").disabled = false;
		//document.getElementById("audiop").style.color="#42393d";
		
		
  	}, true);
	
	*/
	
	/* Works only in IE+Firefox
	audio.onloadeddata = function(){
		document.getElementById("audiop").disabled = false;
	} 
	*/
	

	
	/* EVENTS
	audio.abort = alert("audio.abort")	
	audio.canplay = alert("audio.canplay")
	audio.canplaythrough = alert("audio.canplaythrough")
	audio.emptied = alert("audio.emptied")
	audio.ended = alert("audio.ended")
	audio.error = alert("audio.error")
	audio.loadstart = alert("audio.loadstart")	
	audio.stalled = alert("audio.stalled")	
	audio.suspend = alert("audio.suspend")
	
	
	if(audio.duration > 0 && !audio.paused) {
		alert("Its playing")	
	} else {	
		alert("Not playing")
	}
	
	if(audio.buffered.length){
		alert("audio.buffered.length: "+audio.buffered.length)
		//document.getElementById("audiop").disabled = false;
	} else {
		//document.getElementById("audiop").disabled = true;
	}
	*/
}

function audioPlay() {	
	
	//addAudioElement();
	
	
	var audio = document.getElementsByTagName("audio")[0];
	
	/*
	alert("audioPlay > audio.duration: "+audio.duration)	
	alert("audioPlay > audio.buffered.length: "+audio.buffered.length)
	*/
	/*
	if(audio.duration != NaN){
		audio.currentTime = 0;
		audio.play();	
		document.getElementById("audiop").disabled = false;
	} else {
		document.getElementById("audiop").disabled = true;
		document.getElementById("audiop").value = "OK"
	}*/
		audio.currentTime = 0;
		audio.play();	
		document.getElementById("audiop").disabled = false;
	
	
}

function audioPlayDirectly() {

	// Create Audio Element
	var audio = document.createElement("audio");

	// Set Audio Files
	if(_fcPlayer.curentCardOnDisplay.currentFace==1 && !_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][_fcPlayer.curentCardOnDisplay.currentFace]){
		var audioMp3 = _fcPlayer.mediaLocation.audio+(_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][0])+".mp3"
		var audioOgg = _fcPlayer.mediaLocation.audio+(_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][0])+".ogg"

	} else {
		var audioMp3 = _fcPlayer.mediaLocation.audio+(_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][_fcPlayer.curentCardOnDisplay.currentFace])+".mp3"
		var audioOgg = _fcPlayer.mediaLocation.audio+(_fcPlayer.allCards["Unit"+_fcPlayer.curentCardOnDisplay.Unit]["Lesson"+_fcPlayer.curentCardOnDisplay.Lesson][_fcPlayer.curentCardOnDisplay.Card][1][_fcPlayer.curentCardOnDisplay.currentFace])+".ogg"
	}
	
	// Check compatibility
	if (audio.canPlayType('audio/mpeg')) {
		audio.src = audioMp3;	
	} else {
		audio.src = audioOgg;	
	}
	
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
		audio.currentTime = 0;
	}
}


//$(document).ready(function() {
	//var audioButton = document.getElementById('audiop');

/*
	audioButton.addEventListener("click", audioPlay);
	addAudioElement();	
*/

//	audioButton.addEventListener("click", audioPlayDirectly);
	
//});