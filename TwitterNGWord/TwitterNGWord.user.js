// ==UserScript==
// @name         Twitter NG Word
// @description  ホーム・リスト関わらずNGワードを含むツイートを非表示にします
// @namespace    https://github.com/tdnossan/UserScripts/
// @homepage     https://github.com/tdnossan/UserScripts/tree/master/TwitterNGWord
// @homepageURL  https://github.com/tdnossan/UserScripts/tree/master/TwitterNGWord
// @author       tdnossan
// @version      0.0.2
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

// ユーザーのプロフィールページでNG動作されると困る場合は@match部分を以下の3行に置き換えてください
// @match        https://twitter.com/home
// @match        https://twitter.com/i/lists*
// @match        https://twitter.com/search*

'use strict';

const NGWord = /\#hashtag|@hoge|shindanmaker.com/;
const TEST = true; // trueにするとNGワードを含んだツイートの表示色を変更

const section_callback = (mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        mutation.addedNodes.forEach((e) => {
            if(e.tagName == "DIV") {
                let tweet = e.getAttribute("data-testid") == 'cellInnerDiv';
                let text = e.innerText;
                let link = e.querySelector('a[role="link"]'); // ～～がリポストしましたでID取れないのでリンクから取る
                if(tweet && (text.match(NGWord) || (link && link.href.match(NGWord)))) {
                    if(TEST) {
                        e.style.background = "#ffddff";
                        console.log(e.innerText);
                    }
                    else {
                        e.style.display = "none";
                    }
                }
            }
        });
    });
};

async function waitQuerySelector(selector, node=document) {
    let obj = null;
    while(!obj) {
        obj = await new Promise(resolve =>
            setTimeout(() => resolve(node.querySelector(selector), 100))
        );
    }
    if(TEST) {
        console.log(selector);
        console.log(obj);
    }
    const observer = new MutationObserver(section_callback);
    observer.observe(obj, {
        childList: true, subtree: true
    })
}

//waitQuerySelector('div[aria-label="ホームタイムライン"]');
waitQuerySelector('main');
