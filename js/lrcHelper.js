
var lrcHelperParseStringToMiliSeconds = (value) => {
  var array = value.split(':')
  var minutes = array[0];
  var rest = array[1];
  var miliSeconds = rest.replace('.','')
  var output = Number(minutes) * 60 * 1000 + Number(miliSeconds);
  return output;
}

var lrcHelperParse = (content) => {
  
  var contentArray = content.split('\n');

  var output = contentArray.map(element => {
    var splits = element.split('-')
    var beginTime = splits[0];
    var endTime = splits[1];
    var value = splits[2];
    var step = {
      'step':element,
      'beginTime': beginTime,
      'lyric': value
    }
    return step;
  })

  return output;
}

var lrcHelperParseHtml = (content) => {
  var output = {
    'song': 'song',
    'lines': []
  }

  var contentArray = content.split('\n');

  var steps = contentArray.map(element => {
    var splits = element.split('-')
    var beginTime = splits[0];
    var endTime = splits[1];
    var value = splits[2];
    var step = {
      'step':element,
      'beginTime': beginTime,
      'lyric': value
    }
    return step;
  })

  var line = [];
  for (var i=0; i< steps.length; i++ ) {
    var step = steps[i];
    var newStep = {
       'initTime': step['beginTime'],
       'value': step['lyric'].replace('\\n','')
    }
    line.push(newStep)
    if (step['lyric'].indexOf('\\n') != -1) {
      output['lines'].push({'syllables':line})
      line = [];
    }
  }

  return output;
}
