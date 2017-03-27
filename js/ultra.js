var dragAllFlag = false;
		var ultraIndexSyl=0;
		var ultraIndexLine=0;

		$.get("parser/parserUltra.php", function( data ) {
			$.each( data["lines"], function( key1, line ) {
				var init = -1;
				$.each( line["syllables"], function( key2, syl ) {
					if(init==-1){
						init = syl['initTimeBeat'];
						ultraIndexLine++;
						$(".sylSlider.scrolls").append(drawLine(init,ultraIndexLine));
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

		
		function drawLine(init, index){
			var newDiv = document.createElement( "div" );
			newDiv.className += ' ultraLine';
			newDiv.id = 'ultraLine-' + index;
			newDiv.style.width= 'auto';
			newDiv.style.height= '200px';
			newDiv.style.left= (init*10) + 'px';
			newDiv.style.background= 'gray';
			var newDiv1 = document.createElement( "div" );
			newDiv1.className += ' dragOneLine';
			var newDiv2 = document.createElement( "div" );
			newDiv2.className += ' dragAllLine';
			newDiv.appendChild(newDiv1);
			newDiv.appendChild(newDiv2);
			return newDiv;
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
					var parentId = $(this).parent().attr('id');
					var move = ui.position.left - ui.originalPosition.left;
					if(dragAllFlag){
						var elementId = parseInt($(this).attr('id').split('-')[1]);
						$("#" + parentId + " .syllable" ).each(function( index) {		
							if(parseInt($(this).attr('id').split('-')[1]) > elementId){
								var newPosition = parseInt($(this).css('left')) + move;
								$(this).css('left', newPosition);
							}
						});
					}
					var parentDiv = $("#" + parentId);
					var parentChildren = parentDiv.children();
					var firstLeft = parseInt(parentChildren.first().css("left"));
					var lastLeft = parseInt(parentChildren.last().css("left"));
					var lastWidth = parseInt(parentChildren.last().width());
					var containerLeft = parseInt(parentDiv.css("left"));
					parentDiv.width(lastLeft + lastWidth - firstLeft);
					parentDiv.css("left", containerLeft + firstLeft);
					if(firstLeft != 0){
						$("#" + parentId + " .syllable" ).each(function( index) {
							var newPosition = parseInt($(this).css('left')) - move;	
							$(this).css('left', newPosition);
						});
					}
				}});
			$(".dragOneSyl").mousedown(function() {
				dragAllFlag = false;
				$('#currentAction').text("Mover sólo esta sílaba")
			});
			$(".dragAllSyl").mousedown(function() {
				dragAllFlag = true;
				$('#currentAction').text("Mover todas las sílabas posteriores a la vez")
			});
			$(".dragOneLine").mousedown(function() {
				dragAllFlag = false;
				$('#currentAction').text("Mover sólo esta línea")
			});
			$(".dragAllLine").mousedown(function() {
				dragAllFlag = true;
				$('#currentAction').text("Mover todas las líneas posteriores a la vez")
			});
			$( ".ultraLine" ).draggable({ handle: ".dragOneLine, .dragAllLine" },{axis: "x"},{ grid: [10,0]},
				{stop: function(event, ui){
					if(dragAllFlag){
						var move = ui.position.left - ui.originalPosition.left;
						var elementId = parseInt($(this).attr('id').split('-')[1]);
						var parentId = $(this).parent().attr('id');
						console.log(elementId);
						$(".ultraLine" ).each(function( index) {		
							if(parseInt($(this).attr('id').split('-')[1]) > elementId){
								var newPosition = parseInt($(this).css('left')) + move;
								$(this).css('left', newPosition);
							}
						});
					}
				}});
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