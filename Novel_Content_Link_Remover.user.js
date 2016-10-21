// ==UserScript==
// @name        Novel Content Link Remover
// @namespace   NetCharm
// @description Novel Content Link Remover
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @version     1.0.0.23
// @grant       none
// @run-at      document-end
// @include     http://read.qidian.com/BookReaderNew/*
// @include     http://www.123yq.com/read/*
// @include     http://www.123yq.org/read/*
// @include     http://www.23zw.com/olread/*
// @include     http://www.50zw.com/book_*/*.html
// @include     http://www.50zw.la/book_*/*.html
// @include     http://www.6yzw.com/*
// @include     http://www.aszw.com/book/*
// @include     http://www.binhuo.com/html/*
// @include     http://www.cfwx.net/files/article/html/*
// @include     http://www.dhzw.com/book/*
// @include     http://www.fhxs.com/read/*
// @include     http://www.geiliwx.com/GeiLi/*
// @include     http://www.lwxs520.com/books/*
// @include     http://www.mianhuatang.cc/*
// @include     http://www.piaotian.net/html/*
// @include     http://www.qiuwu.net/html/*
// @include     http://www.snwx.com/book/*
// @include     http://www.sqsxs.com/*
// @include     http://www.vodtw.com/Html/Book/*
// @include     http://www.wanshuba.com/Html/*
// @include     http://www.wcxiaoshuo.com/*
// @include     http://www.xiangcunxiaoshuo.com/shu/*
// @include     http://www.xs84.com/*
// @include     http://www.yunlaige.com/html/*
// @include     http://www.zashu.net/*
// @include     http://www.zhuzhudao.com/txt/*
// @include     http://www.rengshu.com/book/* 
// @include     /^http:\/\/www\.daomengren\.com\/\d+_\d+\/.*$/
// @include     /^http:\/\/www\.shumilou\.co\/.*?\/\d+\.html$/
// @include     /^http:\/\/www\.shumilou\.com\/.*?\/\d+\.html$/
// @include     
// @include     
// @include     
// @include     
// @include     
// @include     
// @include     
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Novel_Content_Link_Remover.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Novel_Content_Link_Remover.user.js
// ==/UserScript==

const floats = [
 '[class^="reader_mark"]',
 '[class^="ad336"]',
 '[class^="ad250"]',
 '.show', '.hot',
];
floatAD = floats.join(', ');

const contents = [
  'article[id^="page"]',
  '#chapter_content',
  '[id^="content_"]',
  '#BookText',
  '#htmlContent',
  '#content',
  '#contents',
  '#contentts',
  '#TXT',
  '.zhangjieTXT',
  '.content',
  '.contents',
  '#container',
  '#mynovelreader-content'
];
content = contents.join(', ');


