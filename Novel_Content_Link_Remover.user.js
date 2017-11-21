// ==UserScript==
// @name        Novel Content Link Remover
// @namespace   NetCharm
// @description Novel Content Link Remover
// @require     //cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @version     1.0.0.26
// @grant       none
// @run-at      document-end
// @updateURL   https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Novel_Content_Link_Remover.user.js
// @downloadURL https://raw.githubusercontent.com/netcharm/greasemonkey-code/master/Novel_Content_Link_Remover.user.js

// @include        http://read.qidian.com/*,*.aspx
// @include        http://read.qidian.com/chapter/*
// @include        http://readbook.qidian.com/bookreader/*,*.html
// @include        http://read.qidian.com/BookReaderOld/*,*.aspx
// @include        http://read.qidian.com/BookReader/*,*.aspx
// @exclude        http://read.qidian.com/BookReader/vol,*,*.aspx
// @include        http://wwwploy.qidian.com/BookReader/*,*.aspx
// @include        http://free.qidian.com/Free/ReadChapter.aspx?*
// @include        http://www.qdmm.com/BookReader/*,*.aspx
// @include        http://www.qdwenxue.com/BookReader/*,*.aspx
// @include        http://chuangshi.qq.com/read/bookreader/*.html*
// @include        http://chuangshi.qq.com/*bk/*/*-r-*.html*
//// @include        http://yunqi.qq.com/*bk/*/*.html
// @include        http://dushu.qq.com/read.html?bid=*
// @include        http://www.jjwxc.net/onebook.php?novelid=*
// @include        http://book.zongheng.com/chapter/*/*.html
// @include        http://www.xxsy.net/books/*/*.html
// @include        http://book.zhulang.com/*/*.html
// @include        http://www.17k.com/chapter/*/*.html
// @include        http://mm.17k.com/chapter/*/*.html
// @include        http://www.kanxia.net/k/*/*/*.html
// @include        http://www.qingdi.com/files/article/html/*/*/*.html
// @include        http://www.xkzw.org/*/*.html
// @include        http://shouda8.com/*/*.html
// @include        http://novel.hongxiu.com/*/*/*.shtml
// @include        http://www.readnovel.com/novel/*.html
// @include        http://www.tianyabook.com/*/*.htm

// @include        http://tieba.baidu.com/p/*
// @include        http://booklink.me/*

