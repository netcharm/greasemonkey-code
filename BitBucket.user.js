// ==UserScript==
// @name        BitBucket
// @namespace   NetCharm
// @description Bitbucket avatar source fix
// @include     https://bitbucket.org/*
// @version     1.0.0.0
// @grant       none
// @run-at      document-end
// ==/UserScript==

function changeImageSource()
{
  // fix the commit user's avatar location
  $('img[class="avatar avatar32"]').each(function(){
    var img = $(this)
    var src_old = img.attr('src');

    var src_new = unescape(src_old.replace(/secure\.gravatar\.com\/avatar\/.*?\?d=https\%3A\%2F\%2F/, 'i0.wp.com/')).replace('&s=32', '?ssl=1');
    //alert(src_new);

    img.attr('src', src_new);
    img.attr('data', src_old);
  });

  // Get default avatar
  var src_user_avatar = $('body').attr('data-no-avatar-image');
  var user_avatar_inner = $('div.aui-avatar-inner');
  // Add avatar to user avatar container
  $('<img class="avatar" src="'+src_user_avatar+'">').appendTo(user_avatar_inner);

}

function main(loaded)
{
  changeImageSource();
}

main();