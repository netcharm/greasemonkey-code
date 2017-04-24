﻿// ==UserScript==
// @name        music.163.com utils
// @namespace   NetCharm
// @description music.163.com cover image & other utils
// @include     http://music.163.com/*
// @include     
// @include    
// @exclude     %exclude%
// @version     1.2.3.19
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/music.163.com_cover.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/music.163.com_cover.user.js
// @require     http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js
// @require     http://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.js
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       none
// ==/UserScript==
// @require     http://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js
// @resource    bs3CSS http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css
// @resource    bs3tCSS http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.min.css
// @require     http://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.js
// @resource    fancyCSS http://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.css
// @require     http://cdn.bootcss.com/bootstrap-markdown/2.10.0/js/bootstrap-markdown.min.js
// @resource    mdCSS http://cdn.bootcss.com/bootstrap-markdown/2.10.0/css/bootstrap-markdown.min.css
// @include     http://music.163.com/#/album*
// @include     http://music.163.com/#/song*
// @include     http://music.163.com/#/playlist*

function addFancyBox()
{  
  var fancy_css = document.createElement('link'); 
  fancy_css.setAttribute('type', 'text/css');
  fancy_css.setAttribute('rel', 'stylesheet');
  fancy_css.setAttribute('media', 'screen');
  //fancy_css.setAttribute('href', 'http://cdn.netcharm.local/static/fancybox/source/jquery.fancybox.css'); 
  fancy_css.setAttribute('href', 'http://cdn.bootcss.com/fancybox/2.1.5/jquery.fancybox.min.css');
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

function destroyClickedElement(event)
{
  document.body.removeChild(event.target);
}

function saveToFile()
{
  //console.log('Saving file...');
  var textToWrite = document.getElementById("markdownValue").value;
  //alert('Saving file...\n' + textToWrite);
  var textFileAsBlob = new Blob(['\ufeff'+textToWrite], {type:'text/plain;charset=utf8'});
  var album_title = getAlbumTitle();
  var fileNameToSaveAs = 'intro.md';
  if( album_title != "" )
    fileNameToSaveAs = 'intro_' + album_title.replace(/[\/\\|"<>\^]/ug, "-") +'.md';
  

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

function getMVid(musicid)
{
  url = 'http://music.163.com/api/song/detail/?id='+musicid+'&ids=['+musicid+']';
  //console.log(url);
  $.ajaxSetup({async: false});
  var mvid = 0;
  var result = $.getJSON(url, function(data){
    mvid = data.songs[0].mvid;
    //console.log(mvid);
    $.ajaxSetup({async: true});
    return(mvid);
  });
  $.ajaxSetup({async: true});
  return(mvid);
}

function getAlbumTitle()
{
  var content = $('iframe#g_iframe.g-iframe').contents();
  var album = content.find('div.cover');
  var thumb = $(album[0]).find('img')[0].src;
  var cover = $(album[0]).find('img')[0];
  var cover_link = $(cover).attr('data-src');

  var title = content.find('div.m-info div.tit h2').text();
  var sub_title = content.find('div.m-info div.subtit').text();
  return(title);
}

function ConvertToMarkdown()
{
  if(window.location.href.startsWith('http://music.163.com/#/playlist?') ||
     window.location.href.startsWith('http://music.163.com/#/album?')) {
  }
  else return(false);

  console.log('Converting album/songlist to markdown...');

  var content = $('iframe#g_iframe.g-iframe').contents();
  var album = content.find('div.cover');
  var thumb = $(album[0]).find('img')[0].src;
  var cover = $(album[0]).find('img')[0];
  var cover_link = $(cover).attr('data-src');

  var title = content.find('div.m-info div.tit h2').text();
  var sub_title = content.find('div.m-info div.subtit').text();

  var intrs = content.find('div.m-info div.topblk p.intr');
  //console.log(intrs);
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
  md += '## ' + md_type + ': [' + title.trim() +'](' + document.location.href.replace('/#/', '/') + ')\n\n';
  if( sub_title.trim().length > 0 )
  {
    md += '> [' + sub_title.trim() + ']{.subtitle}\n\n';
  }

  md += '![Front Cover](./'+ cover_link.replace(/^.*[\\\/]/, '') + ' "'+ cover_link +'"){.cover}\n\n';

  md += '| 信息 | 属性 |\n';
  md += '|:-|:-|\n';
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
      md += album_desc[idx].textContent.trim().replace(/^介绍：/ui, '') + '\n\n';
    });
    //md += '\n'; 
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
    var trk_name = $(songinfo[1]).find('a');
    if(trk_name.length>0)
      trk_name = trk_name[0].textContent.trim();
    else
      trk_name = songinfo[1].textContent.trim();
    var trk_comment = $(songinfo[1]).find('span.s-fc8');
    if(trk_comment.length>0)
      trk_comment = ' ' + trk_comment[0].textContent.trim();
    else 
      trk_comment = '';
    var trk_mv = $(songinfo[1]).find('span.mv');
    //console.log(trk_mv);
    if(trk_mv.length>0) {
      var resid = $(trk_mv[0]).attr('data-res-id');
      var mvid = getMVid(resid);
      trk_mv = ' [[' + trk_mv[0].textContent.trim() + '](http://music.163.com/mv?id=' + mvid + ')]';
      //console.log(trk_mv);
      trk_name = $(songinfo[1]).find('a')[0].textContent.trim();
    }
    else trk_mv = '';
    trk_name = trk_name.replace(/(( )|(&nbsp;)|(\xC2\xC0)|(　))/ugim, ' ');
    //console.log(trk_name);
    var trk_href = $(songinfo[1]).find('a')[0].href;
    var trk_link = '[' + trk_name.replace(/~/ugim, '\\~') + '](' + trk_href + ')' + trk_comment + trk_mv;
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
    //var audio = '<audio id="trk' + trk_id + '" type="audio/mpeg" src="./'+ trk_id + '_' + trk_name + '.mp3" />';
    var audio = '<audio id="trk' + trk_id + '" src="./'+ trk_id + '_' + trk_name + '.mp3" />';
    if(songinfo.length>4) {
      md += '| ' + trk_no + ' ' + audio + ' | ' + trk_link + ' | ' + trk_time + ' | ' + trk_artistall.trim() + ' | ' + trk_album +' |\n';
    } else {
      md += '| ' + trk_no + ' ' + audio + ' | ' + trk_link + ' | ' + trk_time + ' | ' + trk_artistall.trim() + ' |\n';
    }
  });

  md += '\n';
  md += '### MV视频{.mv-section}\n\n';
  md += '<div class="video">\n';
  md += '  <video id="mv02" class="video" controls src="" preload="metadata">\n';
  md += '    <track label="English" kind="subtitles" srclang="en" />\n';
  md += '    <track label="Japanese" kind="subtitles" srclang="jp" />\n';
  md += '    <track label="Chinese" kind="subtitles" srclang="cn" src="" default />\n';
  md += '  </video>\n';
  md += '</div>\n\n';

  //console.log(md);
  //alert(md);
  return(md);
}

