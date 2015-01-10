// ==UserScript==
// @name           360Buy Link Change
// @namespace      NetCharm
// @description    360Buy Link Change
// @include        http://www.360buy.com/*
// @include        http://webmail.mail.163.com/*
// @include        http://twebmail.mail.163.com/*
// @include        http://click.union.360buy.com/*
// @include        http://market.360buy.com/*
// ==/UserScript==

function changeLink(link)
{
  var alt, src; 

  alt = link.href;
  if(alt != null)
  {
    // http://click.union.360buy.com/JdClick/?unionId=150&siteId=616&to=http://www.360buy.com/product/1000564450.html
    // http://click.union.360buy.com/JdClick/?unionId=150&siteid=661&to=http://wop.360buy.com/p3975.html
    // http://csc.360buy.com/edm.ashx?type1=edm&type2=stats&data=B_1752%7C%7C%7Cnetcharm@163.com%7C%7C%7C22&redirect=http://click.union.360buy.com/JdClick/?unionId=150$siteId=687$to=http://jmall.360buy.com/p11253.html
    //alt = alt.replace(/http:\/\/.+click\.union\.360buy\.com\/[Jj]d[Cc]lick\/\?union[Ii]d=\d+&site[Ii]d=\d+&to=/ig, "");
    alt = alt.replace(/http:\/\/.*?click\.union\.360buy\.com\/[Jj]d[Cc]lick\/\?union[Ii]d=\d+[&\$]site[Ii]d=\d+[&\$]to=/ig, "");
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

  

