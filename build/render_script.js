import { T, now } from "./modules/timeline-monad";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL[now] = a);
const hljs = require('highlight.js');
const katex = require("katex");
const hiCash = {};
const stemCash = {};
const script = () => {
    //script hack -----
    const codeEls = Array.prototype
        .slice.call(document
        .getElementsByClassName("highlight"));
    const stemEls = Array.prototype
        .slice.call(document
        .getElementsByClassName("stemblock"));
    codeEls.map((el) => {
        const code = el.innerText;
        (hiCash[code] !== undefined)
            ? (() => {
                el.innerHTML = hiCash[code];
                console.log("cash used");
            })()
            : (() => {
                hljs.initHighlighting.called = false;
                hljs.initHighlighting(el);
                hiCash[code] = el.innerHTML;
                console.log("new");
            })();
    });
    stemEls.map((el) => {
        const stem = el.innerText;
        (stemCash[stem] !== undefined)
            ? (() => {
                el.innerHTML = stemCash[stem];
                console.log("stem cash used");
            })()
            : (() => {
                stemCash[stem] = katex.renderToString(stem, {
                    throwOnError: false
                });
                el.innerHTML = stemCash[stem];
                console.log("katex new");
            })();
    });
};
export { script };
