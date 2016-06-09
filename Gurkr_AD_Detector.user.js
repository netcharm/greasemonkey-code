// ==UserScript==
// @name        Guokr AD Detector
// @namespace   NetCharm - [https://github.com/netcharm]/[https://netcharm.bitbucket.org/]
// @author      netcharm
// @description Guokr AD Detector
// @include     http://*.guokr.com/post/*
// @include     https://*.guokr.com/post/*
// @include     http://*.guokr.com/article/*
// @include     https://*.guokr.com/article/*
// @include     http://*.guokr.com/question/*
// @include     https://*.guokr.com/question/*
// @include     http://*.guokr.com/blog/*
// @include     https://*.guokr.com/blog/*
// @include     http://*.guokr.com/group/*
// @include     https://*.guokr.com/group/*
// @include     http://*.guokr.com/search/*
// @include     https://*.guokr.com/search/*
// @include     http://*.guokr.com/post/search/*
// @include     https://*.guokr.com/post/search/*
// @include     http://*.guokr.com/group/i/*
// @include     https://*.guokr.com/group/i/*
// @include     http://*.guokr.com/ask/i/*
// @include     https://*.guokr.com/ask/i/*
// @include     http://*.guokr.com/i/*
// @include     https://*.guokr.com/i/*
// @include     
// @version     1.3.18.121
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Gurkr_AD_Detector.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Gurkr_AD_Detector.user.js
// @grant       none
// ==/UserScript==
// @grant       unsafeWindow

//①②③④⑤⑥⑦⑧⑨⑩
//⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑
//㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩
//⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽
//壹贰叁肆伍陆柒捌玖拾零
//ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ
//ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ
var ADS = [
  '/[0|O|零].{0,4}[5|⒌|５|⑤|㈤|⑸|伍].{0,4}[7|７|⒎|⑦|㈦|⑺|柒].{0,4}[1|１|⒈|①|㈠|⑴|壹].{0,4}[2|２|⒉|②|㈡|⑵|贰].{0,4}[8|８|⒏|⑧|㈧|⑻|捌].{0,4}[2|２|⒉|②|㈡|⑵|贰].{0,4}[9|９|⒐|⑨|㈨|⑼|玖].{0,4}[1|１|⒈|①|㈠|⑴|壹].{0,4}[4|４|⒋|④|㈣|⑷|肆].{0,4}[9|９|⒐|⑨|㈨|⑼|玖].{0,4}[9|９|⒐|⑨|㈨|⑼|玖]/',
  '/q{1,2}.{1,4}\\d{6,16}/','/[W|V|微][X|信|我|:].{0,4}\\d{6,16}/',
  '爸爸去哪儿', '爸爸去哪兒',
  '中国好声音', '中國好聲音',
  '中獎信息', '銀行卡', '气功',
  '1040工程', '爱营销', '聚份子', 'jfenz', 'HTC 10', '小觅手机伴侣',
  '小姐联系电话', '/..小姐/', '援交', '約炮', '一夜情', '找女人', '約妹妹', 
  '极美茵', '绿瘦', '鸡皮肤', '铁未来', '格列卫', '叆鲱迪坷',
  '/[伯博蚾秡渤卜箔].{0,6}[来莱梾俫庲婡].{0,6}[世狮轼史是时式試].{0,6}[特忒慝忑]/',
  //'伯来世特', '伯莱狮特', '博来狮特', '蚾梾轼忒', '秡猍狮特', '渤俫史特', '伯庲是特', '卜婡时慝', '伯俫世特', '箔婡式忑',  
  '妙女郎', '酵素梅', '酵素', '总代理', '世纪本草', '芸蓉集', '臻悦', '安普', '玛卡粉', '洛神花', 
  '丰韵霜', '蓓卡露', '抹药老方', '袁爱荣快瘦汤', '袁医生瘦身汤', '快瘦汤',
  '一小兜', 'yixiaodou.com',
  '天津妇科', '香港健康医疗', '香港性别鉴定', '性别检测', '医务顾问', '胎儿性别鉴定', '代孕', '光美容仪', '验性别', '多兰恩',
  '咨詢熱線', '咨询热线', '伊顿风尚', '网上赌场', '澳门赌钱', '博纳娱乐',
  '新闻牙膏', '新闻牙刷', '信用卡現', '信用卡现',
  '海华伦', '扇贝王', '腊山烤鱼', '手工皂', '卉雨', '掌灵膏', '网赚',
  '成都装修', '苹果官方', '顶我给大家发红包哦', '/[^href="]http:\/\/hongbao\.ilovehongbao\.com\//',
  //'91y', '９１y游戏',  
  '/游戏[币|钱|银子]/', '戏子软件', '营销软件', '爆粉神器', 'app定做', 'app开发',
  '/代开.{0,10}发票/', '假证','做假',
  '/修改.{0,24}成绩/', '密卷', '教育咨询', '高考答案', '/考试.*?必过/', '考试答案', '执业考试答案', '真题包过',
  '贝贝游戏', '贝贝银子', '贝贝酒吧', '贝贝棋牌', '1908游戏', '747官网', '游戏上分',
  '有动静', '成人电影', '成人激情', '帮助打架', '/\[[Q|Ｑ|电].*?联系\]/',
  '微商', '薇伤', '微宝', '微小蜜', '微营销', '咔咔寿', '赢消软件', '营销软件', '爆粉神器',
  '投诉电话', '售后热线', '退款电话', '总代微信', '客服电话', '客服電話', '服务投诉', '服务退款', 'wei xin公众号', '微信公众号',
  //0571 2829 1499
  '风水', '老中医', '排毒', '华芝国际', '生命之源', '赛维片', '水苏糖', '排油丸', '水光针', '酵母原液', '香港疫苗',
  //'/((华芝国际){0,1}(生命之源){0,1})/'
];

