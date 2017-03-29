
document.getElementById('exportUltra').addEventListener('click', function () {
  createLines();
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
        var initTime = parseInt(lines[i].style.left) + parseInt(syl.style.left);
      }     

    }

  }
}



// var textFile = null,
//   makeTextFile = function (text) {
//     var data = new Blob([text], {type: 'text/plain'});

//     // If we are replacing a previously generated file we need to
//     // manually revoke the object URL to avoid memory leaks.
//     if (textFile !== null) {
//       window.URL.revokeObjectURL(textFile);
//     }

//     textFile = window.URL.createObjectURL(data);

//     return textFile;
//   };