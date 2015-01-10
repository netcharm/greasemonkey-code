// ==UserScript==
// @name        https wikipedia
// @namespace   NetCharm
// @description Change wikipedia to https
// @include     https://www.google.*
// @include     http://*.bing.com/*
// @include     https://*.bing.com/*
// @include     http://*.baidu.com/*
// @include     https://*.baidu.com/*
// @include     http://*.yahoo.com/*
// @include     https://*.yahoo.com/*
// @version     1.0.0.0
// @grant       none
// ==/UserScript==

// http://zh.wikipedia.org

function changeLink(link)
{
  var alt, src; 

  alt = link.href;
  if(alt != null)
  {
    alt = alt.replace(/http:\/\/zh\.wikipedia\.org/ig, "https://zh.wikipedia.org");
    //alert(alt);
    link.href = alt;
  }
}

function main(loaded)
{
  for(var i = 0; i < window.document.links.length; i++) 
  { 
    changeLink(window.document.links[i]);
  }
}

main();