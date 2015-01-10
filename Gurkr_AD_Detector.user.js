// ==UserScript==
// @name        Gurkr AD Detector
// @namespace   NetCharm
// @description Gurkr AD Detector
// @include     http://www.guokr.com/post/*
// @version     1.1.0.0
// @run-at      document-end
// @grant       none
// ==/UserScript==

const ADS = [
  '爸爸去哪儿', '中国好声音', '爸爸去哪兒', '中國好聲音', '中獎信息',
  '极美茵', '伯来世特',
  '贝贝游戏', '91y'
];

function makePat(words)
{
  var pat = "";
  for(idx in words.split(''))
  {
    if(pat.length <= 0)
    {
      pat = words[idx];
    }
    else
    {
      pat = pat + ".{0,8}" + words[idx];
    }
  }
  return(new RegExp(pat, 'g'));
}

function makePats(words)
{
  var regexs = new Array();
  for(idx in words)
  {
    regexs[regexs.length] = makePat(words[idx]);
    //console.log(regexs);
  }
  return(regexs);
}

function matchAD(text, regex)
{
  var hasAD = false;
  var results = text.match(regex);
  if(results && (results.length>0))
  {
    hasAD = true;
  }
  return(hasAD);
}

function notifyAD(info)
{
  $('a.gh-i-notice').css('background-color', 'red');
  $('a.gh-i-notice').css('color', 'white');
  var title = $('a.gh-i-notice').attr('title');
  if(title)
  {
    $('a.gh-i-notice').attr('title', title + '\n' + info);
  }
  else
  {
    $('a.gh-i-notice').attr('title', info);  
  }
}

function highlightAD(word, node)
{
  var gwrap = $('div.gwrap');
  if(node)
  {
    gwrap = $(node);
  }
  var html = gwrap.html().replace(word, function(m){
    return '<span style="color:white; background-color:red;">'+m+'</span>'
  });
  gwrap.html( html );
  
  //document.body.innerHTML = document.body.innerHTML.replace(word, function(m){
  //  return '<span style="color:white; background-color:red;">'+m+'</span>'
  //});
}

function main(loaded)
{
  var regexs = makePats(ADS);
  var posts = $('.post-txt');
  var comments = $('.cmtContent');

  for(idx in regexs)
  {
    var hasAD = false;

    var AD = ADS[idx];
    //console.log('Finding ' + AD + ' ...');

    posts.each(function(){
      var text = this.textContent;
      hasAD |= matchAD(text, regexs[idx]);
      if(hasAD)
      {
        highlightAD(regexs[idx], this)
      }
    });
    comments.each(function(){
      var text = this.textContent;
      hasAD |= matchAD(text, regexs[idx]);
      if(hasAD)
      {
        highlightAD(regexs[idx], this)
      }
    });

    if(hasAD)
    {
      var info = "已发现广告: " + AD;
      notifyAD(info);
      //highlightAD(regexs[idx])
      console.warn(info);
      //alert(info);
    }
    else
    {
      var info = "未发现广告: " + AD;
      console.info(info);
    }
  }
}

main();
