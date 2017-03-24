<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script	src="https://code.jquery.com/jquery-3.2.1.min.js"	integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="	crossorigin="anonymous"></script>
	<script  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="  crossorigin="anonymous"></script>
	<style>
		body{
			--heightSyllable: 100px;
		}
		.syllable{
			height: var(--heightSyllable);
			width: 10px;
			background-color: yellow;
			display: inline-block;
			position: relative;
		}
		.wrapper {margin: auto;text-align: center;position: relative;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;margin-bottom: 20px !important;padding-top: 2px;}
		.scrolls {margin-top: 0px;overflow-x: scroll;overflow-y: hidden;white-space:nowrap;} 
		.scaleIndex{
			height: 4px;
			width: 8px;
			border-width: 1px 1px 0px 1px;
			border-style: solid;
			border-color: black;
			display: inline-block;
			margin-bottom: 10px;
			left: 0px;
			font-size: 4px;
			text-align: right;
		}
		.dragText{
			width: 100%;
			height: 40%;
		}
		.dragOne{
			width: 100%;
			height: 30%;
			background-color: green;
		}
		.dragAll{
			width: 100%;
			height: 30%;
			background-color: blue;
		}
	</style>
</head>
<body>
	Hola mundo!
	<br>
	<div class="sylContainer wrapper">
		
		<div class="sylSlider scrolls">
			<div class="sylScale"></div>
		</div>
		
	</div>
	<script>
		var dragAllNext = false;

		$.get("parser/parserUltra.php", function( data ) {
			$.each( data["lines"], function( key1, line ) {
				$.each( line["syllables"], function( key2, syl ) {
					
					drawSyl(syl);
					for (i = 0; i < 11; i++) { 
						drawScale();
					}
				});
			});
			putEvents();
		}, "json" );

		var scaleCount =0;
		function drawScale(){
			var newDiv = document.createElement( "div" );
			newDiv.className += ' scaleIndex';
			newDiv.innerHTML = scaleCount;
			$(".sylScale").append(newDiv);
			scaleCount++;
		}

		var indexSyl=0;

		function drawSyl(syl){
			var newDiv = document.createElement( "div" );
			newDiv.className += ' syllable';
			newDiv.id = 'ultraSyl-' + indexSyl++;
			newDiv.style.width= (syl['durationBeat']*10) + 'px';
			newDiv.style.left= (syl['initTimeBeat']*10) + 'px';
			var newDiv1 = document.createElement( "div" );
			newDiv1.className += ' dragText';
			newDiv1.innerHTML = syl['value'];
			var newDiv2 = document.createElement( "div" );
			newDiv2.className += ' dragOne';
			var newDiv3 = document.createElement( "div" );
			newDiv3.className += ' dragAll';
			newDiv.appendChild(newDiv1);
			newDiv.appendChild(newDiv2);
			newDiv.appendChild(newDiv3);
			$(".sylSlider.scrolls").append(newDiv);
		}

		function putEvents(){
			$( ".syllable" ).draggable({ handle: ".dragOne, .dragAll" },{axis: "x"},{ grid: [10,0]},
				{stop: function(event, ui){
					if(dragAllNext){
						var elementId = parseInt($(this).attr('id').split('-')[1]);
						var move = ui.position.left - ui.originalPosition.left;
						$( ".syllable" ).each(function( index) {		
							if(parseInt($(this).attr('id').split('-')[1]) > elementId){
								var newPosition = parseInt($(this).css('left')) + move;
								$(this).css('left', newPosition);
							}
						});
					}
				}});
			$(".dragOne").mousedown(function() {
				dragAllNext = false;
			});
			$(".dragAll").mousedown(function() {
				dragAllNext = true;
			});
		}
	</script>
</body>
</html>