var ADS_EXTRA = new Array();
//ADS_EXTRA[ADS_EXTRA.length] = 'QQ ';
//ADS_EXTRA[ADS_EXTRA.length] = '老中医';

var INITED = false;

var jQuery = window.jQuery;  

var jQueryVersion = '';
//$.fn.jquery;
//var jQueryVersion = '1.4.4';
//console.log(jQueryVersion);

var accessToken = getAccessToken();

var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete" || INITED) 
  {
    clearInterval(readyStateCheckInterval);
    if(!INITED)
    {
      //$.holdReady();
      main();
    }
  }
}, 10);

function getExtraADS()
{
  var url = 'https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/guokr_extra_ad_words.json';
  
  if(typeof(jQuery)=='undefined' && typeof($)=='undefined')
  {
    //jQuery未載入
    console.log('jQuery未載入');
  }
  else
  {
    //jQuery已載入
    console.log(url);
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      async: false,
      success : function(data) {
                  console.log(data);
                  if(data.ok)
                  {
                    console.log(data);
                  }
                }
    });
  } 
}

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
  return(new RegExp(pat, 'gim'));
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
  //console.log(results, text, regex);
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
    if(m.startsWith('>http'))
    {
      return '><span style="' + style + '" alt="'+ notice +'" title="'+ notice +'">'+m.substring(1)+'</span>';
    }
    else
    {
      return '<span style="' + style + '" alt="'+ notice +'" title="'+ notice +'">'+m+'</span>'
    }
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
  var link_pat = new RegExp('http://(?!.*?\.guokr\.com).*?$', 'gim');

  items.each(function(){
    var links = $(this).find('a');
    links.each(function(){
      var link = $(this);
      var isExtLink = link[0].href.match(link_pat);
      if(isExtLink && isExtLink.length>0)
      {
        hasLink = true;
        //console.log(link);
        link.css('background-color', bgcolor);
        link.css('color', fgcolor);
        link.attr('style', 'background-color:'+bgcolor+'!important;color:'+fgcolor+'!important;');
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

function findingHideText(items)
{

}

function getAccessToken()
{
  var ca = document.cookie.split(';');
  var token = null;
  var found = false;
  for(idx in ca)
  {
    if(!isFinite(idx)) break;
    var item = ca[idx];
    var kv = item.split('=');
    var k = kv[0].trim();
    var v = kv[1].trim();
    if(k.endsWith('access_token'))
    {
      // http://www.guokr.com/apis/auth/account.json?retrieve_type=is_standalone&oauth_type=renren&access_token=xxx
      var url = "http://www.guokr.com/apis/auth/account.json?retrieve_type=is_standalone&oauth_type=renren&access_token="+v;
      var iv = v;
      if(typeof(jQuery)=='undefined' && typeof($)=='undefined')
      {
        //jQuery未載入
        token = null;
        console.log('jQuery未載入');
      }
      else
      {
        //jQuery已載入       
        $.ajax({
          type: "GET",
          url: url,
          dataType: "json",
          async: false,
          success : function(data) {
                      if(data.ok)
                      {
                        token = iv;
                        found = true;
                      }
                    }
        });
      }
    }
    if(found) break;
  }
  //console.log(token);
  return(token);
}

function getReportParam()
{
  if(accessToken == null) accessToken = getAccessToken();
 
  //console.log({url:document.location.href, reason:'垃圾广告/淫秽色情信息/人身攻击', access_token:accessToken, invokedata:''});
  return({url:document.location.href, reason:'垃圾广告/淫秽色情信息/人身攻击', access_token:accessToken, invokedata:''});
}

function reportAD()
{
  //console.log('report button clicked')
  var reportParam = getReportParam();
  reportParam.url = reportParam.url.replace('/group', '').replace('/ask', '').replace(/(\/i\/\d+\/).*?$/ig, '$1').replace(/([\?|#].*?)$/ig, '');
  //console.log(reportParam);
  btns = $('#reportAD');
  if(btns.length>0)
  {
    btn = btns[0];
    $.post('http://www.guokr.com/apis/censor/report.json', reportParam, function( data ){
      if(data.ok)
      {
        $(btn).text('举报成功');
      }
      else
      {
        $(btn).text('举报失败');
      }
      console.log($('#reportAD').text());
    }, "json");
    
    var ukey = $(btn).attr('data-ukey');
    if(typeof(ukey) == 'undefined')
    {
      var blacklink = $('#addBlacklist');
      if(blacklink.length>0)
      {
        ukey = $(blacklink[0]).attr('data-ukey')
      }
    }
    
    if(typeof(ukey) != 'undefined')
    {
      var blackParam = {ukey_blocked:ukey, access_token:reportParam.access_token};
      //http://www.guokr.com/apis/community/relationship/black.json
      $.post('http://www.guokr.com/apis/community/relationship/black.json', blackParam, function( data ){
        if(data.ok)
        {
          //$(btn).text('加入黑名单成功');
          $(btn).attr('title', '加入黑名单成功');
        }
        else
        {
          //$(btn).text('加入黑名单失败');
          $(btn).attr('title', '加入黑名单失败');
        }    
        console.log($(btn).text());
      }, "json");   
    }  
  }
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
      //$('#reportAD').text('举报失败');
      $(btn).text('举报失败');
    }    
    console.log($(btn).text());
  }, "json");
  
  var ukey = $(btn).attr('data-ukey');
  if(typeof(ukey) == 'undefined')
  {
    var blacklink = $('#addBlacklist');
    if(blacklink.length>0)
    {
      ukey = $(blacklink[0]).attr('data-ukey')
    }
  }
  
  if(typeof(ukey) != 'undefined')
  {
    var blackParam = {ukey_blocked:ukey, access_token:reportParam.access_token};
    //http://www.guokr.com/apis/community/relationship/black.json
    $.post('http://www.guokr.com/apis/community/relationship/black.json', blackParam, function( data ){
      if(data.ok)
      {
        //$(btn).text('加入黑名单成功');
        $(btn).attr('title', '加入黑名单成功');
      }
      else
      {
        //$(btn).text('加入黑名单失败');
        $(btn).attr('title', '加入黑名单失败');
      }    
      console.log($(btn).text());
    }, "json");   
  }
}

var replayIdx = 0;
function addReportButtonAskReply(item)
{
  var btnID = 'reportADAskReply_'+ replayIdx;
  var reportlink = $(item).find('a.red-link');
  if(reportlink.length > 0)
  {
    var link = $(reportlink[0]);
    link.before('<button id="'+ btnID +'" class="reportADs" title="举报此回答">举报</button>');
  
    var btn = $('#'+btnID);
    btn.css('margin-top', '-6px');
    btn.css('margin-left', '16px');
    btn.css('margin-right', '16px');
    btn.attr('data-img', link.attr('data-img'));
    btn.attr('data-url', link.attr('data-url'));
    btn.attr('data-title', link.attr('data-title'));
    btn.attr('data-type', link.attr('data-type'));
    btn.attr('data-report', link.attr('data-report'));
    //btn.bind('click', function(){reportADs(this);});
    jQuery(document).on('click', '#'+btnID, function(){reportADs(this);});

    replayIdx++;
  }
}

function addReportButtonsPoster()
{
  var user = $('.gside-head a');
  if(user.length>0)
  {   
    user = $(user[0]);    
    $('a.gbtn-nobg').after('<button id="reportUSER_poster" class="reportUSERs" style="z-index:999;margin-left:8px;" title="举报此用户">举报</button>');
    var btnUser = $('#reportUSER_poster');
    btnUser.attr('data-url', user[0].href.replace('/group','').replace('/ask', ''));
    ukey = $(user[0]).attr('data-ukey');
    if(typeof(ukey) !== typeof(undefined) && ukey !== false)
    {
      btnUser.attr('data-ukey', ukey);
    }
    btnUser.bind('click', function(){reportADs(this);});
    
    $('#gtopBtns').append('<a class="gbtn-nobg" href="'+user[0].href.replace('.com/i/', '.com/group/i/')+'">统合信息</a>');
  }
 
  var poster = $('.post-pic a, .author-pic');
  var ukey_str = "";
  if(poster.length>0)
  {
    poster = $(poster[0]);
    poster.after('<br /><button id="reportUSER_poster" class="reportUSERs" title="举报此用户">举报</button>');
    var btnPoster = $('#reportUSER_poster');
    btnPoster.attr('data-url', poster[0].href.replace('/group','').replace('/ask', ''));
    ukey = $(poster[0]).attr('data-ukey');
    if(typeof(ukey) !== typeof(undefined) && ukey !== false)
    {
      btnPoster.attr('data-ukey', ukey);
      ukey_str = ' data-ukey="'+ukey+'"';
    }
    btnPoster.bind('click', function(){reportADs(this);});
  }

  if($('#reportAD').length <= 0)
  {
    $reportButton = $('.gh-notice li:first').before('<li><button id="reportAD" style="margin-top:8px;" title="举报主贴"'+ukey_str+'>举报</button></li>');
    $('#reportAD').bind('click', reportAD);
  } 

}

function addReportButtonsUser()
{
  var avators = $('.pt-pic a, .answer-usr');
  for(idx in avators)
  {
    //if(!$.isNumeric(idx)) break;
    if(!isFinite(idx)) break;

    var user = $(avators[idx]);
    var floor = user.siblings('.cmt-floor');
    if(user.length>0)
    {
      if($(user[0]).attr('class') === 'answer-usr')
      {
        var usr = user.find('a.answer-usr-name');
        //console.log(usr);
        if(usr.length > 0)
        {
            usr= $(usr[0]);
            var btnUsrID = 'reportUSER_'+ idx;
            usr.after('<button id="'+ btnUsrID +'" class="reportUSERs" title="举报此用户">举报</button>');
            
            var btnUsr = $('#'+btnUsrID);
            btnUsr.css('margin-top', '-6px');
            btnUsr.css('margin-left', '16px');
            btnUsr.css('margin-right', '16px');
            btnUsr.attr('data-url', usr[0].href.replace('/group','').replace('/group','').replace('/ask', ''));        
            jQuery(document).on('click', '#'+btnUsrID, function(){reportADs(this);});
        }        
      }
      else
      {
        if(floor.length>0)
        {
          floor = $(floor[0]);
        }
        else
        {
          floor = $(user);
        }      
        var btnUserID = 'reportUSER_'+ idx;
        if($('#'+btnUserID).length>0) continue;
        
        floor.after('<br /><button id="'+ btnUserID +'" class="reportUSERs" title="举报此用户">举报</button>');

        var btnUser = $('#'+btnUserID);
        //console.log(user[0]);
        btnUser.attr('data-url', user[0].href.replace('/group','').replace('/ask', ''));
        btnUser.attr('data-ukey', $(user[0]).attr('data-ukey'));
        jQuery(document).on('click', '#'+btnUserID, function(){reportADs(this);});      
      }
    }
  }

  var reportUser = $('#reportUser, .report-user');
  if(reportUser.length>0)
  {
    $(reportUser[0]).after('<button id="reportUserDirect" class="reportUSERs" title="举报此用户">举报</button>');

    var btnUserDirect = $('#reportUserDirect');
    var dataUrl = $(reportUser[0]).attr('data-url');
    btnUserDirect.attr('data-url', dataUrl);
    jQuery(document).on('click', '#reportUserDirect', function(){reportADs(this);});
  }
}

function addReportButtonsLink()
{
  var reportLinks = $('a.red-link, a.report-btn');
  for(idx in reportLinks)
  {
    //if(!$.isNumeric(idx)) break;
    if(!isFinite(idx)) break;

    var link = $(reportLinks[idx]);
    var like = link.siblings('a.cmt-do-quote, a.cmts-t-grey');

    var answer = $(link.parent()).siblings('.gfl')
    if(answer.length>0)
    {
      answer = $(answer).find('.cmts-num')[0];
      answer = $(answer);

      var btnID = 'reportAD_'+ idx;
      answer.after('<button id="'+ btnID +'" class="reportADs" title="举报此回帖">举报</button>');

      var btn = $('#'+btnID);
      btn.css('margin-top', '-6px');
      btn.css('margin-left', '16px');
      btn.css('margin-right', '16px');
      btn.attr('data-img', link.attr('data-img'));
      btn.attr('data-url', link.attr('data-url'));
      btn.attr('data-title', link.attr('data-title'));
      btn.attr('data-type', link.attr('data-type'));
      btn.attr('data-report', link.attr('data-report'));
      //btn.bind('click', function(){reportADs(this);});
      jQuery(document).on('click', '#'+btnID, function(){reportADs(this);});
    }

    like = $(like[0]).next().next();
    if(like.length>0)
    {
      like = $(like[0]);

      var btnID = 'reportAD_'+ idx;
      if($('#'+btnID).length>0) continue;
      
      like.before('<span class="gsplit">|</span><button id="'+ btnID +'" class="reportADs" title="举报此回帖">举报</button>');
      //like.before('<span class="gsplit">|</span><input type="button" id="'+ btnID +'" class="reportADs" title="举报此回帖" value="举报" />');

      var btn = $('#'+btnID);
      btn.attr('data-img', link.attr('data-img'));
      btn.attr('data-url', link.attr('data-url'));
      btn.attr('data-title', link.attr('data-title'));
      btn.attr('data-type', link.attr('data-type'));
      btn.attr('data-report', link.attr('data-report'));
      //btn.on('click', function(){reportADs(this);});
      jQuery('body').on('click', '#'+btnID, function(){reportADs(this);});      
    }
    
  }
}

function addReportButtons()
{
  //console.log('add button');
  var href = document.location.href;
  if(!href.startsWith('http://www.guokr.com/group/') && 
     !href.startsWith('https://www.guokr.com/group/')  )
  {
    addReportButtonsPoster();
  }
  addReportButtonsUser();
  addReportButtonsLink();  
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

function getSelectionLink()
{
  var links = [];
  var selObj = window.getSelection();
  if(selObj.rangeCount>0)
  {
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
          if(link.href.search(/\/group\/\d+\/$/ig)>=0) continue;
          
          if($(link).find('.tags').length==1) continue;
          if(link.className=='tag') continue;
          
          if($(link).parents('.tags, .title-info, .title-like, .tab-title, .tab-underline, .post-belong').length==1) continue;

          if(link.className=='post-reply-link'){ links.push(link); continue;}
          
          if(link.className=='gactive-hd-title'){ links.push(link); continue;}
          
          if($(link).parents('.items-post').length==1){ links.push(link); continue;}
          if($(link).parents('.gellipsis').length==1){ links.push(link); continue;}
          if($(link).parents('.news-main, .blog_list li h4').length==1){ links.push(link); continue;}
          
          if($(link).parents('.ask-list-detials, .post-detail, .post-title, .cmt-content, .cmtContent').length==1){ links.push(link); continue;}
          if($(link).parents('.titles-txt, .title-content, #articleContent').length==1){ links.push(link); continue;}
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
  //console.log(links);
  //return;
  
  var count = 0;
  var total = links.length;
  listbox.empty();
  for(idx in links)
  {
    if(!isFinite(idx) || idx<0) break;
    var link = links[idx];
    var url = link.href;
    if(url.contains('/topic/')) continue;
    reportParam.url = url.replace('/group', '').replace('/ask', '').replace(/\?page.*?$/ig, '').replace(/(\/i\/\d+\/).*?$/ig, '$1');
    var request = $.ajax({
      url: 'http://www.guokr.com/apis/censor/report.json',
      context: link,
      dataType: 'json',
      data: reportParam,
      method: 'POST',
      type: 'POST',
      success: function(data){
        var link = $(this);
        var url = link[0].href;
        var text = link.text();
        var info = '举报成功';
        listbox.append(new Option('[' + info + '] ' + text, url));
        listbox[0].options[listbox[0].options.length-1].setAttribute('title', url);
        count = listbox[0].options.length;
        btnReport.text(title.replace(/\(\d+\/\d+\)/ig, '('+count+'/'+total+')'))    
      },
      error: function( data, textStatus ) {
        var link = $(this);
        var url = link[0].href;
        var text = link.text();
        var info = '举报失败';
        listbox.append(new Option('[' + info + '] ' + text, url));
        listbox[0].options[listbox[0].options.length-1].setAttribute('title', url);
        count = listbox[0].options.length;
        btnReport.text(title.replace(/\(\d+\/\d+\)/ig, '('+count+'/'+total+')'))    
      },
    }); 
    listbox.stop().delay( 25 );
  }  
}

function addBatchReportDox()
{
  var floating = true;
  var boxFloat = '<div id="batchReportBox" style="position:fixed;bottom:10px;width:290px;z-index:999;"><button id="batchReportAD" title="批量举报所选链接">批量举报所选链接(0/0)</button></div><div style="clear:both;"></div>';  
  var boxFixed = '<div id="batchReportBox"><button id="batchReportAD" style="margin-top:8px;" title="批量举报所选链接">批量举报所选链接(0/0)</button></div>';
  var adResult = '<br/><select id="batchReportResult" name="reportResult" size="10" style="width:99%;"></select>';

  if(floating)
  {
    //console.log(floating);
    if($('.gside, .side').length>0)
    {
      $('.gside, .side').append(boxFloat);
    }
    else
    {
      $boxDiv = $('.gmain').append(boxFloat);
      box = $('#batchReportBox');
      box.css('float', 'right');
      box.css('right', '120px');
    }
  }
  else
  {
    if($('.gside').length>0)
    {
      $boxDiv = $('.gside').append(boxFixed);
    }
    else if ($('.side').length>0)
    {
      $boxDiv = $('.side').append(boxFixed);
    }
    else
    {
      $boxDiv = $('.gmain').append(boxFixed);
    }    
  }
  $('#batchReportAD').after(adResult);
  $('#batchReportAD').bind('click', batchReport);
}

function removeBlankline()
{
  $('.gbbcode-content p').each(function(){
    //var node = $(this);
    var node = this;
    node.innerHTML = node.innerHTML.trim().replace(/<br><\/br>/gi, '');
    node.innerHTML = node.innerHTML.trim().replace(/<br>/gi, '');
    node.innerHTML = node.innerHTML.trim().replace(/<br *?(\/){0,1}>/gi, '');
  });
  $('.cmts-list').each(function(){
    //var node = $(this);
    var node = this;
    node.innerHTML = node.innerHTML.trim().replace(/(<p><\/p>){2,}/gi, '<p></p>');
  });
  
  return(false);
}

function fixedGroupTooltip()
{
  $('.side-list-item a.item-name').each(function(){
    var item = $(this);
    item.attr('title', item.text());
    item.css('max-width', '55px');
    item.css('font-size', '10px');
    item.css('font-size', '-3');
  });

  $('.side-list-item .gicon-super').css('margin', 0);
}

function getUKeyByName(uname)
{
  var ukey = false;
  $('span.icon-user').each(function(){
    var user = $(this).next();
    var user_name = user.text();
    if(uname === user_name)
    {
      ukey = user.attr('data-ukey');
      return( false );
    }
  });
  $('a#articleAuthor, a.cmtAuthor, a.answer-usr-name, ul.cmts-list li a').each(function(){
    var user = $(this);
    var user_name = user.text();
    if(uname === user_name)
    {
      ukey = user.attr('data-ukey');
      return( false );
    }
  });
  return(ukey);
}

function detectNameCard()
{
  var ucards = $('div.name_card');
  //console.log(ucards);
  if(ucards.length > 0)
  {
    var ulink = $($(ucards[0]).find('div.card-user_info-name > a')[0]);
    var uname = ulink.text();
    //console.log(uname);
    
    var btnUserID = 'reportUSER_namecard';
    if( $('#'+btnUserID).length == 0 ) 
    {
      var ukey = getUKeyByName(uname);
      if( ukey != false)
      {
        //console.log(ukey, ' ? ', uname);
        var nuts = $('span.card-user_info-nuts');
        nuts.after('&nbsp;<button id="'+ btnUserID +'" title="举报此用户">举报</button>');

        var btnUser = $('#'+btnUserID);
        btnUser.attr('data-url', ulink.attr('href').replace('/group','').replace('/ask', ''));
        btnUser.attr('data-ukey', ukey);
        btnUser.bind('click', function(){reportADs(this);});    
      }
    }
    
    var upic = $('.card-user_pic > img')[0];
    upic.src = upic.src.replace('/w/48/h/48', '/w/160/h/160');
    $(upic).css('width', 160);
    $(upic).css('height', 160);
    
    var upiclink = $('.card-user_pic')[0];
    $(upiclink).css('width', 160);
    $(upiclink).css('height', 160);
    
    $('.card-focus_complete-btn').css('width', 60);
    $('.card-focus_complete-btn').css('margin-left', 4);
    $('.card-focus_complete-btn > span').css('width', 52);

    $('.card-focus-num').css('width', 44);
    $('.card-focus-num').css('margin-left', 2);
    $('.card-focus-num').css('margin-right', 2);
    
    $('.card-focus').css('margin-left', 180);
    $('.card-focus').css('padding-left', 4);
    $('.card-focus').css('width', 240);
    
    $('.card-desp').css('min-height', '3em');
    
    //$(ucards[0]).css('width', $(ucards[0]).css('width')+112);
    $(ucards[0]).attr('style', $(ucards[0]).attr('style').replace('width: 300px;', 'width: 450px;'));
  }
}

function main(loaded)
{
  //if(accessToken==null) return;
  if(INITED) return;
  
  console.log(accessToken);

  //$("body").on("DOMNodeInserted", 'div.name_card', function(e){
  // because guokr using jQuery 1.4.4 at www.guokr.com/i/userid so must using bind to replace on method
  $("body").bind("DOMNodeInserted", 'div.name_card', function(e){
    if ($(e.target).attr('class') === 'name_card')
    {
      console.log('namecard popuped.');
      detectNameCard();
    }
  });
 
  addBatchReportDox();
  addReportButtons();

  var hasAD = false;

  //getExtraADS();
  for(idx in ADS_EXTRA)
  {
    if(!ADS.includes(ADS_EXTRA[idx]))
    {
      ADS[ADS.length] = ADS_EXTRA[idx];
    }
  } 
  var regexs = makePats(ADS);


  var author = $('#articleAuthor');
  var title = $('#articleTitle');
  var article = $('#articleContent');
  //var posts = $('.post-txt');
  var comments = $('.cmtContent, .answerTxt');
  
  var items = $.merge($.merge($.merge(author, title), article), comments);

  $("body").on("DOMNodeInserted", 'ul.cmts-list li', function(e){
      //console.log(e.target);
      addReportButtonAskReply(e.target);
  });

  for(idx in regexs)
  {
    var AD = ADS[idx];
    //console.log('Finding ' + AD + ' ...');
    //console.log('Finding ' + regexs[idx] + ' ...');
    hasAD |= findingAD(items, regexs[idx], '广告:'+AD);
  }

  removeBlankline();
  fixedGroupTooltip();
  
  //console.log(items);
  findingLink(items, hasAD);
  
  findingHideText(items);
  
  INITED = true;
  jQueryVersion = $.fn.jquery;
}

//main();
