// ==UserScript==
// @name        music.163.com cover
// @namespace   NetCharm
// @description music.163.com cover image
// @include     http://music.163.com/*
// @version     1.2.1.9
// @grant       none
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js
// ==/UserScript==
// @resource    fancyCSS http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css
// @include     http://music.163.com/#/album*
// @include     http://music.163.com/#/song*
// @include     http://music.163.com/#/playlist*

function addFancyBox()
{  
  //var fancy_js = document.createElement('script'); 
  //fancy_js.setAttribute('type', 'text/javascript');
  //fancy_js.setAttribute('src', 'http://cdn.netcharm.local/static/fancybox/source/jquery.fancybox.js');
  //fancy_js.setAttribute('src', 'http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js');
  //document.head.appendChild(fancy_js);

  var fancy_css = document.createElement('link'); 
  fancy_css.setAttribute('type', 'text/css');
  fancy_css.setAttribute('rel', 'stylesheet');
  fancy_css.setAttribute('media', 'screen');
  //fancy_css.setAttribute('href', 'http://cdn.netcharm.local/static/fancybox/source/jquery.fancybox.css'); 
  fancy_css.setAttribute('href', 'http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css');
  document.head.appendChild(fancy_css);

  return(false);
}

function popupThumb()
{
  //
  // show large cover thumb when mouse over player cover thumb
  //
  var cover_mini = $('#g_player > div.head > img');
  
  var cover_mini_pos = cover_mini.offset();
  var cover_mini_width = cover_mini.outerWidth();
  var view_width = $(document).width();
  var view_height = $(document).height();

  var thumbTop = view_height - 64;
  //var thumbTopRatio = (thumbTop - (177+10) / 2) / view_height;
  var thumbTopRatio = thumbTop / view_height;

  var thumbLeft = Math.max(0, cover_mini_pos.left + (cover_mini_width / 2) - (177 / 2) - 2.5 );
  var thumbLeftRatio = Math.max(0, (cover_mini_pos.left + (cover_mini_width / 2) ) / view_width);
  
  var cover_thumb = cover_mini.attr('src').replace('34x34', '177x177').replace('34y34', '177y177');
  var thumb_options = {
    closeClick : true, 
    overlayShow : false, 
    helpers : {
      overlay : null,
    }, 
    closeBtn : false,
    topRatio : thumbTopRatio, 
    leftRatio : thumbLeftRatio, 
    //afterShow : function(){
    //  $('.fancybox-wrap').css('top', function(){return (thumbTop-187) + 'px';});
    //  $('.fancybox-wrap').css('left', function(){return (thumbLeft-187/2) + 'px';});
    //},
    padding : [5,5,5,5],
  };
  $.fancybox.open(cover_thumb, thumb_options);
  return(false);
}

function main()
{
  var iframe = $('#g_iframe').contents();

  var cover = $(iframe).find('.u-cover');
  var cover_img = $(cover).find('.j-img');

  //
  // show fancybox with cover source
  //
  var msk = $(iframe).find('span.msk');
  var cover_options = {
    closeClick : true, 
    padding : [5,5,5,5],
  };
  $(msk).on('click', function(){$.fancybox.open(cover_img.attr('data-src'), cover_options);});
  
  //
  // show large cover thumb when mouse over player cover thumb
  //
  var mask = $('#g_player > div.head > .mask');

  $(mask).on('mouseover', function(){popupThumb();});
  $(mask).on('mouseout', function(){$.fancybox.close();});
}

function hideBobo()
{
  items = $('.list li');
  items.each(function(index, value){
    console.log(index+' : '+value);
  });
}

$(document).ready(function(){
  addFancyBox();
  $('iframe').on('load', main);
  hideBobo();
});