// booklink.me
// @include        http://www.shumilou.co/*/*.html
// @include        http://www.shumilou.us/*/*.html
// @include        http://www.shumilou.net/*/*/*.html
// @include        http://www.wcxiaoshuo.com/wcxs-*-*/
// @include        http://www.xiaoshuoz.com/wcxs-*-*/
// @include        http://www.quledu.com/wcxs-*-*/
// @include        http://www.ranwen.cc/*/*/*/*.html
// @include        http://www.ranwen.net/files/article/*/*/*.html
// @include        http://www.64mi.com/*/*/*/*.html
// @include        http://www.bxs.cc/*/*.html*
// @include        http://www.laishuwu.com/html/*/*/*.html
// @include        http://www.binhuo.com/html/*/*/*.html
// @include        http://www.haoqi99.com/haoqi99/*/*/*.shtml
// @include        http://www.shuhe.cc/*/*/
// @include        http://www.dudukan.net/html/*/*/*.html
// @include        http://www.hahawx.com/*/*/*.htm
// @include        http://www.zhuzhudao.com/txt/*/*/
// @include        http://www.zhuzhudao.cc/txt/*/*/
// @include        http://www.dahaomen.net/txt/*/*/
// @include        http://www.tadu.com/book/*/*/
// @include        http://www.aishoucang.com/*/*.html
// @include        http://www.wanshuba.com/Html/*/*/*.html
// @include        http://www.zhuishu.net/files/article/html/*/*/*.html
// @include        http://www.sqsxs.com/*/*/*.html*
// @include        http://www.caiwei.tw/html/*/*.html
// @include        http://www.hotsk.com/Html/Book/*/*/*.shtml
// @include        http://www.92to.com/*/*/*.html
// @include        http://www.qirexs.com/read-*-chapter-*.html
// @include        http://www.du00.com/read/*/*/*.html
// @include        http://www.qishuwu.com/*/*/
// @include        http://www.wandoou.com/book/*/*.html
// @include        http://www.6yzw.org/*/*.html
// @include        http://www.6yzw.com/*/*.html
// @include        http://www.daomengren.com/*/*.html
// @include        http://muyuge.com/*/*.html
// @include        http://www.muyuge.net/*/*.html
// @include        http://bbs.vyming.com/novel-read-*-*.html
// @include        http://www.9imw.com/novel-read-*-*.html
// @include        http://www.23zw.com/olread/*/*/*.html
// @include        http://www.50zw.com/book_*/*.html
// @include        http://www.50zw.la/book_*/*.html
// @include        http://www.xiangcunxiaoshuo.com/shu/*/*.html
// @include        http://www.lwxs520.com/books/*/*/*.html
// @include        http://www.zashu.net/books/*/*/*.html
// @include        http://www.piaotian.net/html/*/*/*.html
// @include        http://www.yunlaige.com/html/*/*/*.html
// @include        http://www.cfwx.net/files/article/html/*/*/*.html
// @include        http://www.qiuwu.net/html/*/*/*.html
// @include        http://www.fengwu.org/html/*/*/*.html
// @include        http://www.xs84.com/*_*/*
// @include        http://www.geiliwx.com/GeiLi/*/*/*.shtml*
// @include        http://www.123yq.com/read/*/*/*.shtml
// @include        http://www.123yq.org/read/*/*/*.shtml
// @include        http://www.dhzw.com/book/*/*/*.html
// @include        http://www.du00.cc/read/*/*/*.html
// @include        http://www.aszw.com/book/*/*/*.html
// @include        http://www.xsbashi.com/*_*/
// @include        http://www.vodtw.com/Html/Book/*/*/*.html
// @include        http://www.fhxs.com/read/*/*/*.shtml
// @include        http://www.snwx.com/book/*/*/*.html

// www.sodu.so
// @include        http://www.jiaodu8.com/*/*/*/*.html
// @include        http://www.fktxt.com/book/*/*.html
// @include        http://www.186s.cn/files/article/html/*/*/*.html
// @include        http://www.6xs.cn/xs/*/*/*.html
// @include        http://www.chaojiqiangbing.com/book/*/*/*.html
// @include        http://book.moka123.com/book/*/*/*.html
// @include        http://www.suimeng.com/files/article/html/*/*/*.html
// @include        http://www.hao662.com/haoshu/*/*/*.html

//www.verydu.net
// @include        http://www.yawen8.com/*/*/*.html
// @include        http://www.tsxs.cc/files/article/html/*/*/*.html
// @include        http://www.ziyuge.com/*/*/*/*/*.html

