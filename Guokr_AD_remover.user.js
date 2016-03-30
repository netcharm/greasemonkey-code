// ==UserScript==
// @name        Guokr AD Hiding
// @namespace   NetCharm
// @description Hide Guokr AD in post list & customizer it.
// @include     http://*.guokr.com/group/*
// @include     http://*.guokr.com/ask/*
// @version     1.2.3.15
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Guokr_AD_remover.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Guokr_AD_remover.user.js
// @grant       none
// ==/UserScript==

const ADS = [
  '爸爸去哪儿', '爸爸去哪兒',
  '中国好声音', '中國好聲音',
  '中獎信息', '銀行卡', '气功',
  '1040工程', '爱营销', '聚份子', 'jfenz',
  '小姐联系电话', '/..小姐/', '援交', '約炮', '一夜情', '找女人', '約妹妹', 
  '极美茵', '绿瘦', '鸡皮肤', '铁未来', '格列卫',
  '/[伯博蚾秡渤卜箔].{0,6}[来莱梾俫庲婡].{0,6}[世狮轼史是时式試].{0,6}[特忒慝忑]/',
  //'伯来世特', '伯莱狮特', '博来狮特', '蚾梾轼忒', '秡猍狮特', '渤俫史特', '伯庲是特', '卜婡时慝', '伯俫世特', '箔婡式忑',
  '叆鲱迪坷',
  '妙女郎', '酵素梅', '酵素', '总代理', '世纪本草', '芸蓉集', '臻悦', '安普', '玛卡粉', '洛神花', '丰韵霜', '蓓卡露',
  '一小兜', 'yixiaodou.com',
  '天津妇科', '香港健康医疗', '香港性别鉴定', '性别检测', '医务顾问', '胎儿性别鉴定', '代孕', '光美容仪', '验性别', '多兰恩',
  '咨詢熱線', '咨询热线',
  '新闻牙膏', '新闻牙刷', '信用卡現', '信用卡现',
  '海华伦', '扇贝王', '腊山烤鱼', '手工皂', '卉雨','掌灵膏',
  '成都装修', '苹果官方',
  //'91y', '９１y游戏', 
  '/游戏.*?[币|钱|银子]/',
  '/代开.{0,10}发票/',
  '/修改.{0,24}成绩/', '密卷', '教育咨询', '高考答案',
  '贝贝游戏', '贝贝银子', '贝贝酒吧', '贝贝棋牌', '1908游戏', '747官网', '游戏上分',
  '有动静', '成人电影', '成人激情', '帮助打架', '/\[[Q|Ｑ|电].*?联系\]/',
  '微营销', '咔咔寿',
  '微商', '投诉电话', '售后热线', '退款电话', '总代微信', '客服电话', '客服電話', '服务投诉', '服务退款', 
  //0571 2829 1499
  '/[0|O|零].{0,4}[5|⒌|５|⑤|㈤|⑸|伍].{0,4}[7|７|⒎|⑦|㈦|⑺|柒].{0,4}[1|１|⒈|①|㈠|⑴|壹].{0,4}[2|２|⒉|②|㈡|⑵|贰].{0,4}[8|８|⒏|⑧|㈧|⑻|捌].{0,4}[2|２|⒉|②|㈡|⑵|贰].{0,4}[9|９|⒐|⑨|㈨|⑼|玖].{0,4}[1|１|⒈|①|㈠|⑴|壹].{0,4}[4|４|⒋|④|㈣|⑷|肆].{0,4}[9|９|⒐|⑨|㈨|⑼|玖].{0,4}[9|９|⒐|⑨|㈨|⑼|玖]/',
  '华芝国际', '生命之源',
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


function highlightAD(word, node, mode, notice)
{
  var ad_style = 'color:white; background-color:red;';
  var style = ad_style;

  var gwrap = $(node) || $('div.gwrap');
    var html = gwrap.html().replace(word, function(m){
    return '<span style="' + style + '" alt="'+ notice +'" title="'+ notice +'">'+m+'</span>';
  });
  gwrap.html( html );
}

var adpats = makePats(ADS);

function hideAD_group(){
  var post_list = $('ul.titles > li.gclear');
  var post = null;
  var title = '';
  console.log(title);
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
      if(n && title.match(n))
      {
        //post.hide();
        console.log('已发现广告词: '+ ADS[i] +', 帖子标题:'+title);
        highlightAD(n, tnode, 'text', '已发现广告词: '+ ADS[i] +', 帖子标题:'+title);
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
      if(n && title.match(n))
      {
        ask.parent().hide();
        console.log('已发现广告词: '+ ADS[i] +', 帖子标题:'+title);
        highlightAD(n, this, 'text', '已发现广告词: '+ ADS[i] +', 帖子标题:'+title);
        return false;
      }
    });
  });
};

function addPostOrderButton(){
  $("p.main-btn-tab").css('border-bottom', 'none');

  $('p.main-btn-tab').find('*').addClass("tab-left");
  var url = (window.location.pathname+'/?sort=created').replace('//', '/');
  var $orderBtn = $('<a href="'+url+'" title="按创建时间排序">创建</a>').appendTo('p.main-btn-tab');

  //$('ul.tab').find('*').addClass("tab-left");
  var url = (window.location.pathname+'/?sort=created').replace('//', '/');
  var $orderBtn = $('<li><a href="'+url+'" title="按创建时间排序">按创建排序</a></li>').appendTo('ul.tab');

  //?sort=created
};

addPostOrderButton();
hideAD_group();
hideAD_ask();
