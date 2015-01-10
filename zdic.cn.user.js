// ==UserScript==
// @name        zdic.cn
// @namespace   NetCharm
// @description zdic.cn for word selection
// @include     http://*
// @version     1.0.0.0
// @grant       none
// ==/UserScript==

(function(){
    var element = document.createElement('script'); 
    element.setAttribute('src',  'http://www.zdic.net/tools/xzsy/'); 
    document.body.appendChild(element);
})();
