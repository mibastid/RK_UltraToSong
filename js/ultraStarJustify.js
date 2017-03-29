

var ultraStarJustifyProcessFiles = (lrcFile, ultraFile) => {
  
  var lrc = lrcHelperParse(lrcContent);
  var ultra = ultraStarHelperParse(ultraContent);

  var result = ultraStarJustifyMix(lrc, ultra);

  var output = ultraStarHelperGenerateUltraFile(result);
  return output;
}

var ultraStarJustifyMix = (lrc, ultra) => {

  var output = {
    'bpm': ultra['bpm'],
    'gap': 0,
    'steps': [] 
  }

  var ultraStarLines = ultraStarHelperLines(ultra);

  var fromLrcStep = 0;
  for (var i = 0; i < ultraStarLines.length; i ++) {
    // find line on lrc
    // if exits on lrc -> to position
    // if don't exits on lrc -> remove from output
    var ultraStarLine = ultraStarLines[i];
    var result = ultraStarJustifyFindUltraStarLinePosition(ultraStarLine, lrc, fromLrcStep);

    if (result) { // found     
      // add 
      var timeLrcBegin = lrc[result['positionInitialStep']]['beginTime'];
      var timeLrcBeginMiliSeconds = lrcHelperParseStringToMiliSeconds(timeLrcBegin);
      var beatBegin = ultraStarHelperBeatAtTime(timeLrcBeginMiliSeconds, ultra['bpm'], 0)
      var translatedLine = ultraStarHelperTranslateLineAtBeat(ultraStarLine, beatBegin);
      Array.prototype.push.apply(output['steps'], translatedLine);
      fromLrcStep = result['lastRightStep'];
    }
  }
  return output;
}


var ultraStarJustifyFindUltraStarLinePosition = (ultraLine, lrc, fromLrcStep) => {

  // remove lrc step used
  var lrcSlice = lrc.slice(fromLrcStep);

  // generate array with lrc step match ultra line (-1 if not match)
  var lrcArray = [];
  for (var i=0; i < ultraLine.length - 1; i++) {
    lrcArray.push(ultraStarJustifyFindUltraStarStepPosition(ultraLine[i], lrcSlice));
  }

  // x = x0 + t
  // generate array with initial potential lrc position
  var positionInitialArray = [];
  for (var i = 0; i < lrcArray.length; i++) {
    if (lrcArray[i] !== -1) {
      positionInitialArray.push(lrcArray[i] - i);
    } else {
      positionInitialArray.push(-1);
    }
  }

  // order initial potential position with hits
  var countsObject = {};
  positionInitialArray.forEach(function(x) { countsObject[x] = (countsObject[x] || 0)+1; });

  // get inital lrc position with more hits
  var positionInitial = -1;
  var countNumber = -1;
  for (var key in countsObject) {
    if (!countsObject.hasOwnProperty(key)) continue;
    var obj = countsObject[key];
    if (key === '-1') {
      continue
    }
    if (obj > countNumber) {
      positionInitial = key;
      countNumber = obj;
    }
  }

  if (positionInitial === -1) { // not found
    //console.log('Not found');
    return ;
  }

  // calculate the last hit between ultra and lrc, used to calculate next line
  var lastRightStep = 0;
  for (var i = 0; i < positionInitialArray.length; i++) {
    var tmpPosition = Number(positionInitialArray[i]);
    if (tmpPosition == positionInitial) {
      lastRightStep = i;
    }
  }

  var positionInitialStep = Number(Number(positionInitial) + Number(fromLrcStep));
  var returnLastRightStep = Number(positionInitialStep) + Number(lastRightStep)
  return {
    'positionInitialStep': positionInitialStep,
    'lastRightStep': returnLastRightStep
  };



} 

// find position of ultra step inside lrc
var ultraStarJustifyFindUltraStarStepPosition = (ultraStep, lrc) => {

  for (var i = 0; i < lrc.length; i ++) {
    if (ultraStep) {
      var ultraLyric = removeDiacritics(ultraStep['lyric'].replace('-',' ').toLowerCase().trim());
      var lrcLyric = removeDiacritics(lrc[i]['lyric'].replace('\\n','').toLowerCase().trim());
      if (ultraLyric === lrcLyric) {
        return i;
      }
    }
  }
  return -1;
}
