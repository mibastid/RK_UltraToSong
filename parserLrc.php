<?php

$filename = "paulinarubio.lrc";

$inputFile = fopen($filename, "r") or die("Unable to open file!");

$songName = explode('.lrc', $filename)[0];

$lines = [];

if(!feof($inputFile)) {
	$txt = fgets($inputFile);
}

while(!feof($inputFile)) {
	$line = [];
	$aux = [];
	while(!(strpos($txt, "\\n") !== false) && !feof($inputFile)){
		$syllable = createSyllable($txt);
		array_push($aux, $syllable);
		$txt = fgets($inputFile);
	}

	$syllable = createSyllable($txt);
	$syllable['value']=substr($syllable['value'], 0, -2);
	array_push($aux, $syllable);

	$aux = getDurationSyllable($aux, $txt);

	if(count($aux)>0){
		$line['syllables'] = $aux;
		array_push($lines, $line);
	}
	$txt = fgets($inputFile);
}

$song = [];
$song['song'] = $songName;
$song['lines'] = $lines;
print_r(json_encode($song,JSON_PRETTY_PRINT));
$outputFile = fopen($songName."_lrc.json", "w");

fwrite($outputFile, json_encode($song,JSON_PRETTY_PRINT));

fclose($inputFile);
fclose($outputFile);

echo '<br>fin';

function createSyllable($textLine){
	$aux = explode("-", $textLine);
	$syllable = [];
	$syllable['initTime']= $aux[0];
	$syllable['duration']=0;
	$syllable['value']=$aux[2];
	if(count($aux)==4){
		$syllable['value']= $syllable['value'] . '-';
	}else{
		$syllable['value']=substr($syllable['value'], 0, -1);
	}
	return $syllable;
}

function getDurationSyllable($syllables, $lastLine){
	$i = 0;
	$j = 0;
}



?>