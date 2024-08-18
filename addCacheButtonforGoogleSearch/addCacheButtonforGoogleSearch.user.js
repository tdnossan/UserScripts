// ==UserScript==
// @name         add cache button for Google Search
// @description  Google検索結果のリンクにキャッシュページへのリンクを追加します
// @namespace    https://github.com/tdnossan/UserScripts/
// @homepage     https://github.com/tdnossan/UserScripts/tree/master/addCacheButtonforGoogleSearch
// @homepageURL  https://github.com/tdnossan/UserScripts/tree/master/addCacheButtonforGoogleSearch
// @namespace    http://tampermonkey.net/
// @version      2024-02-23
// @description  add cache button for Google Search
// @author       tdnossan
// @version      0.0.1
// @match        https://www.google.com/search*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addCacheBtn(a) {
        let div = document.createElement("div");
        div.style = "display:block";
        let cachelink = document.createElement("a");
        cachelink.href = "https://www.google.com/search?q=cache:" + a.href + "&strip=0vwsrc=0";
        cachelink.target = "_blank";
        cachelink.text = "[cache]";
        cachelink.style = "font-size:0.9rem;line-height: 1rem;margin-bottom: 5px;";
        div.appendChild(cachelink);

        let tag = a.parentNode.tagName;
        console.log(tag);
        if(tag == "SPAN") {
            a.parentNode.parentNode.appendChild(div);
        }
        else if(tag == "H3") {
            a.parentNode.appendChild(div);
        }
    }

    const section_callback = (mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach((e) => {
                e.querySelectorAll('a[jsname]').forEach(function(e) {
                    addCacheBtn(e);
                });
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
        console.log(selector);
        console.log(obj);
        const observer = new MutationObserver(section_callback);
        observer.observe(obj, {
            childList: true, subtree: true
        })
    }

    document.body.querySelectorAll('#res a[jsname]').forEach(function(e) {
        addCacheBtn(e);
    });

    waitQuerySelector('#botstuff');
})();
