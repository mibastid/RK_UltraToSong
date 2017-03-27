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
		.syllable, .ultraLine{
			height: var(--heightSyllable);
			width: auto;
			background-color: yellow;
			display: inline-block;
			position: absolute;
		}
		.wrapper {margin: auto;position: relative;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;margin-bottom: 20px !important;padding-top: 2px;}
		.scrolls {margin-bottom: 500px;overflow-x: hidden;overflow-y: hidden;white-space:nowrap;} 
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
		.dragOneSyl{
			width: 100%;
			height: 30%;
			background-color: green;
		}
		.dragAllSyl{
			width: 100%;
			height: 30%;
			background-color: blue;
		}
	</style>
</head>
<body>
	<h4 id="currentAction">Hola mundo</h4>
	<div class="sylContainer wrapper">
		
		<div class="sylSlider scrolls">
			<div class="sylScale"></div>
		</div>
		
	</div>
	<script>
		var dragAllSylNext = false;
		var ultraIndexSyl=0;
		var ultraIndexLine=0;

		$.get("parser/parserUltra.php", function( data ) {
			$.each( data["lines"], function( key1, line ) {
				var init = -1;
				$.each( line["syllables"], function( key2, syl ) {
					if(init==-1){
						init = syl['initTimeBeat'];
						var newDiv = document.createElement( "div" );
						newDiv.className += ' ultraLine';
						ultraIndexLine++;
						newDiv.id = 'ultraLine-' + ultraIndexLine;
						newDiv.style.width= 'auto';
						newDiv.style.height= '200px';
						newDiv.style.left= (init*10) + 'px';
						newDiv.style.background= 'gray';
						$(".sylSlider.scrolls").append(newDiv);
					}
					drawSyl(syl, init);
				});
			});
			calculeWidths();
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

		

		function drawSyl(syl, init){
			var newDiv = document.createElement( "div" );
			newDiv.className += ' syllable';
			ultraIndexSyl++;
			newDiv.id = 'ultraSyl-' + ultraIndexSyl;
			newDiv.style.width= (syl['durationBeat']*10) + 'px';
			newDiv.style.left= ((syl['initTimeBeat'] - init)*10) + 'px';
			var newDiv1 = document.createElement( "div" );
			newDiv1.className += ' dragText';
			newDiv1.innerHTML = syl['value'];
			var newDiv2 = document.createElement( "div" );
			newDiv2.className += ' dragOneSyl';
			var newDiv3 = document.createElement( "div" );
			newDiv3.className += ' dragAllSyl';
			newDiv.appendChild(newDiv1);
			newDiv.appendChild(newDiv2);
			newDiv.appendChild(newDiv3);
			$("#ultraLine-"+ ultraIndexLine).append(newDiv);
		}

		function putEvents(){
			$( ".syllable" ).draggable({ handle: ".dragOneSyl, .dragAllSyl" },{axis: "x"},{ grid: [10,0]},
				{stop: function(event, ui){
					if(dragAllSylNext){
						var elementId = parseInt($(this).attr('id').split('-')[1]);
						var move = ui.position.left - ui.originalPosition.left;
						var parentId = $(this).parent().attr('id');
						console.log(parentId);
						console.log($("#" + parentId )[0]);
						$("#" + parentId + " .syllable" ).each(function( index) {		
							if(parseInt($(this).attr('id').split('-')[1]) > elementId){
								var newPosition = parseInt($(this).css('left')) + move;
								$(this).css('left', newPosition);
							}
						});
					}
				}});
			$(".dragOneSyl").mousedown(function() {
				dragAllSylNext = false;
				$('#currentAction').text("Mover sólo esta sílaba")
			});
			$(".dragAllSyl").mousedown(function() {
				dragAllSylNext = true;
				$('#currentAction').text("Mover todas las sílabas del verso")
			});
		}

		function calculeWidths(){
			var lines = document.querySelector(".sylSlider.scrolls").childNodes;
			for (var i = 3; i < ultraIndexLine+3; i++) {
				var lastSyl = lines[i].lastChild;
				var lineWidth = parseInt(lastSyl.style.left) + parseInt(lastSyl.style.width); 
				lines[i].style.width = lineWidth + "px";
			}
			var lastLine = document.querySelector(".sylSlider.scrolls").lastChild;
			var aux = (parseInt(lastLine.style.left) + parseInt(lastLine.style.width))/10; 
			for (i = 0; i < aux; i++) { 
				drawScale();
			}
		}
	</script>
</body>
</html>