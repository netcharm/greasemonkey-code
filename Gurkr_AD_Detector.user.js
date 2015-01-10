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
  '极美茵', '伯来世特', '叆鲱迪坷', '路易',
  '天津妇科',
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
      pat = pat + ".{0,6}" + words[idx];
    }
  }
  return(new RegExp(pat, 'gi'));
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

function highlightAD(word, node, mode)
{
  var ad_style = 'color:white; background-color:red;';
  var link_style = 'color:white; background-color:yellow;';
  var style = ad_style;

  var gwrap = $('div.gwrap');
  if(node)
  {
    gwrap = $(node);
  }
  if(mode && mode.toLowerCase()=='link')
  {
    style = link_style;
  }
  var html = gwrap.html().replace(word, function(m){
    return '<span style="' + style + '">'+m+'</span>'
  });
  gwrap.html( html );

  //document.body.innerHTML = document.body.innerHTML.replace(word, function(m){
  //  return '<span style="color:white; background-color:red;">'+m+'</span>'
  //});
}

function findingAD(items, regex, notice, mode)
{
  var hasAD = false;

  items.each(function(){
    var text = '';
    if(mode && mode.toLowerCase()=='link')
    {
      text = this.innerHTML;
    }
    else
    {
      text = this.textContent;
    }
    //console.log(text);
    hasAD |= matchAD(text, regex);
    if(hasAD)
    {
      highlightAD(regex, this, mode);
    }
  });

  if(hasAD)
  {
    var info = "已发现" + notice;
    notifyAD(info);
    console.warn(info);
    //alert(info);
  }
  else
  {
    var info = "未发现" + notice;
    console.info(info);
  }
}

function main(loaded)
{
  var regexs = makePats(ADS);
  var title = $('#articleTitle');
  var article = $('#articleContent');
  var posts = $('.post-txt');
  var comments = $('.cmtContent');

  //var items = article.toArray().concat(comments.toArray());
  var items = $.merge($.merge(title, article), comments);

  for(idx in regexs)
  {
    var AD = ADS[idx];
    //console.log('Finding ' + AD + ' ...');
    //console.log('Finding ' + regexs[idx] + ' ...');
    findingAD(items, regexs[idx], '广告:'+AD);
  }

  // finding ext-links
  //var link = new RegExp('<a.*?href="http://(?!.*?\.guokr\.com|).*?".*?>.*?</a>', 'g');
  var link = new RegExp('<a (target="_blank"\ ){0,1}(?!data-nickname=".*?"\ ){0,0}href="(http://(?!.*?\.guokr\.com).*?)".*?>.*?</a>', 'gi');

  findingAD(items, link, '外链', 'link');

}

main();
