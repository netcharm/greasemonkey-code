// ==UserScript==
// @name        QQ XuanFeng Link Helper
// @namespace   NetCharm
// @description QQ旋风链接显示及增加复制到剪贴簿按钮
// @include     http://fenxiang.qq.com/x/*
// @include     http://fenxiang.qq.com/upload/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       GM_setClipboard
// @version     1.1.0.15
// ==/UserScript==

var all_video = "";

function linkChange(link)
{
  var src = link.attr("qhref");
  var alt = link.attr("href");
  link.attr("href", src);
  
  all_video += src + "\n";
}

function copyLink()
{
  var src = $(this).attr("data");
  var selected_link = $(this).parent().parent().find("a.download_file");

  //alert(src);
  GM_setClipboard(src);
}

function copy(text)
{
  //alert(text);  
  GM_setClipboard(text);
}

function copyAll()
{
  GM_setClipboard(all_video);
}

function copySelected()
{ 
  var selected_link = '';
  var selected = $('input.file_list_checkbox:checked');

  selected.each( function(){
    var item_tr = $(this.parentNode.parentNode);
    var links = item_tr.find('a.download_file');
    var src = links.attr("href");

    selected_link += src + "\n";
  });
  GM_setClipboard(selected_link);
}

function addButton(node)
{ 
  node.css("width", "auto");
  node.after("<td width='52px'><button name='copylink' title='Copy Link To Clipboard' data='"+src+"'>Copy</button></td>");

  var link = node.find("a.download_file");
  var src = link[0];
  var btn = node.parent().find('button');
  btn.bind('click', function(){ copy(src); });
}

function addListener(node)
{
  var src = node.attr("data");
  node.bind('click', function(){ copy(src); });
}

function fixLayout(node)
{
  node.append("<td width='52px'><button name='copySelected' title='Copy Selected Link(s) To Clipboard'>Copy</button></td>");
  //node.append("<td class='td_d'>&nbsp;</td>");
  node.find("button[name='copySelected']").bind('click', copySelected);
  node.find("td.td_hd_a").css("width", "20px"); 
  node.find("input.check_all").css("margin", "0 0 0 4px");    
  node.find("td[colspan='2']").attr("width", "460px"); 
}

function main(loaded)
{
  all_video = "";
  
  $("a.download_file").each( function(){ linkChange($(this)); } );  

  $('td.td_a').each( function(){ 
    $(this).css("width", "20px"); 
    $(this).find("input.file_list_checkbox").css("margin", "0 0 0 4px");
  });
  
  $('td.td_b').each( function(){ 
    $(this).css("width", "36px"); 
    $(this).find("input.file_list_checkbox").css("margin", "0 0 0 4px");
  });
  
  $("td.td_c").each( function(){ addButton($(this)); } );
  
  $("tr.file_size").each( function(){ fixLayout($(this)); } );
  
  //alert(all_video);
  //GM_setClipboard(all_video);
}

main();
