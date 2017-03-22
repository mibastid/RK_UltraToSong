<?php

$filename = "paulinarubio.txt";

$inputFile = fopen($filename, "r") or die("Unable to open file!");

$songName = explode('.txt', $filename)[0];

$lines = [];

if(!feof($inputFile)) {
	$txt = utf8_encode(fgets($inputFile));
}

while(!feof($inputFile)) {
	$line = [];
	$aux = [];
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



$song = [];
$song['song'] = $songName;
$song['lines'] = $lines;
print_r(json_encode($song,JSON_PRETTY_PRINT));
$outputFile = fopen($songName."_ultra.json", "w");

fwrite($outputFile, json_encode($song,JSON_PRETTY_PRINT));

fclose($inputFile);
fclose($outputFile);

echo '<br>fin';

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