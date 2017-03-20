// ==UserScript==
// @name           HotKey Next Page
// @namespace      scottxp@126.com
// @author         scottxp, netcharm
// @version        1.1.1.13
// @description    按左右键翻页，可以自己针对网站定制xpath规则
// @grant          None
// @include        http://*
// @include        https://*
// ==/UserScript==

const nextStrs = [
          '下一节',
          '下一章',
          '下一篇',
          '后一章',
          '后一篇',
          '下一页',
          '下页',
          '下页 >',
          '后页>',
          '»',
          '››',
          '>',
          '[»]',
          '[››]',
          '[>]',
          'next',
          'Next',
          'NEXT',
          'Next »',
          'next page',
          'Next Page',
          'old',
          'older',
          'earlier',
          '下頁',
          '下一頁',
          '后一页',
          '后一頁',
          '翻下页',
          '翻下頁',
          '后篇',
          '后页',
          '后页 >',
          '后頁',
          '后頁 >',
          '次へ>',
          '下翻',
          '下一个',
          '下一张',
          ' 下一张 >>',
          '下一幅',
          ' 下一章',
          '下一章(快捷键:→)',
          '下一章（快捷键 →）',
          '下一章（快捷键→）',
          '下一页(快捷键:→)',
          '下一段 (快捷键:→)',
          '下一页 [→]',
          '下一页>>',
          '下一章→',
          '下一頁 ›',
          '下一頁 >>',
          '下一頁 >',
          '下一页→',
          '下一幅图片',
          '下一幅图片>>',
          '次のページ →'
];

const lastStrs = [
          '上一节',
          '上一章',          
          '上一篇',
          '前一章',
          '前一篇',
          '上一页',
          '上页',
          '< 上页',
          '<前页',
          '«',
          '‹‹',
          '<',
          '[«]',
          '[‹‹]',
          '[<]',
          'previous',
          '« Previous',
          'PREV',
          'Prev',
          'prev',
          'previous page',
          'Previous Page',
          'new',
          'newer',
          'later',
          '上頁',
          '上一頁',
          '前一页',
          '前一頁',
          '翻上页',
          '翻上頁',
          '前篇',
          '前页',
          '< 前页',
          '前頁',
          '< 前頁',
          '<前へ',
          '上翻',
          '上一个',
          '上一张',
          '<< 上一张',
          '上一幅',
          ' 上一章',
          '(快捷键:←)上一章',
          '（快捷键 ←）上一章',
          '上一章（快捷键←）',
          '(快捷键:←)上一页',
          '(快捷键:←)上一段',
          '[←] 上一页',
          '<<上一页',
          '←上一章',
          '‹ 上一頁',
          '<< 上一頁',
          '< 上一頁',
          '←上一页',
          '上一幅图片',
          '<<上一幅图片',
          '← 前へ'
];

const GeneralXpaths = [
  ["//a[(text()='","')]"],
  ["//a[@id='", "_page']"],
  ["//input[@type='button' and @value='","']"],
  ["//a/span[(text()='","')]"],
  ["//a/font[(text()='","')]"],
  ["//a/span/b[(text()='","')]"],
  ["//a/span/i[(text()='","')]"],
  ["//a/span/font[(text()='","')]"],
  ["//a[contains(text(), '","')]"],
  ["//input[@type='button' and contains(@value, '","')]"],
  ["//a/span[contains(text(), '","')]"],
  ["//a/font[contains(text(), '","')]"],
  ["//a/span/b[contains(text(), '","')]"],
  ["//a/span/i[contains(text(), '","')]"],
  ["//a/span/font[contains(text(), '","')]"],
];

//编辑下面的数组来自定义规则
const SpecialXpaths = [
  {
    //匹配的url
    urls : [
      "http://www.google.com",
      "http://www.google.com.hk",
      "http://www.google.com.tw",
      "http://www.google.co.jp",
      "http://www.google.de"
    ],
    //上一页节点的xpath
    last : "//a[@id='pnprev']",
    //下一页节点的xpath
    next : "//a[@id='pnnext']"
  },
  {
    //匹配的url
    urls : [
      "http://www.guokr.com"
    ],
    //上一页节点的xpath
    last : "//li[@class='page_nav-prev']/a",
    //下一页节点的xpath
    next : "//li[@class='page_nav-next']/a"
  },
  {
    //匹配的url
    urls : [
      "http://simplecd.me"
    ],
    //上一页节点的xpath
    last : "//td[@class='prev']/a",
    //下一页节点的xpath
    next : "//td[@class='next']/a"
  },
  {
    //匹配的url
    urls : [
      "http://g.e-hentai.org/"
    ],
    //上一页节点的xpath
    last : "//a/img[@src='http://ehgt.org/g/p.png']/..",
    //下一页节点的xpath
    next : "//a/img[@src='http://ehgt.org/g/n.png']/.."
  },
  {  
    //匹配的url
    urls : [
      "http://www.54tushu.com/book_library/chaptershow/"
    ],
    //上一页节点的xpath
    last : "//a/img[@src='/Public/Home/Images/bng50.png']/..",
    //下一页节点的xpath
    next : "//a/img[@src='/Public/Home/Images/bng51.png']/.."  
  }
];
const LEFT = 37;
const RIGHT = 39;

function checkKey(e){
  if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey )
        return ;
  if(checkTextArea(e.target))
    return ;
  var node;
  if(e.keyCode == LEFT && (node = getNode(LEFT))){
    click(node);
  }
  if(e.keyCode == RIGHT && (node = getNode(RIGHT))){
    click(node);
  }
}

function checkTextArea(node){
  var name = node.localName.toLowerCase();
  if (name == 'textarea' || name == 'input' || name == 'select')
    return true;
  if(name == 'div' && node.id.toLowerCase().indexOf('textarea')!=-1)
    return true;
  return false;
}

function click(node){
  if(node.onclick)
    node.onclick();
  if(node.click)
    node.click();
  if(node.href)
    location.href = node.href;
}
function xpath(query) {
  return unsafeWindow.document.evaluate(query, document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getNode(keyCode){
  var node = getNodeByGeneralXpath(keyCode)
  if (!node)
    node = getNodeBySpecialXpath(keyCode);
  return node;
}
function getNodeByGeneralXpath(keyCode){
  var strs;
  if(keyCode == LEFT)
    strs = lastStrs;
  else if(keyCode == RIGHT)
    strs = nextStrs;
  else
    return null;
  var x = GeneralXpaths;
  for (var i in x){
    for (var j in strs){
      var query = x[i][0]+strs[j]+x[i][1];
      var nodes = xpath(query);
      if(nodes.snapshotLength > 0)
        return nodes.snapshotItem(0);
    }
  }
  return null;
}
function getNodeBySpecialXpath(keyCode){
  var s = SpecialXpaths;
  for (var i in s){
    if(checkXpathUrl(s[i].urls)){
      if (keyCode == LEFT){
        return xpath(s[i].last).snapshotItem(0);
      }
      else if(keyCode == RIGHT){
        return xpath(s[i].next).snapshotItem(0);
      }
    }
  }
  return null;
}
function checkXpathUrl(urls){
  for(var i in urls)
    if(location.href.indexOf(urls[i]) == 0)
      return true;
  return false;
}

function main()
{
  if (top.location != self.location)
    return;
    
  window.addEventListener("keydown", checkKey, false);
  //unsafeWindow.document.addEventListener('keydown', checkKey, false);
  //document.addEventListener('keydown', checkKey, false);
}
main()
