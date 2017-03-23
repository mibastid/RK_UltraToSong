<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script	src="https://code.jquery.com/jquery-3.2.1.min.js"	integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="	crossorigin="anonymous"></script>
	<style>
		.syllable{
			height: 50px;
			width: 10px;
			background-color: yellow;
			border:  1px solid black;
			display: inline-block;
		}
	</style>
</head>
<body>
	Hola mundo!
	<br>

	<script>
		$.get("parser/parserUltra.php", function( data ) {
			$.each( data["lines"], function( key1, line ) {
				$.each( line["syllables"], function( key2, syl ) {
					console.log(syl['durationBeat']);
					drawSyl(syl);
				});
			});
		}, "json" );

		/*$.getJSON("parser/paulinarubio_ultra.json", function( data ) {
			$.each( data["lines"], function( key1, line ) {
				$.each( line["syllables"], function( key2, syl ) {
					//console.log(syl['durationBeat']);
					//drawSyl(syl);
				});
			});
		});*/

		function drawSyl(syl){
			var newDiv = document.createElement( "div" );
			newDiv.className += ' syllable';
			newDiv.style.width= (5*5) + 'px';
			$("body").append(newDiv);
		}
	</script>
</body>
</html>