// ==UserScript==
// @name        Gurkr AD Detector
// @namespace   NetCharm - [https://github.com/netcharm]/[https://netcharm.bitbucket.org/]
// @author      netcharm
// @description Gurkr AD Detector
// @include     http://*.guokr.com/post/*
// @include     http://*.guokr.com/question/*
// @include     http://*.guokr.com/blog/*
// @include     http://www.guokr.com/group/i/*
// @include     
// @include     
// @version     1.2.5.22
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Gurkr_AD_Detector.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Gurkr_AD_Detector.user.js
// @grant       none
// ==/UserScript==

var jQueryVersion = $.fn.jquery;

const ADS = [
  '爸爸去哪儿', '爸爸去哪兒',
  '中国好声音', '中國好聲音',
  '中獎信息',
  '小姐联系电话', '/..小姐/',
  '极美茵',
  '/[伯博蚾秡渤卜箔].{0,6}[来莱梾俫庲婡].{0,6}[世狮轼史是时式試].{0,6}[特忒慝忑]/',
  //'伯来世特', '伯莱狮特', '博来狮特', '蚾梾轼忒', '秡猍狮特', '渤俫史特', '伯庲是特', '卜婡时慝', '伯俫世特', '箔婡式忑',
  '叆鲱迪坷',
  '妙女郎', '酵素梅', '酵素', '总代理', '世纪本草', '芸蓉集', '臻悦',
  '一小兜', 'yixiaodou.com',
  '天津妇科', '香港健康医疗', '香港性别鉴定', '性别检测', '医务顾问', '胎儿性别鉴定',
  '咨詢熱線', '咨询热线',
  '新闻牙膏', '新闻牙刷',
  '海华伦', '扇贝王',
  '成都装修', '苹果官方',
  //'91y',
  '贝贝游戏', '贝贝银子', '贝贝酒吧', '贝贝棋牌', '1908游戏', '747官网',
  '有动静',
  '微营销',
  '微商',
  '华芝国际', '生命之源'
  //'/((华芝国际){0,1}(生命之源){0,1})/'
];

