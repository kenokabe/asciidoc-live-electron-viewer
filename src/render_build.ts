interface timeline {
  type: string;
  [now: string]: any;
  sync: Function;
}

import { T, now } from "./modules/timeline-monad";

const consoleTL = ((console) => T(
  (self: timeline) => self.sync((a: unknown) => {
    console.log(a);
    return a;
  })
))(console);
const log = (a: unknown) => (consoleTL[now] = a)

const parser = new DOMParser();

const build = (html: string) =>
  (headElTL: timeline) => {

    const headTargetEl = document
      .getElementsByTagName("head")[0];
    const selfEl = document
      .getElementsByTagName("script")[0];
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

    headEl.isEqualNode(headElTL[now] as HTMLBaseElement)
      ? undefined
      : (() => {

        const headChildlenEls = Array.prototype
          .slice.call(headEl.children);
        headTargetEl.innerHTML = "";
        headChildlenEls.map((el: HTMLBodyElement) =>
          headTargetEl
            .insertAdjacentElement("beforeend", el)
        );
        headTargetEl
          .insertAdjacentElement("beforeend", selfEl);
      })()

    headElTL[now] = headEl;

    //---------get body
    const bodyEl = htmlEl
      .getElementsByTagName("body")[0];
    //consoleTL[now] = "bodyEl";
    // consoleTL[now] = bodyEl;

    //copy body attribute


    Array.from(bodyEl.classList)
      .map((name: string) =>
        bodyTargetEl.classList.add(name));


    const bodyChildlenEls: [] = Array.prototype
      .slice.call(bodyEl.children);

    //consoleTL[now] = bodyChildlenEls;

    const bodyContentsEls = bodyChildlenEls
      .filter((el: HTMLBaseElement) =>
        (el.tagName !== "SCRIPT"));

    //consoleTL[now] = "bodyContentsEls";
    //consoleTL[now] = bodyContentsEls;
    bodyTargetEl.innerHTML = "";
    bodyContentsEls.map((el: any) =>
      bodyTargetEl
        .insertAdjacentElement("beforeend", el)
    );

  };

export { build };
