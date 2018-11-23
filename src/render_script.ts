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
const log = (a: unknown) => (consoleTL[now] = a);

const hljs = require('highlight.js');
const katex = require("katex");
interface hiCash {
  [index: string]: string;
}
const hiCash = {} as hiCash;

interface stemCash {
  [index: string]: string;
}
const stemCash = {} as stemCash;

const script = () => {

  //script hack -----

  const codeEls = Array.prototype
    .slice.call(document
      .getElementsByClassName("highlight"));

  const stemEls = Array.prototype
    .slice.call(document
      .getElementsByClassName("stemblock"));


  codeEls.map((el: HTMLBodyElement) => {

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


  stemEls.map((el: HTMLBodyElement) => {

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
