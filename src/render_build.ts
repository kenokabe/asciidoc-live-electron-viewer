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

//const parser = new DOMParser();

const build = (html: string) =>
  (headElTL: timeline) => {

    //preserver selves
    const selfEl = document
      .getElementsByTagName("script")[0];
    const stemEl = document
      .getElementsByTagName("link")[0];

    //get target html
    const htmlTargetEl = document
      .getElementsByTagName("html")[0];

    //override html
    htmlTargetEl.innerHTML = html;

    //get head and body
    const headTargetEl = document
      .getElementsByTagName("head")[0];
    const bodyTargetEl = document
      .getElementsByTagName("body")[0];

    headTargetEl
      .insertAdjacentElement("beforeend", selfEl);
    headTargetEl
      .insertAdjacentElement("beforeend", stemEl);

    bodyTargetEl
      .classList.add("target");


  };

export { build };
