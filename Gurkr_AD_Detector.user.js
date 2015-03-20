// ==UserScript==
// @name        Gurkr AD Detector
// @namespace   NetCharm - [https://github.com/netcharm]/[https://netcharm.bitbucket.org/]
// @author      netcharm
// @description Gurkr AD Detector
// @include     http://*.guokr.com/post/*
// @include     http://*.guokr.com/question/*
// @include     http://*.guokr.com/blog/*
// @include     http://*.guokr.com/group/i/*
// @include     http://*.guokr.com/ask/i/*
// @include     http://*.guokr.com/i/*
// @include     http://*.guokr.com/search/*
// @include     
// @include     
// @include     
// @version     1.3.6.36
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Gurkr_AD_Detector.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Gurkr_AD_Detector.user.js
// @grant       none
// ==/UserScript==

var jQueryVersion = $.fn.jquery;
//var jQueryVersion = '1.4.4';
console.log(jQueryVersion);

const ADS = [
  '爸爸去哪儿', '爸爸去哪兒',
  '中国好声音', '中國好聲音',
  '中獎信息', '銀行卡',
  '小姐联系电话', '/..小姐/', '援交', '約炮', '一夜情', '找女人', '約妹妹', 
  '极美茵', '绿瘦', '鸡皮肤', '铁未来',
  '/[伯博蚾秡渤卜箔].{0,6}[来莱梾俫庲婡].{0,6}[世狮轼史是时式試].{0,6}[特忒慝忑]/',
  //'伯来世特', '伯莱狮特', '博来狮特', '蚾梾轼忒', '秡猍狮特', '渤俫史特', '伯庲是特', '卜婡时慝', '伯俫世特', '箔婡式忑',
  '叆鲱迪坷',
  '妙女郎', '酵素梅', '酵素', '总代理', '世纪本草', '芸蓉集', '臻悦', '安普',
  '一小兜', 'yixiaodou.com',
  '天津妇科', '香港健康医疗', '香港性别鉴定', '性别检测', '医务顾问', '胎儿性别鉴定', '代孕', '光美容仪',
  '咨詢熱線', '咨询热线',
  '新闻牙膏', '新闻牙刷',
  '海华伦', '扇贝王',
  '成都装修', '苹果官方',
  //'91y',
  '/代开.{0,10}发票/',
  '/修改.*?成绩/',
  '贝贝游戏', '贝贝银子', '贝贝酒吧', '贝贝棋牌', '1908游戏', '747官网',
  '有动静',
  '微营销', '咔咔寿',
  '微商', '投诉电话', '售后热线', '退款电话', '总代微信', '客服电话', '客服電話',
  '华芝国际', '生命之源'
  //'/((华芝国际){0,1}(生命之源){0,1})/'
];

function isnum(value)
{
  if(jQueryVersion=='1.4.4')
  {
    return(isFinite(value));
  }
  else
  {
    return(isNumber(value));
  }
}

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
      if(!isFinite(idx)) break;
      if(pat.length <= 0)
      {
        pat = words[idx];
      }
      else
      {
        pat = pat + ".{0,5}" + words[idx];
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
}

function highlightAD(word, node, mode, notice)
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
    return '<span style="' + style + '" alt="'+ notice +'" title="'+ notice +'">'+m+'</span>'
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
      highlightAD(regex, this, mode, notice);
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
    if(!isFinite(idx)) break;
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
  return({url:document.location.href, reason:'垃圾广告', access_token:accessToken, invokedata:''});
}

function reportAD()
{
  //console.log('report button clicked')
  var reportParam = getReportParam();
  reportParam.url = reportParam.url.replace('/group', '').replace('/ask', '').replace(/\?page.*?$/ig, '').replace(/(\/i\/\d+\/).*?$/ig, '$1');
  //console.log(reportParam);
  $.post('http://www.guokr.com/apis/censor/report.json', reportParam, function( data ){
    if(data.ok)
    {
      $('#reportAD').text('举报成功');
    }
    else
    {
      $('#reportAD').text('举报失败');
    }
    console.log($('#reportAD').text());
  }, "json");
}

function reportADs(btn)
{
  var reportParam = getReportParam();
  reportParam.url = $(btn).attr('data-url').replace('/group', '').replace('/ask', '');
  //console.log(reportParam);
  $.post('http://www.guokr.com/apis/censor/report.json', reportParam, function( data ){
    if(data.ok)
    {
      $(btn).text('举报成功');
    }
    else
    {
      $('#reportAD').text('举报失败');
    }    
    console.log($(btn).text());
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
      }
      else
      {
        $(btn).text('加入黑名单失败');
      }    
      console.log($(btn).text());
    }, "json");   
  }
}

