// ==UserScript==
// @name        tmall.com
// @namespace   NetCharm
// @description T-Mall load pic
// @include     http://www.taobao.com/*
// @include     http://www.tmall.com/*
// @version     1.0.0.0
// @grant       none
// ==/UserScript==

function replaceTmallImageSrc(){
  var s = document.evaluate(
    //'//img[@data-ks-lazyload]',
    '//img[@class="item-pic"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  alert(s.snapshotLength);
  for(var i = 0; i < s.snapshotLength; i++){
    node = s.snapshotItem(i);
    var url = node.getAttribute("data-ks-lazyload");
    if(url)
    {
      alert(url);
      node.src = url;
    }
  }
}

function loadTmallImage()
{
  $('img.item-pic, img.picimg').each(function(){
    var src = $(this).attr("data-ks-lazyload");
    if(src)
    {
      $(this).attr('src', src);
    } 
  });
  

}

//replaceTmallImageSrc();
$(window).ready(function(){
  loadTmallImage();
});