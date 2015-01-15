// ==UserScript==
// @name        Guokr AD Hiding
// @namespace   NetCharm
// @description Hide Guokr AD in post list & customizer it.
// @include     http://www.guokr.com/group/*
// @version     1.2.0.5
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Guokr_AD_remover.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Guokr_AD_remover.user.js
// @grant       none
// ==/UserScript==

const adkw = [ 
  '爸爸去哪儿', '中国好声音', '爸爸去哪兒', '中國好聲音', '中獎信息',
  '极美茵', '伯来世特', '伯莱狮特', '博来狮特', '叆鲱迪坷', '路易',
  '妙女郎', '酵素梅', '酵素', '总代理',
  '天津妇科', '香港健康医疗', '香港性别鉴定', '性别检测', '医务顾问', '胎儿性别鉴定',
  '咨詢熱線', '咨询热线',
  '新闻牙膏', '新闻牙刷',
  '贝贝游戏', '贝贝银子', '91y', '1908游戏', '747官网'
];

function hideAD(){
  var post_list = $('ul.titles > li.gclear');
  var post = null;
  var title = '';
  post_list.each(function(){
    post = $(this);
    title = post.find('h4 > a.title-link').text();
    $.each(adkw,function(i,n)
    {
      if(n && title.match(n))
      {
        //console.log(title);        
        post.hide();
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

hideAD();
addPostOrderButton();
