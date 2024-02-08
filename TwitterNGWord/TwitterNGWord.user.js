// ==UserScript==
// @name         Twitter NG Word
// @description  ホーム・リスト関わらずNGワードを含むツイートを非表示にします
// @namespace    https://github.com/tdnossan/UserScripts/
// @homepage     https://github.com/tdnossan/UserScripts/tree/master/TwitterNGWord
// @homepageURL  https://github.com/tdnossan/UserScripts/tree/master/TwitterNGWord
// @downloadURL  https://github.com/tdnossan/UserScripts/raw/main/TwitterNGWord/TwitterNGWord.user.js
// @updateURL    https://github.com/tdnossan/UserScripts/raw/main/TwitterNGWord/TwitterNGWord.user.js
// @author       tdnossan
// @version      0.0.1
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

// ユーザーのプロフィールページでNG動作されると困る場合は@match部分を以下の3行に置き換えてください
// @match        https://twitter.com/home
// @match        https://twitter.com/i/lists*
// @match        https://twitter.com/search*

'use strict';

const ngword = /\#testhashtag|@hogehoge|shindanmaker\.com/;
const test = true; // trueにすると非表示にしたツイートのテキスト内容をコンソールに表示

const section_callback = (mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        mutation.addedNodes.forEach((e) => {
            let attr = e.getAttribute("data-testid");
            let text = e.innerText;
            if(attr == 'cellInnerDiv' && text.match(ngword)) {
                if(test) {
                    e.style.background = "#ffddff";
                }
                else {
                    e.style.display = "none";
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
    console.log(obj);
    const observer = new MutationObserver(section_callback);
    observer.observe(obj, {
        childList: true, subtree: true
    })
}

waitQuerySelector('div[aria-label="ホームタイムライン"]');
