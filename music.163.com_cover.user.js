// ==UserScript==
// @name        music.163.com utils
// @namespace   NetCharm
// @description music.163.com cover image & other utils
// @include     http://music.163.com/*
// @include     
// @include    
// @exclude     %exclude%
// @version     1.2.3.15
// @run-at      document-end
// @require     http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js
// @require     http://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.js
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/music.163.com_cover.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/music.163.com_cover.user.js
// @grant       none
// ==/UserScript==
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js
// @resource    fancyCSS http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css
// @include     http://music.163.com/#/album*
// @include     http://music.163.com/#/song*
// @include     http://music.163.com/#/playlist*

function addFancyBox()
{  
  //var fancy_js = document.createElement('script'); 
  //fancy_js.setAttribute('type', 'text/javascript');
  //fancy_js.setAttribute('src', 'http://cdn.netcharm.local/static/fancybox/source/jquery.fancybox.js');
  //fancy_js.setAttribute('src', 'http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js');
  //document.head.appendChild(fancy_js);

  var fancy_css = document.createElement('link'); 
  fancy_css.setAttribute('type', 'text/css');
  fancy_css.setAttribute('rel', 'stylesheet');
  fancy_css.setAttribute('media', 'screen');
  //fancy_css.setAttribute('href', 'http://cdn.netcharm.local/static/fancybox/source/jquery.fancybox.css'); 
  fancy_css.setAttribute('href', 'http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css');
  document.head.appendChild(fancy_css);

  return(false);
}

function popupThumb()
{
  //
  // show large cover thumb when mouse over player cover thumb
  //
  var cover_mini = $('#g_player > div.head > img');
  
  var cover_mini_pos = cover_mini.offset();
  var cover_mini_width = cover_mini.outerWidth();
  var view_width = $(document).width();
  var view_height = $(document).height();

  var thumbTop = view_height - 64;
  //var thumbTopRatio = (thumbTop - (177+10) / 2) / view_height;
  var thumbTopRatio = thumbTop / view_height;

  var thumbLeft = Math.max(0, cover_mini_pos.left + (cover_mini_width / 2) - (177 / 2) - 2.5 );
  var thumbLeftRatio = Math.max(0, (cover_mini_pos.left + (cover_mini_width / 2) ) / view_width);
  
  var cover_thumb = cover_mini.attr('src').replace('34x34', '177x177').replace('34y34', '177y177');
  var thumb_options = {
    closeClick : true, 
    overlayShow : false, 
    helpers : {
      overlay : null,
    }, 
    closeBtn : false,
    topRatio : thumbTopRatio, 
    leftRatio : thumbLeftRatio, 
    //afterShow : function(){
    //  $('.fancybox-wrap').css('top', function(){return (thumbTop-187) + 'px';});
    //  $('.fancybox-wrap').css('left', function(){return (thumbLeft-187/2) + 'px';});
    //},
    padding : [5,5,5,5],
  };
  $.fancybox.open(cover_thumb, thumb_options);
  return(false);
}

function main()
{
  var iframe = $('#g_iframe').contents();

  var cover = $(iframe).find('.u-cover');
  var cover_img = $(cover).find('.j-img');

  //
  // show fancybox with cover source
  //
  var msk = $(iframe).find('span.msk');
  var cover_options = {
    closeClick : true, 
    padding : [5,5,5,5],
  };
  $(msk).on('click', function(){$.fancybox.open(cover_img.attr('data-src'), cover_options);});
  
  //
  // show large cover thumb when mouse over player cover thumb
  //
  //var mask = $('#g_player > div.head > .mask');
  var mask = $('#g_player > div.head');

  $(mask).on('mouseover', function(){popupThumb();});
  $(mask).on('mouseout', function(){$.fancybox.close();});
}

function hideBobo()
{
  items = $('.list li');
  items.each(function(index, value){
    console.log(index+' : '+value);
  });
}

function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

