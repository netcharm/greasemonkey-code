// ==UserScript==
// @name        Block CT-DNS IFrame
// @namespace   NetCharm
// @description Block CT's DNS insert iframe
// @include     http://*.guokr.com/group/posts/*
// @grant       GM_setValue
// @version     1
// ==/UserScript==

function main(loaded)
{
  var url = document.URL;
  //var url = document.documentURI;
  
  if(url.indexOf('?')<0)
  {
    url = url+'?';
    url = url.replace('??', '?');
    
    //document.URL = url;
    window.location.href = url;
  }
}

main();
