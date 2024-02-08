// ==UserScript==
// @name         Twitter NG Word
// @description  ホーム・リスト関わらずNGワードを含むツイートを非表示にします
// @namespace    https://github.com/tdnossan/UserScripts/
// @homepage     https://github.com/tdnossan/UserScripts/tree/master/TwitterNGWord
// @homepageURL  https://github.com/tdnossan/UserScripts/tree/master/TwitterNGWord
// @downloadURL  https://raw.githubusercontent.com/tdnossan/UserScripts/main/TwitterNGWord/TwitterNGWord.js
// @updateURL    https://raw.githubusercontent.com/tdnossan/UserScripts/main/TwitterNGWord/TwitterNGWord.js
// @author       tdnossan
// @version      0.0.1
// @match        https://twitter.com/home
// @match        https://twitter.com/i/lists*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

const ngword = /\#testhashtag|@hogehoge|shindanmaker\.com/;
const test = true; // trueにすると非表示にしたツイートのテキスト内容をコンソールに表示

(function() {
    'use strict';

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

    async function waitQuerySelector(selector, node=document) {
        let obj = null;
        while(!obj) {
            obj = await new Promise(resolve =>
                setTimeout(() => resolve(node.querySelector(selector), 100))
            );
        }
        console.log(obj);
        const observer = new MutationObserver(sectioncallback);
        observer.observe(obj, {
            childList: true, subtree: true
        })
    }

    waitQuerySelector('div[aria-label="ホームタイムライン"]');
})();