function ConvertToMarkdown()
{
  if(window.location.href.startsWith('http://music.163.com/#/playlist?') ||
     window.location.href.startsWith('http://music.163.com/#/album?')) {
  }
  else return(false);

  console.log('Converting album/songlist to markdown...');

  var content = $('iframe#g_iframe.g-iframe').contents();
  var cover = content.find('div.cover');
  var thumb = $(cover[0]).find('img')[0].src;
  var album = $(cover[0]).find('img')[0];
  var album_link = $(album).attr('data-src');

  var title = content.find('div.m-info div.tit h2').text();
  var sub_title = content.find('div.m-info div.subtit').text();

  var intrs = content.find('div.m-info div.topblk p.intr');
  console.log(intrs);
  artist_link = "";
  if(intrs.length>0)
  {
    artist = $(intrs[0]).find('span')[0];
    artist_name = artist.title.trim();
    artist_href = $(artist).find('a')[0].href.trim();
    artist_link = '[' + artist_name + '](' + artist_href + ')';
  }
  pub_date = "";
  if(intrs.length>1)
    pub_date = intrs[1].lastChild.textContent.trim();
  pub_corp = "";
  if(intrs.length>2)
    pub_corp = intrs[2].lastChild.textContent.trim();
  
  if(intrs.length<=0) {
    artist = content.find('div.m-info div.user span.name > a');
    artist_name = artist[0].textContent.trim();
    artist_href = artist[0].href;
    artist_link = '[' + artist_name + '](' + artist_href + ')';
    
    pub_date = content.find('div.m-info div.user span.time');
    pub_date = pub_date[0].textContent.trim().substr(0, 10);
  }
  
  var album_desc = [];
  if(content.find('div#album-desc-more p').length>0 )
    album_desc = content.find('div#album-desc-more p');
  else if(content.find('div#album-desc-dot p').length>0 )
    album_desc = content.find('div#album-desc-dot p');
  else if(content.find('div.n-albdesc p').length>0)
    album_desc = content.find('div.n-albdesc p');
  else if(content.find('p#album-desc-more').length>0 )
    album_desc = content.find('p#album-desc-more');
  else if(content.find('p#album-desc-dot').length>0 )
    album_desc = content.find('p#album-desc-dot');

  var songlist = content.find('div.n-songtb');

  var songlist_desc = songlist.find('h3');
  var songlist_count = songlist.find('span.sub');
  var songlist_table = songlist.find('table.m-table');
  var songs = $(songlist_table.find('tbody')[0]).find('tr');
  //console.log(songs);
  
  var md_type = '';
  if(window.location.href.startsWith('http://music.163.com/#/playlist?')) {
    md_type = '歌单';
  }
  else if(window.location.href.startsWith('http://music.163.com/#/album?')) {
    md_type = '专辑';  
  }

  var md = '% ' + title.trim() +'\n\n';
  md += '## ' + md_type + ': [' + title.trim() +'](' + document.location.href + ')\n\n';
  if( sub_title.trim().length > 0 )
  {
    md += '> ' + sub_title.trim() + '\n\n';
  }

  md += '<div class="cover">\n';
  md += '![Front Cover](./'+ album_link.replace(/^.*[\\\/]/, '') + ')\n';
  md += '</div>\n\n';

  md += '| 信息 | 属性 |\n';
  md += '|-|-|\n';
  if(intrs.length>0) {
    md += '| 歌手 | ' + artist_link + ' |\n';
    md += '| 发行时间 | ' + pub_date + ' |\n';
    md += '| 发行公司 | ' + pub_corp + ' |\n';
  } else {
    md += '| 创建者 | ' + artist_link + ' |\n';
    md += '| 创建时间 | ' + pub_date + ' |\n';
  }
  md += '\n';

  if(album_desc.length>0) {
    md += '### '+ md_type + '介绍\n\n';
    album_desc.each(function(idx){
      md += album_desc[idx].textContent.trim().replace(/^介绍：/ui, '') + '\n';
    });
    md += '\n';    
  }
  
  md += '### 歌曲列表 [' + songlist_count[0].textContent + ']\n';
  md += '\n';
  if(window.location.href.startsWith('http://music.163.com/#/playlist?')) {
    md += '| 声轨 | 歌曲名 | 时长 | 歌手 | 专辑 |\n';
    md += '| -: | :- | :-: | -: | -: |\n';
  } else {
    md += '| 声轨 | 歌曲名 | 时长 | 歌手 |\n';
    md += '| -: | :- | :-: | -: |\n';  
  }
  songs.each(function(idx){
    //console.log(idx, songs[idx]);
    var songinfo = $(songs[idx]).find('td');
    var trk_no = songinfo[0].textContent.trim();
    //console.log(trk_no);
    var trk_name = songinfo[1].textContent.trim().replace(/(( )|(&nbsp;)|(\xC2\xC0)|(　))/ugim, ' ');
    //console.log(trk_name);
    var trk_href = $(songinfo[1]).find('a')[0].href;
    var trk_link = '[' + trk_name + '](' + trk_href + ')';
    //console.log(trk_href);
    var trk_time = $(songinfo[2]).find('span.u-dur')[0].textContent.trim();
    //console.log(trk_time);
    var trk_artists = $(songinfo[3]).find('span')[0].textContent.trim();
    //console.log(trk_artists);
    var trk_album = "";
    if(songinfo.length>4)
    {
      album = $(songinfo[4]).find('div.text > a')[0];
      album_name = album.textContent.trim().replace(/(( )|(&nbsp;)|(\xC2\xC0)|(　))/ugim, ' ');
      album_href = album.href;
      trk_album = '[' + album_name + '](' + album_href + ')';
    }

    var trk_artistlist = $(songinfo[3]).find('.text > span')[0].childNodes;
    var trk_artistall = '';
    $(trk_artistlist).each(function(id){
      var art = trk_artistlist[id];
      //console.log(id, art);
      if(art.nodeName=='A')
      {
        trk_artistall += '[' + art.textContent.trim() + '](' + art.href + ') ';
      }
      //else if(art.nodeName=='SPAN')
      else
      {
        trk_artistall += art.textContent.trim() + ' ';
      }
    });
    //console.log(trk_artistall);
    var trk_count = parseInt(songlist_count[0].textContent.trim());
    var trk_num = 2;
    if(trk_count<100) trk_num = 2;
    else if(trk_count>=100 && trk_count<1000) trk_num = 3;
    else if(trk_count>=1000 && trk_count<10000) trk_num = 4;
    else trk_num = 5;
    var trk_id = PrefixInteger(trk_no, trk_num);
    var audio = '<audio id="trk' + trk_id + '" type="audio/mpeg" src="./'+ trk_id + '_' + trk_name + '.mp3" />';
    if(songinfo.length>4) {
      md += '| ' + trk_no + ' ' + audio + ' | ' + trk_link + ' | ' + trk_time + ' | ' + trk_artistall.trim() + ' | ' + trk_album +' |\n';
    } else {
      md += '| ' + trk_no + ' ' + audio + ' | ' + trk_link + ' | ' + trk_time + ' | ' + trk_artistall.trim() + ' |\n';
    }
  });

  md += '\n';
  //console.log(md);
  //alert(md);

  var inline_options = {
    closeClick : false,
    overlayShow : false,
    helpers : {
      overlay : null,
    },
    closeBtn : true,
    padding : [5,5,5,5],
  };
  md_fancy = md.replace(/&/ugim, '&amp;').replace(/</ugim, '&lt;').replace(/>/ugim, '&gt;');//.replace(/ /ugim, '&nbsp;');
  $.fancybox.open('<div class="message">' +
    //'<div style="float:right;position:relative;top:16px;right:64px;">' +
    '<div style="float:right;position:absolute;top:16px;right:24px;">' +
    '<button id="saveMarkdown" style="padding:4px;" > Save </button>' +
    '</div>' +
    '<textarea id="markdownValue" autofocus readonly cols="150" rows="30" wrap="hard">' +
    md_fancy +
    '</textarea>' +
    '</div>', inline_options);

  $('#saveMarkdown').click(saveToFile);

  return(false);
}

function destroyClickedElement(event)
{
  document.body.removeChild(event.target);
}

function saveToFile()
{
  //console.log('Saving file...');
  var textToWrite = document.getElementById("markdownValue").value;
  //alert('Saving file...\n' + textToWrite);
  var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
  var fileNameToSaveAs = 'intro.md';

  var downloadLink = document.createElement("a");
  downloadLink.target = "_blank";
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null)
  {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else
  {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }
  downloadLink.click();
}

function addToMarkdown()
{
  var contentOp = $('.nav')[0];
  $('<li><a id="btnMarkdown" hidefocus="true" href="javascript:;" title="Convert to Markdown"><em>Markdown</em></a></li>').appendTo(contentOp);

  $('a#btnMarkdown').click(function(){
    ConvertToMarkdown();
  });
}

$(document).ready(function(){
  addFancyBox();
  $('iframe').on('load', main);
  hideBobo();
  addToMarkdown();
});
