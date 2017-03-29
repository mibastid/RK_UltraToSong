
document.getElementById('exportUltra').addEventListener('click', function () {
  createFile(createLines());

});


var createLines = () => {
  var positions = [];
  var aux = "";
  var lines = document.querySelectorAll('.ultraLine');
  for (var i = 0; i < lines.length - 1; i++) {
    for (var j = 0; j < lines[i].childNodes.length; j++) {
      var syl = lines[i].childNodes[j];
      if(syl.classList.contains('syllable')){
        var note = "";
        var value = "";
        for (var k = 0; k < syl.childNodes.length; k++) {
          if (syl.childNodes[k].className == " noteUltra") {
            note = syl.childNodes[k].innerHTML;
          }  else if(syl.childNodes[k].className == " dragText"){
            value = syl.childNodes[k].innerHTML;
          }  
        }
        var initTime = (parseInt(lines[i].style.left) + parseInt(syl.style.left))/10;
        var duration = parseInt(syl.style.width)/10;
        positions.push(": " + initTime + " " + duration + " " + note + " " + value);
      }     
    }
    //positions.push();
  }
  console.info(positions);
  return positions;
}


var createFile = (lines) => {
  var text="";
  for (var i = 0; i < lines.length - 1; i++) {
    text = text + lines[i] + '\n';
  }
  
  download(text, "ultra.txt", "text/plain");
}
