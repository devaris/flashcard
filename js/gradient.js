// Written by Reinhard von der Waydbrink
// Published on http://7synth.com 
// Build 4

var agt=navigator.userAgent.toLowerCase();

function radialgradient(arrayvalue){
	if(!window.opera && agt.indexOf("msie")!= -1){ radialgradient_msie(arrayvalue);}
	else if(window.opera){ radialgradient_opera(arrayvalue);}
	else{ radialgradient_css3(arrayvalue);}
}

function lineargradient(arrayvalue){
	if(!window.opera && agt.indexOf("msie")!= -1){ lineargradient_msie(arrayvalue);}
	else if(window.opera){ lineargradient_opera(arrayvalue);}
	else{ lineargradient_css3(arrayvalue);}
}

// ------------- MSIE ----------------------------------------

function radialgradient_msie(arrayvalue){
	var innerColor = arrayvalue[1];
	var outerColor = arrayvalue[2];
	var colorStop = arrayvalue[3];
	var theelement = arrayvalue[0]=='body' ? document.body : document.getElementById(arrayvalue[0]);
	
	if(arrayvalue[4]=='TL'){ var posx = -colorStop; var posy = -colorStop; }
	if(arrayvalue[4]=='TC'){ var posx = theelement.offsetWidth/2-colorStop; var posy = -colorStop;}
	if(arrayvalue[4]=='TR'){ var posx = theelement.offsetWidth-colorStop; var posy = -colorStop;}
	if(arrayvalue[4]=='ML'){ var posx = -colorStop; var posy = theelement.offsetHeight/2-colorStop;}
	if(arrayvalue[4]=='MC'){ var posx = theelement.offsetWidth/2-colorStop; var posy = theelement.offsetHeight/2-colorStop;}
	if(arrayvalue[4]=='MR'){ var posx = theelement.offsetWidth-colorStop; var posy = theelement.offsetHeight/2-colorStop;}
	if(arrayvalue[4]=='BL'){ var posx = -colorStop; var posy = theelement.offsetHeight/2-colorStop/2;}
	if(arrayvalue[4]=='BC'){ var posx = theelement.offsetWidth/2-colorStop; var posy = theelement.offsetHeight-colorStop;}
	if(arrayvalue[4]=='BR'){ var posx = theelement.offsetWidth-colorStop; var posy = theelement.offsetHeight-colorStop;}

	var IEpseudobg = document.createElement('div');
	IEpseudobg.style.width = colorStop*2;
	IEpseudobg.style.height = colorStop*2;
	IEpseudobg.style.position = 'absolute';
	IEpseudobg.style.zIndex = '-1';
	IEpseudobg.style.top = '0px'; 
	IEpseudobg.style.left = '0px';
	IEpseudobg.style.marginLeft =  posx;
	IEpseudobg.style.marginTop =  posy;
	IEpseudobg.style.backgroundColor=innerColor;
	IEpseudobg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100, finishopacity=0, style=2)';

	theelement.appendChild(IEpseudobg);
	theelement.style.backgroundColor=outerColor;
}