// 其它网站
// @include        http://book.sfacg.com/Novel/*/*/*/
// @include        http://www.7dsw.com/book/*/*/*.html
// @include        http://www.d586.com/*/*/
// @include        http://www.bookgew.com/Html/Book/*/*/*.htm
// @include        http://read.shuhaha.com/Html/Book/*/*/*.html
// @include        http://www.shuhaha.com/Html/Book/*/*/*.html
// @include        http://www.biqi.me/files/article/html/*/*/*.html
// @include        http://www.ttzw.com/book/*/*.html
// @include        http://www.uukanshu.com/*/*/*.html
// @include        http://www.173ed.com/read/*/*.html
// @include        http://www.a240.com/read/*/*.html
// @include        http://www.zhuishu.com/*/*.html
// @include        http://www.shuangde.cc/*/*.html
// @include        http://www.shenmaxiaoshuo.com/ml-*-*/
// @include        http://www.86kankan.com/read/*/*.html
// @include        http://www.fkzww.com/*/*/*.html
// @include        http://www.151kan.com/*/*/*/*.html
// @include        http://www.bookabc.net/*/*/*.html
// @include        http://www.xshuotxt.com/*/*/*/*.html
// @include        http://www.doulaidu.com/*/*/*.html
// @include        http://www.d586.com/*/*/
// @include        http://www.kanshu.la/book/*/*html
// @include        http://www.wtcxs.com/files/article/html/*/*/*.html
// @include        http://www.5du5.com/book/*/*/*.html
// @include        http://book.kanunu.org/*/*/*.html
// @include        http://www.kanunu8.com/book*/*.html
// @include        http://paitxt.com/*/*/*.html
// @include        http://www.shunong.com/yuedu/*/*/*.html
// @include        http://book.yayacms.com/*/book_*_*.html
// @include        http://www.yqhhy.cc/*/*/*.html
// @include        http://www.nuoqiu.com/static/*/*.html
// @include        http://www.17yue.com/*/*/*.html
// @include        http://dukeba.com/book/*/*/*.shtml
// @include        http://www.wenchangshuyuan.com/html/*/*/*.html
// @include        http://www.pofeng.net/xiaoshuo/*/*.html
// @include        http://www.epzww.com/book/*/*
// @include        http://*.xiaoshuokan.com/haokan/*/*.html
// @include        http://www.wobudu.com/*/*.html
// @include        http://www.qb5.com/xiaoshuo/*/*/*.html
// @include        http://www.23us.com/html/*/*/*.html
// @include        http://www.23wx.com/html/*/*/*.html
// @include        http://www.xs222.com/html/*/*/*.html
// @include        http://www.bixiage.com/*/*/*/*.html
// @include        http://www.ranwenxiaoshuo.com/files/article/html/*/*/*.html
// @include        http://www.ranwenxiaoshuo.com/*/*-*-*.html
// @include        http://www.bjxiaoshuo.com/bjxs-*-*/
// @include        http://www.59shuku.com/xiaoshuo/*/*.htm
// @include        http://www.16kbook.org/Html/Book/*/*/*.shtml
// @include        http://www.dixiaoshuo.com/Html/*/*.html
// @include        http://www.nieshu.com/Book/*/*/*.shtml
// @include        http://www.tlxsw.com/files/article/html/*/*/*.html
// @include        http://www.1kanshu.com/files/article/html/*/*/*.html
// @include        http://www.uutxt.org/book/*/*/*.html
// @include        http://www.5800.cc/*/*/*/*.html
// @include        http://www.biquge.com/*/*.html
// @include        http://www.biquge.la/book/*/*.html
// @include        http://www.qududu.com/book/*/*/*.html
// @include        http://www.free97.cn/book/*/*/*.html
// @include        http://www.122s.com/book/*/*.html
// @include        http://www.123du.net/dudu-*/*/*.html
// @include        http://www.123du.cc/dudu-*/*/*.html
// @include        http://www.123du.net/book/*/*.html
// @include        http://www.hwafa.com/*/*.html
// @include        http://www.qmshu.com/html/*/*/*.html
// @include        http://dlzw.cc/article-*-*.html
// @include        http://www.shushu5.com/read/*/*.html
// @include        http://www.xiaoyanwenxue.com/files/article/html/*/*/*.html
// @include        http://www.3gsc.com.cn/bookcon/*_*_*
// @include        http://www.bj-ibook.cn/book/*/*/*.htm
// @include        http://www.baoliny.com/*/*.html
// @include        http://www.dajiadu.net/files/article/html/*/*/*.html
// @include        http://www.yankuai.com/files/article/html/*/*/*.html
// @include        http://www.docin.net/*/*.html
// @include        http://www.dushuge.net/html/*/*/*.html
// @include        http://www.xunshu.org/xunshu/*/*/*.html
// @include        http://www.moneyren.com/book/*/*/*.shtml
// @include        http://wemaxfilipino.com/*/*/*.html
// @include        http://www.85618892.cn/xiaoshuo/*/*/*.shtml
// @include        http://www.bookba.net/Html/Book/*/*/*.html
// @include        http://www.moksos.com/*/*/*.html
// @include        http://dudu8.net/novel/*/*/*.html
// @include        http://www.dawenxue.net/html/*/*/*.html
// @include        http://www.yanmoxuan.org/book/*/*/*.html
// @include        http://www.duyidu.com/xiaoshuo/*/*/*.html
// @include        http://www.69zw.com/xiaoshuo/*/*/*.html
// @include        http://www.kan7.com/xiaoshuo/*/*/*.html
// @include        http://www.laishu.com/book/*/*/*.shtml
// @include        http://www.bxwx.org/b/*/*/*.html
// @include        http://www.bxzw.org/*/*/*/*.shtml
// @include        http://www.360118.com/html/*/*/*.html
// @include        http://www.59to.com/files/article/xiaoshuo/*/*/*.html
// @include        http://www.dyzww.com/cn/*/*/*.html
// @include        http://www.9wh.net/*/*/*.html
// @include        http://www.luoqiu.net/html/*/*/*.html
// @include        http://www.luoqiu.com/html/*/*/*.html
// @include        http://www.epzw.com/files/article/html/*/*/*.html
// @include        http://www.dashubao.co/book/*/*/*.html
// @include        http://b.faloo.com/p/*/*.html
// @include        http://www.baikv.com/*/*.html
// @include        http://www.66721.com/*/*/*.html
// @include        http://www.3dllc.com/html/*/*/*.html
// @include        http://www.xstxt.com/*/*/
// @include        http://www.zzzcn.com/3z*/*/
// @include        http://www.zzzcn.com/modules/article/App.php*
// @include        http://www.nilongdao.com/book/*/*/*.html
// @include        http://xs321.net/*/*/
// @include        http://read.guanhuaju.com/files/article/html/*/*/*.html
// @include        http://www.book108.com/*/*/*.html
// @include        http://5ycn.com/*/*/*.html
// @include        http://www.zhaoxiaoshuo.com/chapter-*-*-*/
// @include        http://*zbzw.com/*/*.html
// @include        http://manghuangji.cc/*/*.html
// @include        http://www.aiqis.com/*/*.html
// @include        http://www.fftxt.net/book/*/*.html
// @include        http://www.5kwx.com/book/*/*/*.html
// @include        http://www.uuxiaoshuo.net/html/*/*/*.html
// @include        http://www.sanyyo.org/*.html
// @include        http://www.chinaisbn.com/*/*/*.html
// @include        http://www.caihongwenxue.com/Html/Book/*/*/*.html
// @include        http://www.shushuw.cn/shu/*/*.html
// @include        http://www.78xs.com/article/*/*/*.shtml
// @include        http://www.miaobige.com/*/*/*.html
// @include        http://www.woaixiaoshuo.com/xiaoshuo/*/*/*.html
// @include        http://www.ty2016.com/book/*/*.html
// @include        http://wx.ty2016.com/*/*/*.html
// @include        http://www.my285.com/*/*/*/*.htm
// @include        http://www.5858xs.com/html/*/*/*.html
// @include        http://book.58xs.com/html/*/*/*.html
// @include        http://book.mihua.net/*/*/*/*.html
// @include        http://www.hjwzw.com/Book/Read/*,*
// @include        http://www.hjwzw.com/Book/Read/*_*
// @include        http://www.365essay.com/*/*.htm
// @include        http://www.gengxin8.com/read/*/*.html
// @include        http://www.365xs.org/books/*/*/*.html
// @include        http://www.wuruo.com/files/article/html/*/*/*.html
// @include        http://www.remenxs.com/du_*/*/
// @include        http://*.8shuw.net/book/*/*.html
// @include        http://www.pashuw.com/BookReader/*/*.html
// @include        http://read.shanwen.com/html/*/*/*.html
// @include        http://www.qqxs.cc/xs/*/*/*.html
// @include        http://www.69shu.com/txt/*/*
// @include        http://www.e8zw.com/book/*/*/*.html
// @include        http://www.biquge.tw/*_*/*.html
// @include        http://www.8535.org/*/*/*.html*
// @include        http://www.yfzww.com/books/*/*/*.htm
// @include        http://www.lewen8.com/lw*/*.html
// @include        http://www.pinwenba.com/read/*/*.html
// @include        http://down1.qidian.com/bookall/*.htm*
// @include        http://www.77nt.com/*/*.html
// @include        http://www.quanbenba.com/yuedu/*/*/*.html
// @include        http://*.sto.cc/*-*/
// @include        http://www.151xs.com/wuxiazuoxiong/*/chapter/*/
// @include        http://www.qududu.net/book/*/*/*.html
// @include        http://www.hbooker.com/chapter/book_chapter_detail?chapter_id=*

