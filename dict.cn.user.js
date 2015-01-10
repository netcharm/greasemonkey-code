// ==UserScript==
// @name        dict.cn
// @namespace   NetCharm
// @description dict.cn for word selection
// @include     http://*
// @version     1.0.0.0
// @grant       none
// ==/UserScript==

(function(){
    var element = document.createElement('script'); 
    element.setAttribute('src',  'http://dict.cn/hc/init.php'); 
    document.body.appendChild(element);
})();
