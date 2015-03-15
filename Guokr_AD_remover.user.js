// ==UserScript==
// @name        Guokr AD Hiding
// @namespace   NetCharm
// @description Hide Guokr AD in post list & customizer it.
// @include     http://*.guokr.com/group/*
// @include     http://*.guokr.com/ask/*
// @version     1.2.2.11
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Guokr_AD_remover.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Guokr_AD_remover.user.js
// @grant       none
// ==/UserScript==

const adkw = [
  '爸爸去哪儿', '中国好声音', '爸爸去哪兒', '中國好聲音', 
  '中獎信息', '小姐联系电话', '..小姐',
  '极美茵', 
  '/[伯博蚾秡渤卜].*?[来莱梾俫庲婡].*?[世狮轼史是时].*?[特忒慝]/',
  '伯来世特', '伯莱狮特', '博来狮特', '叆鲱迪坷', '蚾梾轼忒', '秡猍狮特',
  '妙女郎', '酵素梅', '酵素', '总代理', '世纪本草', '芸蓉集', '臻悦',
  '一小兜', 'yixiaodou.com',
  '天津妇科', '香港健康医疗', '香港性别鉴定', '性别检测', '医务顾问', '胎儿性别鉴定',
  '咨詢熱線', '咨询热线',
  '新闻牙膏', '新闻牙刷',
  '海华伦留学', '代开发票',
  '成都装修', '苹果官方',
  '贝贝游戏', '贝贝银子', '贝贝酒吧', '贝贝棋牌', '91y', '1908游戏', '747官网'
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
        pat = pat + ".{0,8}" + words[idx];
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

var adpats = makePats(adkw);

function hideAD_group(){
  var post_list = $('ul.titles > li.gclear');
  var post = null;
  var title = '';
  post_list.each(function(){
    post = $(this);
    title = post.find('h4 > a.title-link').text();
    $.each(adpats,function(i,n)
    {
      if(n && title.match(n))
      {
        post.hide();
        console.log('已发现广告词: '+ adkw[i] +', 帖子标题:'+title);
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
        console.log('已发现广告词: '+ adkw[i] +', 帖子标题:'+title);
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

hideAD_group();
hideAD_ask();
addPostOrderButton();