function lineargradient_msie(arrayvalue){
	var theelement = arrayvalue[0]=='body' ? document.body : document.getElementById(arrayvalue[0]);
	
	var IEpseudobg = document.createElement('div');
	IEpseudobg.style.position='absolute';
	if(arrayvalue[4]=='T'){ 
		var gradienttype=0; var flip='';
		IEpseudobg.style.width=theelement.offsetWidth;
		IEpseudobg.style.height=arrayvalue[3];
		IEpseudobg.style.top='0px';
		IEpseudobg.style.left='0px';
	}
	if(arrayvalue[4]=='R'){ 
		var gradienttype=1; var flip='FlipH()';
		IEpseudobg.style.width=arrayvalue[3];
		IEpseudobg.style.height=theelement.offsetHeight;
		IEpseudobg.style.top='0px';
		IEpseudobg.style.right='0px';
	}
	if(arrayvalue[4]=='B'){
		var gradienttype=0;  var flip='FlipV()';
		IEpseudobg.style.width=theelement.offsetWidth;
		IEpseudobg.style.height=arrayvalue[3];
		IEpseudobg.style.top=theelement.offsetHeight-arrayvalue[3];
		IEpseudobg.style.left='0px'; 
	}		
	if(arrayvalue[4]=='L'){ 
		var gradienttype=1; var flip='';
		IEpseudobg.style.width=arrayvalue[3];
		IEpseudobg.style.height=theelement.offsetHeight;
		IEpseudobg.style.top='0px';
		IEpseudobg.style.left='0px';
	}

	IEpseudobg.style.zIndex=-1;
	IEpseudobg.style.backgroundColor='#ffffff';
	theelement.appendChild(IEpseudobg);
	IEpseudobg.style.filter='progid:DXImageTransform.Microsoft.Gradient(GradientType='+gradienttype+',startColorstr='+arrayvalue[1]+', endColorstr='+arrayvalue[2]+')'+flip;
	
	theelement.style.backgroundColor=arrayvalue[2];
}

// ------------- OPERA -------------------------------------------

function radialgradient_opera(arrayvalue){
	var theelement = arrayvalue[0]=='body' ? document.body : document.getElementById(arrayvalue[0]);
	var innerColor = arrayvalue[1];
	var outerColor = arrayvalue[2];
	var colorStop = arrayvalue[3]*2;
	if(arrayvalue[0]=='body'){var thewidth = document.body.clientWidth; var theheight = document.body.clientHeight;}else{var thewidth=document.getElementById(arrayvalue[0]).offsetWidth; var theheight=document.getElementById(arrayvalue[0]).offsetHeight;}
	if(arrayvalue[4]=='TL'){ var posx = -colorStop/2; var posy=-colorStop/2;}
	if(arrayvalue[4]=='TC'){ var posx = (thewidth-colorStop)/2 ; var posy=-colorStop/2;}
	if(arrayvalue[4]=='TR'){ var posx = thewidth/2+colorStop/2 ; var posy=-colorStop/2;}
	if(arrayvalue[4]=='ML'){ var posx = -colorStop/2; var posy=(theheight-colorStop)/2;}
	if(arrayvalue[4]=='MC'){ var posx = (thewidth-colorStop)/2; var posy = (theheight-colorStop)/2;}
	if(arrayvalue[4]=='MR'){ var posx = thewidth/2+colorStop/2; var posy = (theheight-colorStop)/2;}
	if(arrayvalue[4]=='BL'){ var posx = -colorStop/2; var posy = theheight/2;}
	if(arrayvalue[4]=='BC'){ var posx = (thewidth-colorStop)/2; var posy = theheight/2;}
	if(arrayvalue[4]=='BR'){ var posx = thewidth/2+colorStop/2; var posy = theheight/2;}

	var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+colorStop+'px" height="'+colorStop+'px"><title>SVG Opera Background Radial Gradient</title><metadata>author: Reinhard v.d.Waydbrink</metadata><defs><radialGradient id="rg" cx="50%" cy="50%" r="100%"><stop stop-color="'+innerColor+'" offset="0%"></stop><stop stop-color="'+outerColor+'" offset="50%"></stop></radialGradient></defs><rect style="fill:url(#rg);" width="'+colorStop+'px" height="'+colorStop+'px"/> </svg> ';
	var encodedData = window.btoa(svg);
	theelement.style.background='url("data:image/svg+xml;base64,'+encodedData+'") no-repeat '+outerColor+' '+posx+'px '+posy+'px';
}