function addReportButtons()
{
  //console.log('add button');

  if($('#reportAD').length <= 0)
  {
    $reportButton = $('.gh-notice li:first').before('<li><button id="reportAD" style="margin-top:8px;" title="举报主贴">举报</button></li>');
    $('#reportAD').bind('click', reportAD);
  } 
 
  var poster = $('.post-pic a, .author-pic');
  if(poster.length>0)
  {
    poster = $(poster[0]);
    poster.after('</br><button id="reportUSER_poster" class="reportUSERs" title="举报此用户">举报</button>');
    var btnPoster = $('#reportUSER_poster');
    btnPoster.attr('data-url', poster[0].href.replace('/group','').replace('/ask', ''));
    btnPoster.bind('click', function(){reportADs($(this))});
  }

  var avators = $('.pt-pic a, .answer-usr');
  for(idx in avators)
  {
    //if(!$.isNumeric(idx)) break;
    if(!isFinite(idx)) break;

    var user = $(avators[idx]);
    var floor = user.siblings('.cmt-floor');
    if(floor.length>0)
    {
      if(user.length>0)
      {
        floor = $(floor[0]);

        var btnUserID = 'reportUSER_'+ idx;
        floor.after('<br /><button id="'+ btnUserID +'" class="reportUSERs" title="举报此用户">举报</button>');

        var btnUser = $('#'+btnUserID);
        btnUser.attr('data-url', user[0].href.replace('/group','').replace('/ask', ''));
        btnUser.attr('data-ukey', $(user[0]).attr('data-ukey'));
        btnUser.bind('click', function(){reportADs($(this))});
      }
    }
    
    var usr = user.find('.answer-usr-name');
    if(usr.length > 0)
    {
        usr= $(usr[0]);
        var btnUsrID = 'reportUSER_'+ idx;
        usr.after('<button id="'+ btnUsrID +'" class="reportUSERs" title="举报此用户">举报</button>');
        console.log(usr[0]);
        
        var btnUsr = $('#'+btnUsrID);
        btnUsr.attr('data-url', usr[0].href.replace('/group','').replace('/group','').replace('/ask', ''));
        btnUsr.bind('click', function(){reportADs($(this))});
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
    //if(!$.isNumeric(idx)) break;
    if(!isFinite(idx)) break;

    var link = $(reportLinks[idx]);
    var like = link.siblings('a.cmt-do-quote');
    if(like.length>0)
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
    if(answer.length>0)
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

function getSelectionText()
{
  var t = '';
  if(window.getSelection){
    t = window.getSelection();
  }else if(document.getSelection){
    t = document.getSelection();
  }else if(document.selection){
    t = document.selection.createRange().text;
  }
  return t;
}

function getSelectionLink_bug()
{
  var links = [];
  var selObj = window.getSelection();
  var range = selObj.getRangeAt(0);
  if(selObj.rangeCount>0)
  {
    if(range.startContainer.nextSibling)
      link = range.startContainer;
    else 
      link = range.startContainer.parentNode;
    if(range.endContainer.nextSibling)
      end = range.endContainer;
    else
      end = range.endContainer.parentNode;
    while(link)
    {
      //console.log(link, link.nextSibling);
      if(link.nodeName=='A')
        links.push($(link));
      if(link == end) break;
      link = link.nextSibling;
    }
  }
  return links;
}

function getSelectionLink()
{
  var links = [];
  var selObj = window.getSelection();
  var range = selObj.getRangeAt(0);
  if(selObj.rangeCount>0)
  {
    alinks = $('a');
    for(idx in alinks)
    {
      if(!isFinite(idx)) break;
      link = alinks[idx];
      if(link && selObj.containsNode(link, true))
      {
        if(link.parentNode && link.parentNode.className=='title-info') continue;
        if(link.parentNode.parentNode && link.parentNode.parentNode.className=='tab-underline') continue;
        if(link.parentNode.parentNode && link.parentNode.parentNode.className=='post-belong') continue;
        if(link.className=='title-like') continue;
        if(link.parentNode && link.parentNode.className=='tab-title') continue;

        if(window.location.href.startsWith('http://www.guokr.com/post/'))
        {
          links.push(link);
        }
        else
        {
          if(link.className=='post-reply-link') links.push(link);
          if(link.parentNode.parentNode.className=='title-content') links.push(link);
          if(link.parentNode.parentNode.id=='articleContent') links.push(link);
        }
      }
    }
  }
  return links;
}

function batchReport()
{
  var listbox = $('select#batchReportResult');
  var btnReport = $('#batchReportAD');
  var title = $('#batchReportAD').text();
  
  var reportParam = getReportParam();
  var links = getSelectionLink();

  var count = 0;
  var total = links.length;
  listbox.empty();
  for(idx in links)
  {
    if(!isFinite(idx) || idx<0) break;
    var link = $(links[idx]);
    var url = link[0].href;
    var text = link.text();
    reportParam.url = url.replace('/group', '').replace('/ask', '').replace(/\?page.*?$/ig, '').replace(/(\/i\/\d+\/).*?$/ig, '$1');
    $.ajaxSetup({context:link});
    var posting = $.post('http://www.guokr.com/apis/censor/report.json', reportParam, function( data ){
      var link = $(this);
      var url = link[0].href;
      var text = link.text();
      if(data.ok)
      {
        info = '举报成功';
      }
      else
      {
        info = '举报失败';
      }
      //console.log('[' + info + '] ' + text, url);      
      listbox.append(new Option('[' + info + '] ' + text, url));
      count = listbox[0].length;
      btnReport.text(title.replace(/\(\d+\/\d+\)/ig, '('+count+'/'+total+')'))
    }, "json");    
    //count++;
    listbox.stop().delay( 25 );
  }  
  //btnReport.text(title.replace(/\(\d+\)/ig, '('+count+'/'+total+')'))
}

function addBatchReportDox()
{
  if($('.gside').length>0)
  {
    $boxDiv = $('.gside').append('<div id="batchReportBox"><button id="batchReportAD" style="margin-top:8px;" title="批量举报所选链接">批量举报所选链接(0/0)</button></div>');
  }
  else
  {
    $boxDiv = $('.side').append('<div id="batchReportBox"><button id="batchReportAD" style="margin-top:8px;" title="批量举报所选链接">批量举报所选链接(0/0)</button></div>');
  }
  $('#batchReportAD').after('<br/><select id="batchReportResult" name="reportResult" size="15" style="width:99%;"></select>');
  $('#batchReportAD').bind('click', batchReport);
}

function main(loaded)
{
  addBatchReportDox();
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

$.holdReady();
main();
