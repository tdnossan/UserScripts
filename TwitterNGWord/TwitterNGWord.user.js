
const section_callback = (mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        mutation.addedNodes.forEach((e) => {
            let attr = e.getAttribute("data-testid");
            let text = e.innerText;
            let link = e.querySelector('a[role="link"]');
            if(attr == 'cellInnerDiv' && (text.match(ngword) || (link && link.href.match(ngword)))) {
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
    //console.log(obj);
    const observer = new MutationObserver(section_callback);
    observer.observe(obj, {
        childList: true, subtree: true
    })
}

waitQuerySelector('div[aria-label="ホームタイムライン"]');