function lineargradient_opera(arrayvalue){
	var theelement = arrayvalue[0]=='body' ? document.body : document.getElementById(arrayvalue[0]);
	var innerColor = arrayvalue[1];
	var outerColor = arrayvalue[2];
	var colorStop = arrayvalue[3]*2;
	if(arrayvalue[0]=='body'){var thewidth = document.body.clientWidth; var theheight = document.body.clientHeight;}else{var thewidth=document.getElementById(arrayvalue[0]).offsetWidth; var theheight=document.getElementById(arrayvalue[0]).offsetHeight;}
	if(arrayvalue[4]=="T"){ var x1='50%';var y1='0%';var x2='0%';var y2='100%';}else{ var x1='0%'; var y1='50%'; var x2='100%'; var y2='0%';}
	var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+thewidth+'px" height="'+theheight+'px"><title>SVG Opera Background Linear Gradient</title><metadata>author: Reinhard v.d.Waydbrink</metadata><defs><linearGradient id="lg" x="'+x1+'" y="'+y1+'" x2="'+x2+'" y2="'+y2+'"><stop stop-color="'+innerColor+'" offset="0%"></stop><stop stop-color="'+outerColor+'" offset="100%"></stop></linearGradient></defs><rect style="fill:url(#lg);" width="'+thewidth+'px" height="'+theheight+'px"/></svg>';
	var encodedData = window.btoa(svg);
	theelement.style.background='url("data:image/svg+xml;base64,'+encodedData+'") no-repeat '+outerColor+' 0px 0px';
}

// ------- FIREFOX, CHROME, SAFARI --------------------------------

function radialgradient_css3(arrayvalue){
	var theelement = arrayvalue[0]=='body' ? document.body : document.getElementById(arrayvalue[0]);
	if(arrayvalue[4]=='TL'){ var position = 'left top';}
	if(arrayvalue[4]=='TC'){ var position = 'center top';}
	if(arrayvalue[4]=='TR'){ var position = 'right top';}
	if(arrayvalue[4]=='ML'){ var position = 'left center';}
	if(arrayvalue[4]=='MC'){ var position = 'center center';}
	if(arrayvalue[4]=='MR'){ var position = 'right center';}
	if(arrayvalue[4]=='BL'){ var position = 'left bottom';}
	if(arrayvalue[4]=='BC'){ var position = 'center bottom';}
	if(arrayvalue[4]=='BR'){ var position = 'right bottom';}
	theelement.style.background='-webkit-gradient(radial, '+position+', 0, '+position+', '+arrayvalue[3]+', from('+arrayvalue[1]+'), to('+arrayvalue[2]+'))';
	theelement.style.background='-moz-radial-gradient('+position+', circle , '+arrayvalue[1]+', '+arrayvalue[2]+' '+arrayvalue[3]+'px)';
	arrayvalue[0]=='body' ? theelement.style.height='100%' : 0;
}

function lineargradient_css3(arrayvalue){
	var theelement = arrayvalue[0]=='body' ? document.body : document.getElementById(arrayvalue[0]);
	if(arrayvalue[4]=='T'){
		var directionmoz = 'top';
		var directionwebkit = 'left top, left bottom';
		var colorStop = (arrayvalue[3]*100)/theelement.offsetHeight;
	}
	if(arrayvalue[4]=='R'){
		var directionmoz = 'right';
		var directionwebkit = 'right top, left top';
		var colorStop = (arrayvalue[3]*100)/theelement.offsetWidth;
	}
	if(arrayvalue[4]=='B'){
		var directionmoz = 'bottom';
		var directionwebkit = 'left bottom, left top';
		var colorStop = (arrayvalue[3]*100)/theelement.offsetHeight;
	}
	if(arrayvalue[4]=='L'){
		var directionmoz = 'left';
		var directionwebkit = 'left top, right top';
		var colorStop = (arrayvalue[3]*100)/theelement.offsetWidth;
	}

	theelement.style.background='-webkit-gradient(linear,'+directionwebkit+', color-stop(0, '+arrayvalue[1]+'), color-stop('+colorStop+'% , '+arrayvalue[2]+'))';
	theelement.style.background='-moz-linear-gradient('+directionmoz+', '+arrayvalue[1]+', '+arrayvalue[2]+' '+colorStop+'%)';
	arrayvalue[0]=='body' ? theelement.style.height='100%' : 0;
}