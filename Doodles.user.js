// ==UserScript==
// @name        Doodles
// @namespace   NetCharm
// @description Google Dooles auto rename
// @include     https://www.google.com/doodles/*
// @include     http://www.google.com/doodles/*
// @include     http://www.google.com/doodles?*
// @version     1.0.0.1
// @grant       none
// @require     http://code.jquery.com/jquery-latest.js  
// @run-at      document-end
// ==/UserScript==

function changeImageSource()
{
  $('ul#doodle-list > li > a').each(function(){    
    var title = $(this).attr('href').replace('/doodles/', '');
    //if(title.length>0)
    {    
      var img = $(this).find('img');
      img.attr('alt', title);
      img.attr('title', title);
    }
  });
}

function changeImageSource_2015()
{
  $('div.thumb-image > a').each(function(){    
    var title = $(this).attr('href').replace('/doodles/', '');
    //if(title.length>0)
    {    
      var img = $(this).find('img');
      img.attr('alt', title);
      img.attr('title', title);
    }
  });
}

function addChangeButton()
{
  //$replaceMiddleButton = $('<button id="changeTitle">Change Titles</button>').appendTo('form#filter');
  //$replaceMiddleButton.on('click', changeImageSource);
  //$replaceButton = $('<div id="changeTitle" class="goog-inline-block goog-flat-menu-button-caption" role="button" style="-moz-user-select: none;" tabindex="0" aria-haspopup="true">Change Titles</div>').appendTo('form#filter');
  
  //$replaceButton = $('<div class="goog-flat-menu-button jfk-select goog-inline-block" role="button" style="-moz-user-select: none;" tabindex="0" aria-haspopup="true"><div class="goog-inline-block goog-flat-menu-button-caption">Change Titles</div></div>').appendTo('form#filter');
  
  $replaceButton = $('<li id="src-change" style="float:right;"><button class="minimize" role="button" style="-moz-user-select: none;vertical-align:middle;margin-top:-4px;">Change Titles</button></li>').appendTo('#nav-list');
  $replaceButton.on('click', changeImageSource_2015);
}

function main(loaded)
{
  //changeImageSource();
}

//main();
addChangeButton();