// ==UserScript==
// @name        zdic.cn
// @namespace   NetCharm
// @description zdic.cn for word selection
// @include     http://*
// @include     https://*
// @version     1.0.0.0
// @grant       None
// @run-at      document-end
// ==/UserScript==
// @require     http://www.zdic.net/tools/xzsy/

(function(){
    var element = document.createElement('script'); 
    element.setAttribute('src', 'http://www.zdic.net/tools/xzsy/'); 
    element.setAttribute('type', 'text/javascript'); 
    document.body.appendChild(element);
})();