function makePat(words)
{
  var pat = "";
  if(words.startsWith('/') && words.endsWith('/'))
  {
    pat = words.substr(1, words.length-2);
  }
  else
  {
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

  if($('#reportAD').length <= 0)
  {
    $reportButton = $('.gh-notice li:first').before('<li><button id="reportAD" style="margin-top:8px;" title="举报主贴">举报</button></li>');
    //$reportButton.bind('click', reportAD);
    $('#reportAD').on('click', reportAD);
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

function getReportParam()
{
  var ca = document.cookie.split(';');
  var accessToken = null;
  for(idx in ca)
  {
    var item = ca[idx];
    var kv = item.split('=');
    var k = kv[0].trim();
    var v = kv[1].trim();
    if(k.endsWith('access_token'))
    {
      accessToken = v;
      break;
    }
  }
  return({url:document.location.href, reason:'垃圾广告', access_token:accessToken});
}

function reportAD()
{
  var reportParam = getReportParam();
  //console.log(reportParam);
  $.post('http://www.guokr.com/apis/censor/report.json', reportParam, function( data ){
    if(data.ok)
    {
      $('#reportAD').text('举报成功');
      console.log($('#reportAD').text());
    }
  }, "json");
}

function reportADs(btn)
{
  var reportParam = getReportParam();
  reportParam.url = $(btn).attr('data-url').replace('/group', '');
  //console.log(reportParam);
  $.post('http://www.guokr.com/apis/censor/report.json', reportParam, function( data ){
    if(data.ok)
    {
      $(btn).text('举报成功');
      console.log($(btn).text());
    }
  }, "json");
  
  var blacklink = $('#addBlacklist');
  if(blacklink.length>0)
  {
    var ukey = $(blacklink[0]).attr('data-ukey')
    var blackParam = {ukey_blocked:ukey, access_token:reportParam.access_token};
    http://www.guokr.com/apis/community/relationship/black.json
    $.post('http://www.guokr.com/apis/community/relationship/black.json', blackParam, function( data ){
      if(data.ok)
      {
        $(btn).text('加入黑名单成功');
        console.log($(btn).text());
      }
    }, "json");   
  }
}

function addReportButtons()
{
  console.log('add button');
  var poster = $('.post-pic a, .author-pic');
  if(poster.length>0)
  {
    poster = $(poster[0]);
    poster.after('</br><button id="reportUSER_poster" class="reportUSERs" title="举报此用户">举报</button>');
    var btnPoster = $('#reportUSER_poster');
    btnPoster.attr('data-url', poster[0].href);
    btnPoster.bind('click', function(){reportADs($(this))});
  }

  var avators = $('.pt-pic a, .answer-usr');
  for(idx in avators)
  {
    var user = $(avators[idx]);
    var floor = user.siblings('.cmt-floor');
    //if(floor.length>0 && $.isNumeric(idx))
    if(floor.length>0 && isFinite(idx))
    {
      if(user.length>0)
      {
        floor = $(floor[0]);

        var btnUserID = 'reportUSER_'+ idx;
        floor.after('<br /><button id="'+ btnUserID +'" class="reportUSERs" title="举报此用户">举报</button>');

        var btnUser = $('#'+btnUserID);
        btnUser.attr('data-url', user[0].href.replace('/group',''));
        btnUser.attr('data-ukey', $(user[0]).attr('data-ukey'));
        btnUser.bind('click', function(){reportADs($(this))});
      }
    }
    
    var usr = user.find('.answer-usr-name');
    if(usr.length > 0 && isFinite(idx))
    {
        usr= $(usr[0]);
        var btnUsrID = 'reportUSER_'+ idx;
        usr.after('<button id="'+ btnUsrID +'" class="reportUSERs" title="举报此用户">举报</button>');
        console.log(usr[0]);
        
        var btnUsr = $('#'+btnUsrID);
        btnUsr.attr('data-url', usr[0].href.replace('/group',''));
        //btnUsr.bind('click', function(){reportADs($(this))});
        btnUsr.css('margin-top', '-6px');
        btnUsr.css('margin-left', '16px');
        btnUsr.css('margin-right', '16px');
    }  
  }

  var reportUser = $('#reportUser');
  if(reportUser.length>0)
  {
    $(reportUser[0]).after('<button id="reportUserDirect" class="reportUSERs" title="举报此用户">举报</button>');

    var btnUserDirect = $('#reportUserDirect');
    var dataUrl = $(reportUser[0]).attr('data-url');
    btnUserDirect.attr('data-url', dataUrl);
    btnUserDirect.bind('click', function(){reportADs($(this))});
  }

  var reportLinks = $('a.red-link.ghide, a.red-link.answer-hover');
  for(idx in reportLinks)
  {
    var link = $(reportLinks[idx]);
    var like = link.siblings('a.cmt-do-quote');
    //if(like.length>0 && $.isNumeric(idx))
    if(like.length>0 && isFinite(idx))
    {
      like = $(like[0]);

      var btnID = 'reportAD_'+ idx;
      like.before('<button id="'+ btnID +'" class="reportADs" title="举报此回帖">举报</button>');

      var btn = $('#'+btnID);
      btn.attr('data-img', link.attr('data-img'));
      btn.attr('data-url', link.attr('data-url'));
      btn.attr('data-title', link.attr('data-title'));
      btn.attr('data-type', link.attr('data-type'));
      btn.attr('data-report', link.attr('data-report'));
      btn.bind('click', function(){reportADs($(this))});
    }
    
    var answer = $(link.parent()).siblings('.gfl')
    //if(like.length>0 && $.isNumeric(idx))
    if(answer.length>0 && isFinite(idx))
    {
      answer = $(answer).find('.cmts-num')[0];
      answer = $(answer);

      var btnID = 'reportAD_'+ idx;
      answer.after('<button id="'+ btnID +'" class="reportADs" title="举报此回帖">举报</button>');

      var btn = $('#'+btnID);
      btn.attr('data-img', link.attr('data-img'));
      btn.attr('data-url', link.attr('data-url'));
      btn.attr('data-title', link.attr('data-title'));
      btn.attr('data-type', link.attr('data-type'));
      btn.attr('data-report', link.attr('data-report'));
      btn.bind('click', function(){reportADs($(this))});
      btn.css('margin-top', '-6px');
      btn.css('margin-left', '16px');
      btn.css('margin-right', '16px');
    }
    
  }
}

function main(loaded)
{
  addReportButtons();

  var hasAD = false;

  var regexs = makePats(ADS);
  var author = $('#articleAuthor');
  var title = $('#articleTitle');
  var article = $('#articleContent');
  //var posts = $('.post-txt');
  var comments = $('.cmtContent, .answerTxt');

  //var items = $.extend({}, author, title, article, comments);
  var items = $.merge($.merge($.merge(author, title), article), comments);

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
