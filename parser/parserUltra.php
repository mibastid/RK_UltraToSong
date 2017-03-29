<?php

$filename = "./output.txt";

$inputFile = fopen($filename, "r") or die("Unable to open file!");

$songName = explode('.txt', $filename)[0];

$lines = [];

$song = [];

if(!feof($inputFile)) {
	$txt = utf8_encode(fgets($inputFile));
}

while(!feof($inputFile)) {
	$line = [];
	$aux = [];
	while(strcmp($txt[0],'#')==0){
		if (strcmp($txt[1].$txt[2].$txt[3], 'BPM') == 0){
			$song['BPM'] = utf8_encode(explode(':', $txt)[1]);
		}elseif(strcmp($txt[1].$txt[2].$txt[3], 'GAP') == 0){
			$song['GAP'] = utf8_encode(explode(':', $txt)[1]);
			//echo $song['GAP'];
		}elseif(strcmp($txt[1].$txt[2].$txt[3].$txt[4].$txt[5], 'TITLE') == 0){
			$song['TITLE'] = utf8_encode(explode(':', $txt)[1]);
		}
		$txt = utf8_encode(fgets($inputFile));
	}
	while((strcmp($txt[0],':')==0 || strcmp($txt[0],'*')==0) && !feof($inputFile)){
		$syllable = createSyllable($txt);
		array_push($aux, $syllable);
		$txt = fgets($inputFile);
	}

	if(count($aux)>0){
		$line['syllables'] = $aux;
		array_push($lines, $line);
	}
	$txt = utf8_encode(fgets($inputFile));
	
}




$song['song'] = 'hola';
$song['lines'] = $lines;
//print_r($song);
//echo json_encode(print_r($song, true));
echo json_encode($song);

/*$outputFile = fopen($songName."_ultra.json", "w");

fwrite($outputFile, json_encode($song,JSON_PRETTY_PRINT));

fclose($inputFile);
fclose($outputFile);
*/


function createSyllable($textLine){
	$aux = explode(" ", $textLine);
	$syllable = [];
	$syllable['initTimeBeat']= $aux[1];
	$syllable['durationBeat']=$aux[2];
	$syllable['note']=$aux[3];
	$syllable['value']=utf8_encode($aux[4]);
	$i = 5;
	while($i < count($aux)){
		$syllable['value'] = $syllable['value'] . ' ' . utf8_encode($aux[ $i ]);
		$i++;
	}
	$syllable['value']=substr($syllable['value'], 0, -2);

	return $syllable;
}


?>