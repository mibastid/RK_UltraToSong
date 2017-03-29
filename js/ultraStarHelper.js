


var ultraStarHelperLines = (ultra) => {

  var lines = [];
  var steps = [];

  for (var i = 0; i < ultra['steps'].length; i ++) {
    var step = ultra['steps'][i]
    if (step['type'] === '-') {
      steps.push(step);
      lines.push(steps);
      steps = [];
    } else {
      steps.push(step);
    }
    if (i === ultra.length - 1) { // last one
      lines.push(steps);
    }
  }
  return lines;
}


var ultraStarHelperTranslateLineAtBeat = (line, beat) => {
  var initialBeat = beat - parseInt(line[0]['beginBeat'])
    for (var i=0; i < line.length; i++) {
      line[i]['beginBeat'] = parseInt(line[i]['beginBeat']) + initialBeat;
    }
    return line;
}

var ultraStarHelperBeatAtTime = (time, bpm, gap) => {
  var duration = parseFloat(ultraStarHelperBeatDuration(bpm));
  return Math.floor((parseFloat(time) - parseFloat(gap)) / duration );
}

var ultraStarHelperBeatDuration = (bpm) => {
  return 1 / parseFloat(bpm) / 4 * 60 * 1000;
}

var ultraStarHelperGenerateUltraFile = (ultra) => {
  var output = '';
  output += '#BPM:'+ultra['bpm']+'\n'
  output += '#GAP:'+ultra['gap']+'\n'
  var steps = ultra['steps'];
    for (var i=0; i < steps.length; i++) {
      if (steps[i]['type'] === '-') {
        var line = steps[i]['type'] + ' ' + steps[i]['beginBeat'] + '\n'
        output += line
      } else {
        var line = steps[i]['type'] + ' ' + steps[i]['beginBeat'] + ' ' + steps[i]['durationBeats'] + ' ' + steps[i]['note'] + ' ' + steps[i]['lyric'] + '\n'
        output += line
      }
    }
    output += 'E\n'
    return output
}

var ultraStarHelperParse = (content) => {

  var contentArray = content.split('\n');
  var output = {'steps':[]};

  for (var i=0; i < contentArray.length; i++) {
    var element = contentArray[i]
    if (element[0] === 'E') {
      break;
    } if (element[0] === '#') {
      if (element.indexOf('#BPM:') !== -1){
        output['bpm'] = element.substring(5);
      }
      if (element.indexOf('#GAP:') !== -1){
        output['gap'] = element.substring(5);
      }
    } else {
      var splits = element.split(' ')
      if (splits.length > 0) {
        var step = {};
        step['type'] = splits[0]
        if (splits.length > 1) {
          step['beginBeat'] = splits[1];
        }
        if (splits.length > 2) {
          step['durationBeats'] = splits[2];
        }
        if (splits.length > 3) {
          step['note'] = splits[3];
        }          
        if (splits.length > 4) {
          var tmpStr = splits[0] + ' ' + splits[1] + ' ' + splits[2] + ' ' + splits[3] + ' ';
          step['lyric'] = element.substring(tmpStr.length);
        }
        output['steps'].push(step);
      }
    }
  }

  return output;
}

var ultraStarHelperParseHtml = (content) => {
  var ultra = ultraStarHelperParse(content)
  
  var steps = [];
  //var lines = ultraStarHelperLines(ultra)
  var output = {
    'song': 'song',
    'bpm': ultra['bpm'].replace('\r',''),
    'gap': ultra['gap'].replace('\r',''),
    'lines': []
  }

  for (var i = 0; i < ultra['steps'].length; i ++) {
    var step = ultra['steps'][i]
    if (step['type'] === '-') {
      //steps.push(step);
      var syllables = {
        'syllables': steps,
        'end': 
          {
            'type':step['type'],
            'initTimeBeat': step['beginBeat'].replace('\r','')
          }
      }
      output['lines'].push(syllables);
      steps = [];
    } else {
      var newStep = {
          'type': step['type'],
          'initTimeBeat': step['beginBeat'],
          'durationBeat': step['durationBeats'],
          'note': step['note'],
          'value': step['lyric'].replace('\r','')
        }
      steps.push(newStep);
    }
    if (i === ultra.length - 1) { // last one
      var newStep = {
          'type': step['type'],
          'initTimeBeat': step['beginBeat'],
          'durationBeat': step['durationBeats'],
          'note': step['note'],
          'value': step['lyric']
        }
      lines.push(newStep);
    }
  }

  return output;

  console.log(ultra)
  for (var i=0; i < lines.length; i++) {
    var line = lines[i];
    for (var j=0; j < line.length; j++) {
      var step = line[j];
      if (step['type'] === '-') {
        var newStep = {
          'type': step['type'],
          'initTimeBeat': step['beginBeat'],
          'durationBeat': step['durationBeats'],
          'note': step['note'],
          'value': step['lyric']
        }
        steps.push(step);
        lines.push(steps);
        steps = [];
      } else {
        steps.push(step);
      }
    }
    var line = {
      'type': lines[i][''],
      'initTimeBeat': lines[i][''],
      'durationBeat': lines[i][''],
      'note': lines[i][''],
      'value': lines[i]['']
    }
    var syllables = {
      'syllables': lines[i]
    }
    output['lines'].push(syllables)
  }

  return output;
}
