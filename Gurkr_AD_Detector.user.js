// ==UserScript==
// @name        Gurkr AD Detector
// @namespace   NetCharm - [https://github.com/netcharm]/[https://netcharm.bitbucket.org/]
// @author      netcharm
// @description Gurkr AD Detector
// @include     http://*.guokr.com/post/*
// @include     http://*.guokr.com/question/*
// @version     1.1.1.5
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Gurkr_AD_Detector.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Gurkr_AD_Detector.user.js
// @grant       none
// ==/UserScript==

const ADS = [
  '爸爸去哪儿', '中国好声音', '爸爸去哪兒', '中國好聲音', '中獎信息',
  '极美茵', '伯来世特', '伯莱狮特', '博来狮特', '叆鲱迪坷', '路易',
  '妙女郎', '酵素梅', '酵素', '总代理',
  '天津妇科', '香港健康医疗', '香港性别鉴定', '性别检测', '医务顾问', '胎儿性别鉴定',
  '咨詢熱線', '咨询热线',
  '新闻牙膏', '新闻牙刷',
  '贝贝游戏', '贝贝银子', '91y', '1908游戏', '747官网'
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

function notifyAD(info, fg, bg)
{
  var bgcolor='red';
  var fgcolor='white';
  if(bg) bgcolor = bg;
  if(fg) fgcolor = fg;
  
  $('a.gh-i-notice').css('background-color', bgcolor);
  $('a.gh-i-notice').css('color', fgcolor);
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
  //  return '<span style="color:white; background-color:red;">AD:'+m+'</span>'
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
  return(hasAD);  
}

function findingLink(items, hasAD)
{
  var bgcolor = 'yellow';
  var fgcolor = 'red';
  var hasLink = false;
  var notice = '外链';
  var link_pat = new RegExp('http://(?!.*?\.guokr\.com).*?$', 'gi');

  items.each(function(){
    var links = $(this).find('a');
    links.each(function(){
      var link = $(this);
      var isExtLink = link[0].href.match(link_pat);
      if(isExtLink && isExtLink.length>0)
      {
        hasLink = true;
        link.css('background-color', bgcolor);
        link.css('color', fgcolor);
      }
    });
  });

  if(hasLink)
  {
    var info = "已发现" + notice;
    if(hasAD) bgcolor='orange';
    notifyAD(info, fgcolor, bgcolor);
    console.warn(info);
    //alert(info);
  }
  else
  {
    var info = "未发现" + notice;
    console.info(info);
  }
  return(hasLink);
}

function main(loaded)
{
  var hasAD = false;
  
  var regexs = makePats(ADS);
  var title = $('#articleTitle');
  var article = $('#articleContent');
  var posts = $('.post-txt');
  var comments = $('.cmtContent, .answerTxt');

  var items = $.merge($.merge(title, article), comments);

  for(idx in regexs)
  {
    var AD = ADS[idx];
    //console.log('Finding ' + AD + ' ...');
    //console.log('Finding ' + regexs[idx] + ' ...');
    hasAD |= findingAD(items, regexs[idx], '广告:'+AD);
  }

  findingLink(items, hasAD);
}

main();
