// ==UserScript==
// @name        Guokr AD Hiding
// @namespace   NetCharm
// @description Hide Guokr AD in post list & customizer it.
// @include     http://www.guokr.com/group/*
// @version     1.2.0.0
// @run-at      document-end
// @grant       none
// ==/UserScript==

const adkw = [ 
  '爸爸去哪儿', '中国好声音', '爸爸去哪兒', '中國好聲音', '中獎信息',
  '贝贝游戏', '91y','1908游戏'
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