// Mine
// @include        http://www.motie.com/book/*
// @include        http://www.rxxsww.com/rexue/*
// @include        http://www.33yq.com/read/*
// @include        http://www.bqg5200.com/xiaoshuo/*
// @include        http://www.fkzww.com/Html/Book/*
// @include        http://www.luoqiu.com/read/*
// @include        http://www.novel8.net/novel/*
// @include        http://www.166xs.com/xiaoshuo/*
// @include        http://www.aszw8.com/book/*
// @include        http://www.lwxiaoshuo.com/*
// @include        http://www.ltsw888.com/book_*
// @include        http://www.biqugezw.com/*
// @include        http://www.qu.la/book/*
// @include        http://www.hbooker.com/chapter/book_chapter_detail/*
// @include        http://book.qq.com/read.html*
// @include        http://www.23zw.me/olread/*
// @include        http://www.piaotian.com/html/*
// @include        http://www.wenxue8.org/html/*
// @include        http://www.dhzw.org/book/*
// @include        http://vipreader.qidian.com/chapter/*
// @include        http://www.junshishu.com/Book*
// @include        http://www.snwx8.com/book/*
// @include        http://www.ranwen.org/files/article/*
// @include        http://www.aszw.org/book/*
// @include        http://www.ranwena.com/files/article/*
// @include        http://www.67shu.com/*
// @include        http://www.aiyousheng.com/*/*.html
// @include        https://www.aiyousheng.com/*/*.html
// @include        http://www.shumil.com/*/*.html
// @include        http://www.xs52.com/xiaoshuo/*
// @include        http://www.mianhuatang520.com/xs/*
// @include        http://www.ggdown.com/*/*/*.html
// @include        http://www.shudaizi.org/book/*/*.html
// @include        http://tw.zhsxs.com/zhsread/*.html
// @include        http://www.zhsxs.com/zhsread/*.html


