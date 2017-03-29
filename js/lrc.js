var lrcIndexSyl=0;
var lrcIndexLine=0;

$.get("parser/parserLrc.php", function( data ) {
	console.log('hola');
	$.each( data["lines"], function( key1, line ) {
		var init = -1;
		var i = 0;
		$.each( line["syllables"], function( key2, syl ) {
			if(init==-1){
				init = timeToBeat(syl['initTime']);
				lrcIndexLine++;
				$(".lrcSlider.scrolls").append(drawLrcLine(init,lrcIndexLine));
			}		
			$(".lrcLine#lrcLine-"+lrcIndexLine).append(drawLrcSyl(syl, init ,i++));
		});
	});
	calculeLrcWidths();
}, "json" );


var calculeLrcWidths = () => {
	var lines = document.querySelector(".lrcSlider.scrolls").childNodes;
	console.log(lines);
	for (var i = 1; i < lrcIndexLine +1 ; i++) {
		var lastSyl = lines[i].lastChild;
		var lineWidth = parseInt(lastSyl.style.left) + parseInt(lastSyl.style.width); 
		lines[i].style.width = lineWidth + "px";
	}
	var lastLine = document.querySelector(".lrcSlider.scrolls").lastChild;
	var aux = (parseInt(lastLine.style.left) + parseInt(lastLine.style.width))/10; 
	for (i = 0; i < aux; i++) { 
		drawScale();
	}
}


var drawLrcLine = (init, index) => {
	var newDiv = document.createElement( "div" );
	newDiv.className += ' lrcLine';
	newDiv.id = 'lrcLine-' + index;
	newDiv.style.left= (init*10) + 'px';
	return newDiv;
}
<<<<<<< HEAD
var drawLrcSyl = (syl, init, index) => {
=======
var drawLrcSyl = (syl, init) => {
>>>>>>> master
	var newDiv = document.createElement( "div" );
	newDiv.className += ' lrcSyl';
	newDiv.style.left= ((timeToBeat(syl['initTime']) - init)*10) + 'px';
	newDiv.innerHTML= syl['value'];
<<<<<<< HEAD
	if(index % 3 == 0){
		newDiv.innerHTML= syl['value'];
	} else if (index % 3 == 1){
		newDiv.innerHTML= '<br>' + syl['value'];
	} else{
		newDiv.innerHTML= '<br><br>' + syl['value'];
	}
=======
>>>>>>> master
	return newDiv;
}

