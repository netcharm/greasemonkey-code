// ==UserScript==
// @name        hjdict
// @namespace   NetCharm
// @description hjdict for word selection
// @include     http://*
// @version     1.0.0.0
// @grant       none
// ==/UserScript==

(function() {
    hjelm = document.createElement('script');
    hjelm.setAttribute('src', 'http://dict.hjenglish.com/js/dict.js');
    document.body.appendChild(hjelm);
})()
