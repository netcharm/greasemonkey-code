// ==UserScript==
// @name           Xiami.com
// @namespace      NetCharm
// @description    xiami.com helper
// @include        http://www.xiami.com/album/*
// @exclude        http://www.google.com
// ==/UserScript==

function xpath(query) 
{
    return document.evaluate(
              query, 
              document, 
              null,
              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
              null);
}

function clearAlbumTrackLinkText()
{
  var allLinks, thisLink;
  allLinks = xpath('//a[@href]');
  for (var i = 0; i < allLinks.snapshotLength; i++) 
  {
      thisLink = allLinks.snapshotItem(i);
      // do something with thisLink
      if(thisLink.className=="song_play")
      {
        thisLink.childNodes[0].data = '';
      }
      if(thisLink.className=="song_digg")
      {
        thisLink.childNodes[0].data = '';
      }
      if(thisLink.className=="song_toclt")
      {
        thisLink.childNodes[0].data = '';
      }
      if(thisLink.className=="song_download")
      {
        thisLink.childNodes[0].data = '';
      }
      if(thisLink.className=="song_more")
      {
        thisLink.childNodes[0].data = '';
      }      
      if(thisLink.className=="toplayer")
      {
        thisLink.childNodes[0].data = '';
      }
      if(thisLink.parentNode.className=="song_menu_drop")
      {
        thisLink.childNodes[0].data = '';
      }
      if(thisLink.className=="on_tour")
      {
        thisLink.childNodes[0].data = '';
      }
      
  }    
}

function clearAlbumTrackTitle()
{
  var allElements, thisElement;
  allElements = xpath('//*[@title]');
  for (var i = 0; i < allElements.snapshotLength; i++) {
      thisElement = allElements.snapshotItem(i);
      switch (thisElement.nodeName.toUpperCase()) {
          case 'A':
              // this is a link, do something
              break;
          case 'IMG':
              // this is an image, do something else
              break;
          default:
              // do something with other kinds of HTML elements
      }
  }
}

function clearAlbumTrackInfobar()
{
  var allDivs, thisDiv;
  allDivs = xpath('//td[@class="song_hot"]');
  for (var i = 0; i < allDivs.snapshotLength; i++) 
  {
      thisDiv = allDivs.snapshotItem(i);
      // do something with thisDiv
      thisDiv.childNodes[0].data = '';
  }  

  allDivs = xpath('//td[@class="song_hot_bar"]');
  for (var i = 0; i < allDivs.snapshotLength; i++) 
  {
      thisDiv = allDivs.snapshotItem(i);
      // do something with thisDiv
      thisDiv.innerHTML = '';     
  } 
}

function main(loaded)
{
  clearAlbumTrackLinkText();
  clearAlbumTrackInfobar();
}

main();
