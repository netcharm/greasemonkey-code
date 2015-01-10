// ==UserScript==
// @name        taobao click
// @namespace   NetCharm
// @description change taobao item click link to direct-link
// @include     http://item.taobao.com/item.htm*
// @version     1.0.0.0
// ==/UserScript==

function changeLink(link)
{
  var alt, src; 

  alt = link.href;
  if(alt != null)
  {
    //http://ju.atpanel.com/?url=http://item.taobao.com/item.htm?spm=2013.1.0.119.f47362&scm=1007.77.0.0&id=15062614169&ad_id=&am_id=&cm_id=&pm_id=1500072688f691927a1e
    //alt = alt.replace(/http:\/\/ju\.atpanel\.com\/\?url=/ig, "");
    alt = alt.replace("http://ju.atpanel.com/?url=", "");
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

  

