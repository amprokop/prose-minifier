var fs = require('fs');
var path = require('path');
var _ = require('lodash');



fs.readFile(path.join(__dirname, 'dict.txt'), function(err, text){
  if (err){
    console.log(err);
  }

  var lines = text.toString().split('\n\n');

  var wordsPos = {};

  _.each(lines, function(line){
    // process.exit(1);
    var posRegex = /(n\.|v\.|adv\.|abbr\.|pron\.|adj\.|var\.)/;
    var word = line.split(' ')[0].toLowerCase().trim();
    var posMatch = line.match(posRegex);
    // console.log(posMatch);
    if (posMatch){
      var pos = posMatch[0];
      wordsPos[word] = pos;
    }
  });

  fs.writeFile(path.join(__dirname, 'pos.json'), JSON.stringify(wordsPos), function(err, done){
    if (err){
      console.log(err);
    }
  })
});
