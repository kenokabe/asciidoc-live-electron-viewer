import { T } from "./modules/timeline-monad";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL.now = a);
const hljs = require('highlight.js');
const katex = require('katex');
const hiCash = {};
const stemCash = {};
const script = (stem) => {
    //highlightjs-----
    (Array.prototype
        .slice.call(document
        .getElementsByClassName("highlightjs")))
        .map((el) => {
        const code = el.innerText;
        (hiCash[code] !== undefined)
            ? (() => {
                el.innerHTML = hiCash[code];
                console.log("highlight cash used");
            })()
            : (() => {
                hljs.initHighlighting.called = false;
                hljs.initHighlighting(el);
                hiCash[code] = el.innerHTML;
                console.log("new");
            })();
    });
    console.log("mathjaxScript------");
    console.log(stem);
    (stem === 0)
        ? undefined
        : (() => {
            const _content = document
                .getElementById("content");
            const content = (_content == null)
                ? document.body
                : _content;
            //katex
            const texToHtml = (tex) => (displayMode) => (stemCash[tex + "@" + displayMode] !== undefined)
                ? (consoleTL.now = "=================") &&
                    (consoleTL.now = "stem cashed!") &&
                    stemCash[tex + "@" + displayMode]
                : consoleTL.now =
                    stemCash[tex + "@" + displayMode] =
                        katex
                            .renderToString(tex, {
                            displayMode: displayMode,
                            throwOnError: false
                        });
            {
                const _match = content.innerHTML
                    .match(/\\\(.+?\\\)/g);
                const match = (_match == null)
                    ? []
                    : _match;
                const f = (html, texwrap) => {
                    const tex = texwrap
                        .split(String.raw `\(`)[1]
                        .split(String.raw `\)`)[0];
                    return html
                        .replace(texwrap, texToHtml(tex)(false));
                };
                content.innerHTML =
                    match
                        .reduce(f, content.innerHTML);
            }
            {
                const _match = content.innerHTML
                    .match(/\\\[.+?\\\]/g);
                const match = (_match == null)
                    ? []
                    : _match;
                console.log(match);
                const f = (html, texwrap) => {
                    const tex = texwrap
                        .split(String.raw `\[`)[1]
                        .split(String.raw `\]`)[0];
                    return html
                        .replace(texwrap, texToHtml(tex)(true));
                };
                content.innerHTML =
                    match
                        .reduce(f, content.innerHTML);
            }
        })();
};
export { script };
