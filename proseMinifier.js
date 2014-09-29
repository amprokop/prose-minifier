var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var gburg = "Four score and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in liberty, and dedicated to the proposition that “all men are created equal.” Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived, and so dedicated, can long endure. We are met on a great battle field of that war. We come to dedicate a portion of it, as a final resting place for those who died here, that the nation might live. This we may, in all propriety do.But, in a larger sense, we can not dedicate – we can not consecrate – we can not hallow, this ground – The brave men, living and dead, who struggled here, have hallowed it, far above our poor power to add or detract. The world will little note, nor long remember what we say here; while it can never forget what they did here. It is rather for us, the living, we here be dedicated to the great task remaining before us – that, from these honored dead we take increased devotion to that cause for which they here, gave the last full measure of devotion – that we here highly resolve these dead shall not have died in vain; that the nation, shall have a new birth of freedom, and that government of the people, by the people, for the people, shall not perish from the earth."
var replacements = {
  is : '=',
  are : '=',
  am : '=',
  were : '=',
  was : '=',
  and : '&',
  but : '~',
  or : '|',
  not : '!'
};

var anna = fs.readFileSync(path.join(__dirname, 'anna_karenina.txt')).toString();
var pos = fs.readFileSync(path.join(__dirname, 'pos.json')).toString();

var plaintextMinifier = function(str){
  var words = str.split(' ');
  var partsOfSpeech = JSON.parse(pos);

  var words =_.map(words, function(word){
    if (replacements[word.toLowerCase()]){
      return replacements[word];
    }
      return word;
  });

  var coloredWords = _.map(words, function(word, index){
    var color = '';
    if (!partsOfSpeech[word] && word.toLowerCase() !== word && words[index][words[index].length - 1] === "."){
      color = 'red';
    } else if (partsOfSpeech[word] === 'pron.'){
      color = 'purple';
    } else if (word === 'a' || word === 'an' || word === 'the'){
      color = 'blue';
    }
    if (color){
      return '<span class="' + color + '">' + word + '</span>';
    }
    return word;
  });

  var joined = coloredWords.join('');

  joined = joined.replace(/(\r\n|\n|\r)/gm,'');
  joined = joined.replace(/\s+/g,'');
  return joined;
};

var annatext = plaintextMinifier(anna);


var beginning = "<!DOCTYPE html><html><head><meta http-equiv='content-type' content='text/html;charset=utf-8'/><link rel='stylesheet' type='text/css' href='style.css' /></head><body>";
var end = "</body></html>";

fs.writeFile(path.join(__dirname, 'anna-karenina.html' ), beginning + plaintextMinifier(anna) + end, {encoding : 'utf-8'}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log('done!')
  }
});

