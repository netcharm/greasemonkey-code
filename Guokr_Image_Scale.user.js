// ==UserScript==
// @name        Guokr Image Scale
// @namespace   NetCharm
// @description Change guokr image to large
// @include     http://www.guokr.com/post/*
// @version     1.0.1.0
// ==/UserScript==

function linkCheck(src)
{
  //letsJQuery();
  $.ajax(
  {
    url: src,
    type: 'GET',
    complete: function(response) {
      if(response.status == 200) 
      {
        return true;
      } 
      else 
      {
        return false;
      }
    }
  }); 
}

function changeImageSrc(image)
{
  var alt, src; 

  src = image.src;
  if(src.indexOf('/thumbnail/') > -1)
  {
    alt = src.replace("/thumbnail/", "/image/");
    alt = alt.replace(/\?ssitoken_.*$/g, '');
    alt = alt.replace(/_\d+x\d+\./g, '.');

    image.alt = src;
    image.src = alt;
    image.style.cssText = "max-width: 800px;";
  }
}

function main(loaded)
{
  for(var i = 0; i < window.document.images.length; i++) 
  {   
    changeImageSrc(window.document.images[i]);
  }
}

main();
