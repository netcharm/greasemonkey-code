// ==UserScript==
// @name        ZhiHu
// @namespace   NetCharm
// @description remove ZhiHu Reg Hint
// @include     http://www.zhihu.com/question/*
// @version     1.0.0.0
// @grant       none
// ==/UserScript==

/*
点击“显示全部”这个链接会自动给localStorage["ExpandLimit::expandCount"]加1，
然后页面判断这个值来确定是否提示登陆，所以这个js的功能就是删除这个localStorage值，
或者也可以给这个值设置为一个很大的负数，
*/

var count = localStorage["ExpandLimit::expandCount"];
//if (count) localStorage.removeItem("ExpandLimit::expandCount");
if (count) localStorage.setItem("ExpandLimit::expandCount", "-9999999999999999999");
