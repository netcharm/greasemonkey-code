// ==UserScript==
// @name        Guokr AD Hiding
// @namespace   NetCharm
// @description Hide Guokr AD in post list & customizer it.
// @include     http://*.guokr.com/group/*
// @include     https://*.guokr.com/group/*
// @include     http://*.guokr.com/ask/*
// @include     https://*.guokr.com/ask/*
// @include     http://*.guokr.com/search/*
// @include     https://*.guokr.com/search/*
// @version     1.2.4.29
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Guokr_AD_remover.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Guokr_AD_remover.user.js
// @grant       none
// ==/UserScript==
// @grant       unsafeWindow

const ADS = [
  '爸爸去哪儿', '爸爸去哪兒', '中国好声音', '中國好聲音',
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
  '/又木.{0,16}果冻/', '又木黑糖', '又木减肥', '又木瘦身', '又木精华',
  //'/((华芝国际){0,1}(生命之源){0,1})/',
  '/[0|O|零].{0,4}[5|⒌|５|⑤|㈤|⑸|伍].{0,4}[7|７|⒎|⑦|㈦|⑺|柒].{0,4}[1|１|⒈|①|㈠|⑴|壹].{0,4}[2|２|⒉|②|㈡|⑵|贰].{0,4}[8|８|⒏|⑧|㈧|⑻|捌].{0,4}[2|２|⒉|②|㈡|⑵|贰].{0,4}[9|９|⒐|⑨|㈨|⑼|玖].{0,4}[1|１|⒈|①|㈠|⑴|壹].{0,4}[4|４|⒋|④|㈣|⑷|肆].{0,4}[9|９|⒐|⑨|㈨|⑼|玖].{0,4}[9|９|⒐|⑨|㈨|⑼|玖]/',
  '/q{1,2}.{1,4}\\d{6,16}/','/[W|V|微][X|信|我|:].{0,4}\\d{6,16}/'  
];

var INITED = false;

var jQuery = window.jQuery;

var jQueryVersion = '';

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
        pat = pat + ".{0,8}" + words[idx];
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
  if(results && (results.length>0))
  {
    hasAD = true;
  }
  return(hasAD);
}

function highlightAD(word, node, mode, notice)
{
  var ad_style = 'color:white!important; background-color:red!important;';
  var style = ad_style;

  var gwrap = $(node) || $('div.gwrap');
  //console.log(gwrap.html());
  var html = gwrap.html().replace(/\<\/{0,1}strong\>/gim,'').replace(word, function(m){
    return '<span style="' + style + '" alt="'+ notice +'" title="'+ notice +'">'+m+'</span>';
  });
  //console.log(html);
  gwrap.html( html );
}

var adpats = makePats(ADS);

function hideAD_group(){
  var post_list = $('ul.titles > li.gclear');
  var post = null;
  var title = '';

  post_list.each(function(){
    post = $(this);
    //nsel = 'h4 > a.title-link';
    nsel = 'h4 > a';
    tnode = post.find(nsel);
    if(tnode.length>1)
    {
      tnode = $(post.find(nsel)[1])
    }
    else
    {
      tnode = $(post.find(nsel)[0])
    }
    title = tnode.text();

    $.each(adpats,function(i,n)
    {
      var matchTitle = title.match(n);
      if(n && matchTitle)
      {
        //post.hide();
        console.log('已发现广告词: '+ ADS[i] +', 帖子标题:'+title);
        highlightAD(n, tnode, 'text', '广告帖子标题: '+title+'\n已发现广告词: '+ ADS[i] +'\n已匹配广告词: '+matchTitle.toString());
        return false;
      }
    });
  });
};

function hideAD_ask(){
  var ask_list = $('.ask-list-detials');
  var ask = null;
  var title = '';
  ask_list.each(function(){
    ask = $(this);
    title = ask.find('h2 > a').text();
    $.each(adpats,function(i,n)
    {
      var matchTitle = title.match(n);
      if(n && matchTitle)
      {
        //ask.parent().hide();
        console.log('已发现广告词: '+ ADS[i] +', 帖子标题:'+title);
        highlightAD(n, ask, 'text', '广告帖子标题: '+title+'\n已发现广告词: '+ ADS[i] +'\n已匹配广告词: '+matchTitle.toString());
        return false;
      }
    });
  });
};

function hideAD_search(){
  var search_list = $('.search-page .items-post');
  console.log(search_list);
  search_list.each(function(){
    var search = $(this);
    console.log(search);
    var title = search.find('h2 > a').text();
    var content = $(search.find('p')[0]).text();
    //console.log(title);
    $.each(adpats,function(i,n)
    {    
      var foundTitle = false;
      var foundContent = false;
      var matchTitle = title.match(n);
      var matchContent = content.match(n);
      var matchWords = [];
      if(n && matchTitle)
      {
        foundTitle = true;
        matchWords = $.merge(matchWords, matchTitle);
        console.log('已发现贴子标题中的广告词: '+ ADS[i] +', 帖子标题:'+title+', 匹配词汇:'+matchTitle.toString());
      }
      if(n && matchContent)
      {
        foundContent = true;
        matchWords = $.merge(matchWords, matchContent);
        console.log('已发现正文摘要中的广告词: '+ ADS[i] +', 帖子标题:'+title+', 匹配词汇:'+matchContent.toString());
      }
      if(n && (foundTitle || foundContent))
      {
        highlightAD(n, search, 'text', '广告帖子标题: '+title+'\n已发现广告词: '+ ADS[i] +'\n已匹配广告词: '+matchWords.toString());
        return(false);
      }
    });      
  });
};

function addPostOrderButton(){
  var btnTab = $("p.main-btn-tab");
  console.log(btnTab);
  if(btnTab.length>0)
  {
    $("p.main-btn-tab").css('border-bottom', 'none');

    $('p.main-btn-tab').find('*').addClass("tab-left");
    var url = (window.location.pathname+'/?sort=created').replace('//', '/');
    var $orderBtn = $('<a href="'+url+'" title="按创建时间排序">创建</a>').appendTo('p.main-btn-tab');

    //$('ul.tab').find('*').addClass("tab-left");
    var url = (window.location.pathname+'/?sort=created').replace('//', '/');
    var $orderBtn = $('<li><a href="'+url+'" title="按创建时间排序">按创建排序</a></li>').appendTo('ul.tab');

    //?sort=created
  }
};

function main(loaded)
{
  if(INITED) return;

  addPostOrderButton();
  hideAD_group();
  hideAD_ask();
  hideAD_search();
  
  INITED = true;
  jQueryVersion = $.fn.jquery;  
}

//main();
//console.log('search');