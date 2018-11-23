import { T, now } from "./modules/timeline-monad";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL[now] = a);
const parser = new DOMParser();
const build = (html) => (headElTL) => {
    const selfEl = document
        .getElementsByTagName("script")[0];
    const stemEl = document
        .getElementsByTagName("link")[0];
    const headTargetEl = document
        .getElementsByTagName("head")[0];
    const bodyTargetEl = document
        .getElementsByTagName("body")[0];
    //---------get html
    const htmlEl = parser
        .parseFromString(html, "text/html");
    // consoleTL[now] = htmlEl;
    //---------get head
    const headEl = htmlEl
        .getElementsByTagName("head")[0];
    // consoleTL[now] = headEl;
    /*
            console.log(
              headEl.isEqualNode(headElTL[now] as HTMLBaseElement)
            );
    */
    headEl.isEqualNode(headElTL[now])
        ? undefined
        : (() => {
            const headChildlenEls = Array.prototype
                .slice.call(headEl.children);
            headTargetEl.innerHTML = "";
            headChildlenEls.map((el) => headTargetEl
                .insertAdjacentElement("beforeend", el));
            headTargetEl
                .insertAdjacentElement("beforeend", selfEl);
            headTargetEl
                .insertAdjacentElement("beforeend", stemEl);
        })();
    headElTL[now] = headEl;
    //---------get body
    const bodyEl = htmlEl
        .getElementsByTagName("body")[0];
    //consoleTL[now] = "bodyEl";
    // consoleTL[now] = bodyEl;
    //copy body attribute
    Array.from(bodyEl.classList)
        .map((name) => bodyTargetEl.classList.add(name));
    const bodyChildlenEls = Array.prototype
        .slice.call(bodyEl.children);
    //consoleTL[now] = bodyChildlenEls;
    const bodyContentsEls = bodyChildlenEls
        .filter((el) => (el.tagName !== "SCRIPT"));
    //consoleTL[now] = "bodyContentsEls";
    //consoleTL[now] = bodyContentsEls;
    bodyTargetEl.innerHTML = "";
    bodyContentsEls.map((el) => bodyTargetEl
        .insertAdjacentElement("beforeend", el));
};
export { build };
