// ==UserScript==
// @name        douban Photo Title
// @namespace   NetCharm
// @description Append description to douban Photo Title
// @include     http://*.douban.com/*
// @version     1.2.0.0
// @grant       none
// ==/UserScript==
// @require     http://code.jquery.com/jquery-latest.js

function changeImageSource(folder)
{
  $('a.album_photo, a.photolst_photo').each(function(){    
    var title = $(this).attr('title');
    //if(title.length>0)
    {
      //$(this).attr('title', '');
      $(this).removeAttr('title');
      //$(this).attr('alt', '');
      
      var img = $(this).find('img');
      var target = img.attr('src');
      if(img.attr('src').indexOf('thumb')>=0)
      {
        target = img.attr('src').replace("thumb", folder);
      }
      else if(img.attr('src').indexOf('large')>=0)
      {
        target = img.attr('src').replace("large", folder);     
      }
      else if(img.attr('src').indexOf('photo/photo')>=0)
      {
        target = img.attr('src').replace("photo/photo", 'photo/'+folder);     
      }
      img.attr('alt', title);
      img.attr('title', title);
      img.attr('src', target);
      img.css('max-width', '160px')
      //img.css('max-height', '180px')
    }
  });
}

function changeToThumb()
{
  changeImageSource('thumb');
}

function changeToMiddle()
{
  changeImageSource('photo');
}

function changeToLarge()
{
  changeImageSource('large');
}

function main(loaded)
{

}

function addChangeButton()
{
  $replaceThumbButton = $('<button id="replaceImageToThumb">Thumb</button>').appendTo('.photitle');
  $replaceThumbButton.bind('click', changeToThumb);

  $replaceMiddleButton = $('<button id="replaceImageToMiddle">Middle</button>').appendTo('.photitle');
  $replaceMiddleButton.bind('click', changeToMiddle);

  $replaceLargeButton = $('<button id="replaceImageToLarge">Large</button>').appendTo('.photitle');
  $replaceLargeButton.bind('click', changeToLarge);
}

addChangeButton();
// main();
