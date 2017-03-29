var lrcIndexSyl=0;
var lrcIndexLine=0;

$.get("parser/parserLrc.php", function( data ) {
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
}, "json" );




var drawLrcLine = (init, index) => {
	var newDiv = document.createElement( "div" );
	newDiv.className += ' lrcLine';
	newDiv.id = 'lrcLine-' + index;
	newDiv.style.left= (init*10) + 'px';
	return newDiv;
}

var drawLrcSyl = (syl, init, index) => {
	var newDiv = document.createElement( "div" );
	newDiv.className += ' lrcSyl';
	newDiv.style.left= ((timeToBeat(syl['initTime']) - init)*10) + 'px';
	newDiv.innerHTML= syl['value'];
	if(index % 3 == 0){
		newDiv.innerHTML= syl['value'];
	} else if (index % 3 == 1){
		newDiv.innerHTML= '<br>' + syl['value'];
	} else{
		newDiv.innerHTML= '<br><br>' + syl['value'];
	}
	return newDiv;
}

