var timeToBeat = (time) =>{
	var aux = time.toString().split(":");
	if(aux.length>1){
		time = parseFloat(aux[0]) * 60 + parseFloat(aux[1]);
	}else{
		time = parseFloat(time);
	}
	return beatAtTime(parseFloat(time*1000), 216, 0);
}

var beatAtTime = (time, bpm, gap) => {
	var duration = parseFloat(beatDuration(bpm)); 
	return Math.floor((parseFloat(time) - parseFloat(gap)) / duration );
}

var beatDuration = (bpm) => { 
	return 1 / parseFloat(bpm) / 4 * 60 * 1000;
}