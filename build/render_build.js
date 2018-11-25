import { T, now } from "./modules/timeline-monad";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL[now] = a);
//load template elements
const fs = require("fs");
const parser = new DOMParser();
const templateBodyHtmlTL = T((self) => fs.readFile("./index.html", {
    encoding: "utf-8"
}, (err, html) => {
    //console.log(err);
    // console.log(html);
    const doc = parser
        .parseFromString(html, "text/html");
    const bodyHTML = doc.getElementsByTagName("body")[0].innerHTML;
    self[now] = bodyHTML;
}));
//get target html
const _htmlTargetEl = document.body.parentNode;
const htmlTargetEl = (_htmlTargetEl == null)
    ? {}
    : _htmlTargetEl;
const emptyElement = (element) => Array.prototype
    .slice.call(element.childNodes)
    .map((el) => element.removeChild(el));
const build = (html) => (headElTL) => {
    emptyElement(htmlTargetEl);
    htmlTargetEl
        .insertAdjacentHTML('beforeend', html);
    document.body
        .classList.add("target");
    //mathjax-----
    const stem = Array.prototype
        .slice.call(document
        .getElementsByTagName("script"))
        .filter((el) => {
        const type = el.getAttribute("type");
        return (type == null)
            ? false
            : (type.indexOf("mathjax") !== -1);
    })
        .length;
    //remove all scripts
    Array.prototype
        .slice.call(document
        .getElementsByTagName("script"))
        .map((el) => {
        document.body.removeChild(el);
    });
    //add template
    document.body
        .insertAdjacentHTML("beforeend", templateBodyHtmlTL[now]);
    return stem;
};
export { build };
