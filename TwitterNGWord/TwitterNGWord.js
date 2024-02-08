// ==UserScript==
// @name         Twitter NG Word
// @description  ホーム・リスト関わらずNGワードを含むツイートを非表示にします
// @namespace    https://github.com/tdnossan/UserScripts/blob/main/TwitterNGWord/TwitterNGWord.js
// @author       tdnossan
// @version      0.0.1
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

const ngword = /\#testhashtag|@hogehoge|shindanmaker\.com/;
const test = true; // trueにすると非表示にしたツイートのテキスト内容をコンソールに表示

(function() {
    'use strict';

    const timeline = document.querySelector('div[aria-label="ホームタイムライン"]');

    const sectioncallback = (mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach((e) => {
                if(e.tagName == "DIV" && e.innerText && e.innerText.match(ngword)) {
                    e.style.display = "none";
                    if(test) {
                        console.log(e.innerText);
                    }
                }
            });
        });
    };

    // sectionタグが生成されるまで待機
    const tlcallback = (mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach((e) => {
                if(e.tagName == "SECTION") {
                    observer.disconnect();
                    const section = new MutationObserver(sectioncallback);
                    section.observe(timeline, {
                        childList: true, subtree: true
                    })
                }
            });
        });
    };

    const hometl = new MutationObserver(tlcallback);

    hometl.observe(timeline, {
        childList: true, subtree: true
    })
})();
