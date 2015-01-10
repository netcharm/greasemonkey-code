// ==UserScript==
// @name        My Guokr
// @namespace   NetCharm
// @description Remove Guokr AD & customizer it.
// @include     http://www.guokr.com/group/*
// @version     1.0.0.0
// @grant       none
// ==/UserScript==

var adkw = [ '爸爸去哪儿', '中国好声音', '爸爸去哪兒', '中國好聲音', '中獎信息' ];

function hideAD(){
  var post_list = $('ul.titles > li.gclear');
  var post = null;
  var title = '';
  post_list.each(function(){
    post = $(this);
    title = post.find('h3.titles-txt').text();
    $.each(adkw,function(i,n)
    {
      if(n && title.indexOf(n) != -1)
      {
        //a.closest("li,dd,dl").hide();
        //alert(title);
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

//  $('ul.tab').find('*').addClass("tab-left");
  var url = (window.location.pathname+'/?sort=created').replace('//', '/');
  var $orderBtn = $('<li><a href="'+url+'" title="按创建时间排序">按创建排序</a></li>').appendTo('ul.tab');

  
//?sort=created
};

hideAD();
addPostOrderButton();