// Others
// @exclude        */List.htm
// @exclude        */List.html
// @exclude        */List.shtml
// @exclude        */index.htm
// @exclude        */index.html
// @exclude        */index.shtml
// @exclude        */Default.htm
// @exclude        */Default.html
// @exclude        */Default.shtml


// ==/UserScript==
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js

const floats = [
    '[class^="reader_mark"]',
    '[class^="ad336"]',
    '[class^="ad250"]',
    '.show', '.hot',
];
floatAD = floats.join(', ');

const contents = [
    'article[id^="page"]',
    '#chapter_content',
    '[id^="content_"]',
    '#BookText',
    '#htmlContent',
    '#content',
    '#contents',
    '#contentts',
    '#TXT',
    '.zhangjieTXT',
    '.content',
    '.contents',
    '#container',
    '#mynovelreader-content'
];
content = contents.join(', ');

function removeLink(s) {
    chapter = $(s);

    if (chapter.length > 0) {
        //console.log('Found : ' + s)
    }

    chapter.each(function(i, node) {
        //console.log('Node  : ', node);
        if($(node).hasClass('replaced')) {
            return;
        }
        
        if($(node).hasClass('chapter-footer-nav')) {
            console.log('Found chapter-footer');
            return;
        }
        
        if($(node).children().length < 0)
        {
            //console.log('Found Div', node.innerHTML);
            node.innerHTML = node.innerHTML.replace(/&amp;/gim, '&');
            node.innerHTML = node.innerHTML.replace(/&lt;/gim, '<');
            node.innerHTML = node.innerHTML.replace(/&gt;/gim, '>');
            node.innerHTML = node.innerHTML.replace(/\*(.+?)\*/gim, '$1');
            node.innerHTML = node.innerHTML.replace('</>', '');
            node.innerHTML = node.innerHTML.replace(/<a.*?href=".*?".*?>(.*?)<\/a>/gi, "$1");
        }

        plist = $(node).find("p");
        plist.each(function(j, pn) {
            pn.innerHTML = pn.innerHTML.replace('*', '');
            pn.innerHTML = pn.innerHTML.replace(/<a.*?>.*?<\/a>/gi, "");
            pn.innerHTML = pn.innerHTML.replace(/<a.*?href=".*?".*?>(.*?)<\/a>/gi, "$1");
            pn.innerHTML = pn.innerHTML.replace(/<a.*?>/gi, "");
            pn.innerHTML = pn.innerHTML.replace(/<\a.*?>/gi, "");
            pn.innerHTML = pn.innerHTML.replace(/[‘|’]/gi, "");
            pn.innerHTML = pn.innerHTML.replace(/&amp;/gim, '&');
            pn.innerHTML = pn.innerHTML.replace(/(&nbsp;)/gim, " ");
            pn.innerHTML = pn.innerHTML.replace(/&nbp;/gim, "");
            pn.innerHTML = pn.innerHTML.replace(/&amp;nbp;/gim, "");
            pn.innerHTML = pn.innerHTML.replace(/((br)|(&nbsp;)|( *; )|(\/ )|( +;))+/gim, "");
            pn.innerHTML = pn.innerHTML.trim().replace('姑且', '');
            pn.innerHTML = pn.innerHTML.trim().replace('\\r', '');
            
            pn.innerHTML = pn.innerHTML.trim().replace('&nbsp;', ' ');
            pn.innerHTML = pn.innerHTML.trim().replace(/[\/;]/gim, ' ');
            //console.log(pn.innerHTML);
        });

        node.innerHTML = node.innerHTML.replace('*', '');
        node.innerHTML = node.innerHTML.replace(/&amp;/gim, '&');
        node.innerHTML = node.innerHTML.replace(/&lt;/gim, '<');
        node.innerHTML = node.innerHTML.replace(/&gt;/gim, '>');
        node.innerHTML = node.innerHTML.replace(/\*(.+?)\*/gim, '$1');
        node.innerHTML = node.innerHTML.replace('</>', '');
        node.innerHTML = node.innerHTML.trim().replace('&nbsp;', ' ');

        // remove qidian ad text
        node.innerHTML = node.innerHTML.replace(/<div .*?>热门推荐.*?\/div>/gim, "");
        node.innerHTML = node.innerHTML.replace(/.*?猪.*?猪.*?岛.*?小说.*?[w|W]{3,3}\..*?\.c[o|Ｏ]m/gim, "");
        node.innerHTML = node.innerHTML.replace(/ps：看.*?关注起点中文网公众号.*?，悄悄告诉我吧！/gi, "");
        node.innerHTML = node.innerHTML.replace(/ps：想听到更.*?更多支持！/gi, "");
        node.innerHTML = node.innerHTML.replace(/起点中文网.*?手机用户请到m\.qidian\.com阅读。/gi, "");
        node.innerHTML = node.innerHTML.replace(/&amp;#x770B;&amp;#x672C;.*?#xFF09;/gi, "");
        node.innerHTML = node.innerHTML.replace(/APP软件已经开发完毕.*?APP】/gi, "");
        node.innerHTML = node.innerHTML.replace(/强烈推荐一家.*?超级美味.*?！.*?<br><br>/gim, "");
        node.innerHTML = node.innerHTML.replace(/防盗版章节.*?显示正确的内容。/gim, "");
        node.innerHTML = node.innerHTML.replace(/正版读者若是.*?重新下载。/gim, "");

        node.innerHTML = node.innerHTML.replace(/&amp;/gim, '&');
        node.innerHTML = node.innerHTML.replace(/(&nbsp;){2,}/gim, "$1");
        node.innerHTML = node.innerHTML.replace(/&nbp;/gim, "");
        node.innerHTML = node.innerHTML.replace(/&amp;nbp;/gim, "");
        node.innerHTML = node.innerHTML.replace(/(&amp;nbsp)+/gim, " ");
        node.innerHTML = node.innerHTML.replace(/br((&nbsp;)+)/gim, "<br/>$2");
        node.innerHTML = node.innerHTML.replace("br ", "<br/>");
        //node.innerHTML = node.innerHTML.replace(/([ |&nbsp;]br[ |&nbsp;])+/gim, "<br/>");
        //node.innerHTML = node.innerHTML.replace(/((br[ )|(&nbsp;]))+/gim, "<br/>");
        //node.innerHTML = node.innerHTML.replace(/((\\br[ )|(\&nbsp;]))+/gim, "<br/>");
        //node.innerHTML = node.innerHTML.replace(/nbsp; /gim, " ");
        node.innerHTML = node.innerHTML.replace(/((br)|(&nbsp;)|( *; )|(\/ )|( +;))+/gim, "");

        node.innerHTML = node.innerHTML.trim().replace(/[\uE000-\uF8FF,\uFA6E-\uFA6F,\uFADA-\uFAFF,\uFB00-\uFE0F,\uFE1A-\uFE1F,\uFE6C-\uFF00,\uFFBF-\uFFFF,\u{10000}-\u{1D37F},\u{1D800}-\u{1EFFF},\u{1FC00}-\u{1FFFF}]/ugim, '');
        node.innerHTML = node.innerHTML.trim().replace('姑且', '');
        node.innerHTML = node.innerHTML.trim().replace('\\r', '');        

        $(node).addClass('replaced');
    });
}

function removeFloat(s) {
    //console.log(s);
    floating = $(s);
    console.log(floating);
    floating.hide();
    floating.remove();
}

function removeWords() {

}

function resizeFont(s) {
    chapter = $(s);
    //chapter.css('font-size', '18px !important');
    //chapter.style('font-size', '18px', 'important');

    var font_family = 'font-family: Monaco,Consolas,"Hiragino Sans GB","Microsoft YaHei",Tahoma,Arial!important;';
    var font_size = 'font-size: 22px !important;font-weight:300 !important;';
    chapter.attr('style', font_family + font_size + 'width:95% !important;');

    console.log('Font  : Resize to 22px');
}

//function addFontAwesome()
//{
//  var font_css = document.createElement('link');
//  font_css.setAttribute('id', 'FontAwesom');
//  font_css.setAttribute('type', 'text/css');
//  font_css.setAttribute('rel', 'stylesheet');
//  font_css.setAttribute('media', 'screen');
//  font_css.setAttribute('href', 'http://cdn.netcharm.local/static/fonts/font-awesome/css/font-awesome.min.css');
//  //font_css.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
//  document.head.appendChild(font_css);
//
//  return(false);
//}

function decodeUnicode(s) {
    nodes = $(s);
    //console.log(nodes);
    nodes.each(function(i, node) {
        $(node).find('p').each(function(i, p) {
            console.log(p.textContent);
            p.textContent = unescape(p.textContent.replace(/&#x(.*?);/gim, '%u$1'));
        });
    });
}

function addFloatUtils() {
    $('<div class="readerbtn" style="bottom: 80px;">替换</div>').appendTo(s);
}

function main() {
    //$(contents).each(function(i, s)
    //{
    //  removeLink(s);
    //  resizeFont(s);
    //});
    //addFontAwesome();

    removeLink(content);
    decodeUnicode(content);
    resizeFont(content);
    removeFloat(floatAD);

    console.log('link removed');

    addFloatUtils(content);
}

setInterval(function() {
    console.log('checking contents...')
    //removeLink('#mynovelreader-content, h1.title');
    removeLink('#mynovelreader-content > article[id*="page-"] > p, h1.title');    
    //removeLink(content);
}, 5 * 1000);

main();