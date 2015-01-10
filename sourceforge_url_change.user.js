// ==UserScript==
// @name        sourceforge url change
// @namespace   NetCharm
// @description sourceforge top domain url to projects url
// @include     http://*.sourceforge.net/*
// @version     1.0.0.0
// ==/UserScript==

function changeLink(link)
{
  var alt, src; 

  alt = link.href;
  if(alt != null)
  {
    // http://gcbasic.sourceforge.net/
    
    alt = alt.replace(/http:\/\/(.*?).sourceforge.net\/download/ig, "http://sourceforge.net/projects/$1/download");
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

  