function removeLink(s)
{
  chapter = $(s);
  if(chapter.length>0)
  {
    console.log('Found : ' + s)
  }
  chapter.each(function(i, node)
  {
    console.log('Node  : ', node);

    plist = $(node).find("p");
    plist.each(function(j, pn)
    {
      pn.innerHTML = pn.innerHTML.replace(/<a.*?>.*?<\/a>/gi, "");
      pn.innerHTML = pn.innerHTML.replace(/<a.*?href=".*?".*?>(.*?)<\/a>/gi, "$1");
      pn.innerHTML = pn.innerHTML.replace(/<a.*?>/gi, "");
      pn.innerHTML = pn.innerHTML.replace(/<\a.*?>/gi, "");
      pn.innerHTML = pn.innerHTML.replace(/[‘|’]/gi, "");
      pn.innerHTML = pn.innerHTML.replace(/&nbp;/gim, "");
      pn.innerHTML = pn.innerHTML.replace(/&amp;nbp;/gim, "");
      pn.innerHTML = pn.innerHTML.trim().replace('姑且', '');
    });
      
    if(plist.length<2)
    {
      node.innerHTML = node.innerHTML.replace(/<a.*?>.*?<\/a>/gi, "");
      node.innerHTML = node.innerHTML.replace(/<a.*?href=".*?".*?>(.*?)<\/a>/gi, "$1");
      node.innerHTML = node.innerHTML.replace(/<a.*?>/gi, "");
      node.innerHTML = node.innerHTML.replace(/<\a.*?>/gi, "");
      node.innerHTML = node.innerHTML.replace(/[‘|’]/gi, "");
      node.innerHTML = node.innerHTML.replace(/&nbp;/gim, "");
      node.innerHTML = node.innerHTML.replace(/&amp;nbp;/gim, "");
      node.innerHTML = node.innerHTML.trim().replace('姑且', '');
    }
    
    // remove qidian ad text
    node.innerHTML = node.innerHTML.replace(/<div .*?>热门推荐.*?\/div>/gim, "");
    node.innerHTML = node.innerHTML.replace(/.*?猪.*?猪.*?岛.*?小说.*?[w|W]{3,3}\..*?\.c[o|Ｏ]m/gim, "");
    node.innerHTML = node.innerHTML.replace(/ps：看.*?关注起点中文网公众号.*?，悄悄告诉我吧！/gi, "");
    node.innerHTML = node.innerHTML.replace(/ps：想听到更.*?更多支持！/gi, "");
    node.innerHTML = node.innerHTML.replace(/起点中文网.*?手机用户请到m\.qidian\.com阅读。/gi, "");
    node.innerHTML = node.innerHTML.replace(/&amp;#x770B;&amp;#x672C;.*?#xFF09;/gi, "");
    node.innerHTML = node.innerHTML.replace(/APP软件已经开发完毕.*?APP】/gi, "");
    node.innerHTML = node.innerHTML.replace(/强烈推荐一家.*?超级美味.*?！.*?<br><br>/gim, "");
    node.innerHTML = node.innerHTML.replace(/防盗版章节.*?显示正确的内容。/gim, "");
    node.innerHTML = node.innerHTML.replace(/正版读者若是.*?重新下载。/gim, "");
       
    node.innerHTML = node.innerHTML.replace(/<a.*?href=".*?".*?>(.*?)<\/a>/gi, "$1");
    node.innerHTML = node.innerHTML.replace(/(&nbsp;){2,}/gim, "$1");
    node.innerHTML = node.innerHTML.replace(/&nbp;/gim, "");
    node.innerHTML = node.innerHTML.replace(/&amp;nbp;/gim, "");
    node.innerHTML = node.innerHTML.replace(/(&amp;nbsp)+/gim, " ");
    node.innerHTML = node.innerHTML.replace(/br((&nbsp;)+)/gim, "<br/>$2");
    node.innerHTML = node.innerHTML.replace("br ", "<br/>");
    //node.innerHTML = node.innerHTML.replace(/([ |&nbsp;]br[ |&nbsp;])+/gim, "<br/>");
    //node.innerHTML = node.innerHTML.replace(/(br[ |&nbsp;])+/gim, "<br/>");
    //node.innerHTML = node.innerHTML.replace(/(\\br[ |\&nbsp;])+/gim, "<br/>");
    //node.innerHTML = node.innerHTML.replace(/nbsp; /gim, " ");

    node.innerHTML = node.innerHTML.trim().replace(/[\uE000-\uF8FF,\uFA6E-\uFA6F,\uFADA-\uFAFF,\uFB00-\uFE0F,\uFE1A-\uFE1F,\uFE6C-\uFF00,\uFFBF-\uFFFF,\u{10000}-\u{1D37F},\u{1D800}-\u{1EFFF},\u{1FC00}-\u{1FFFF}]/ugim, '');
    node.innerHTML = node.innerHTML.trim().replace('姑且', '');
}

function removeFloat(s)
{
  console.log(s);
  floating = $(s);
  console.log(floating);
  floating.hide();
  floating.remove();
}

function removeWords()
{

}

function resizeFont(s)
{
  chapter = $(s);
  //chapter.css('font-size', '18px !important');
  //chapter.style('font-size', '18px', 'important');

  var font_family = 'font-family: Monaco,Consolas,"Hiragino Sans GB","Microsoft YaHei",Tahoma,Arial!important;';
  var font_size = 'font-size: 22px !important;font-weight:300 !important;';
  chapter.attr('style', font_family+font_size+'width:95% !important;');
  
  console.log('Font  : Resize to 22px');
}

//function addFontAwesome()
//{
//  var font_css = document.createElement('link');
//  font_css.setAttribute('id', 'FontAwesom');
//  font_css.setAttribute('type', 'text/css');
//  font_css.setAttribute('rel', 'stylesheet');
//  font_css.setAttribute('media', 'screen');
//  font_css.setAttribute('href', 'http://cdn.netcharm.local/static/fonts/font-awesome/css/font-awesome.min.css');
//  //font_css.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
//  document.head.appendChild(font_css);
//
//  return(false);
//}

function decodeUnicode(s)
{
  nodes = $(s);
  console.log(nodes);
  nodes.each(function(i, node){
    $(node).find('p').each(function(i, p){
      console.log(p.textContent);
      p.textContent = unescape(p.textContent.replace(/&#x(.*?);/gim, '%u$1'));
    });
  });  
}

function main()
{
  //$(contents).each(function(i, s)
  //{
  //  removeLink(s);
  //  resizeFont(s);
  //});
  //addFontAwesome();
  removeLink(content);
  decodeUnicode(content);
  resizeFont(content);
  removeFloat(floatAD);
}

main();