function showMarkdown(markdown)
{
  var inline_options = {
    closeClick : false,
    overlayShow : false,
    helpers : {
      overlay : null,
    },
    closeBtn : true,
    padding : [5,5,5,5],
  };
  md_fancy = markdown.replace(/&/ugim, '&amp;').replace(/</ugim, '&lt;').replace(/>/ugim, '&gt;');//.replace(/ /ugim, '&nbsp;');
  $.fancybox.open('<div class="message">' +
    '<div style="float:right;position:absolute;top:16px;right:24px;">' +    
    '<button id="saveMarkdown" type="button" class="btn btn-default"><span class="glyphicon glyphicon-floppy-save"></span>保存</button>' +
    '</div>' +
    //'<textarea id="markdownValue" autofocus readonly cols="150" rows="30" wrap="hard" data-provide="markdown">' +
    '<textarea id="markdownValue" autofocus cols="150" rows="30" wrap="hard" data-provide="markdown">' +
    md_fancy +
    '</textarea>' +
    '</div>', inline_options);
  $('#saveMarkdown').click(saveToFile); 
  //$("#markdownValue").markdown({autofocus:false,savable:true}) 
  return(false);
}

function addToMarkdown()
{
  var contentOp = $('.nav')[0];
  $('<li><a id="btnMarkdown" hidefocus="true" href="javascript:;" title="Convert to Markdown"><em>Markdown</em></a></li>').appendTo(contentOp);

  $('a#btnMarkdown').click(function(){
    var md = ConvertToMarkdown();
    showMarkdown(md);
  });

  var saveButtonStyle = '#saveMarkdown {\n' + 
                        '  display: inline-block;\n' +
                        '  padding: 6px 12px;\n' +
                        '  margin-bottom: 0;\n' +
                        '  font-size: 14px;\n' +
                        '  font-weight: normal;\n' +
                        '  line-height: 1.42857143;\n' +
                        '  text-align: center;\n' +
                        '  white-space: nowrap;\n' +
                        '  vertical-align: middle;\n' +
                        '  touch-action: manipulation;\n' +
                        '  cursor: pointer;\n' +
                        '  -webkit-user-select: none;\n' +
                        '  -moz-user-select: none;\n' +
                        '  -ms-user-select: none;\n' +
                        '  user-select: none;\n' +
                        '  background-image: none;\n' +
                        '  border: 1px solid transparent;\n' +
                        '  border-radius: 4px;\n' +
                        '  color: #333;\n' +
                        '  background-color: #fff;\n' +
                        '  border-color: #ccc;\n' +
                        '}\n\n' +
                        '#saveMarkdown:hover,\n' +
                        '#saveMarkdown:focus,\n' +
                        '#saveMarkdown.focus {\n' +
                        '  outline: 5px auto -webkit-focus-ring-color;\n' +
                        '  outline-offset: -2px;\n' +
                        '  background-color: #77ddff;\n' +
                        '  border-color: #8c8c8c;\n' +               
                        '}\n';
  $('<style type="text/css">\n'+saveButtonStyle+'</style>').appendTo($('head'));
  
  //var md_css = document.createElement('link'); 
  //md_css.setAttribute('type', 'text/css');
  //md_css.setAttribute('rel', 'stylesheet');
  //md_css.setAttribute('media', 'screen');
  //md_css.setAttribute('href', 'http://cdn.bootcss.com/bootstrap-markdown/2.10.0/css/bootstrap-markdown.min.css');
  //document.head.appendChild(md_css);
  //$('<link rel="stylesheet" type="text/css" charset="utf-8" media="screen" href="http://cdn.bootcss.com/bootstrap-markdown/2.10.0/css/bootstrap-markdown.min.css">').appendTo($('head'));
  //$('<script type="text/javascript" src="http://cdn.bootcss.com/bootstrap-markdown/2.10.0/js/bootstrap-markdown.min.js"></script>').appendTo($('head'));  
}

$(document).ready(function(){
  addFancyBox();
  $('iframe').on('load', main);
  hideBobo();
  addToMarkdown();
});
