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
const log = (a: unknown) =>
  (consoleTL[now] = a);


//load template elements

const fs = require("fs");
const parser = new DOMParser();

const templateBodyHtmlTL =
  T((self: timeline) =>
    fs.readFile("./index.html", {
      encoding: "utf-8"
    },
      (err: any, html: string) => {
        //console.log(err);
        // console.log(html);
        const doc = parser
          .parseFromString(html, "text/html");
        const bodyHTML = doc.getElementsByTagName("body")[0].innerHTML;
        self[now] = bodyHTML;

      })
  );

//get target html
const _htmlTargetEl = document.body.parentNode;
const htmlTargetEl = (_htmlTargetEl == null)
  ? {} as Element
  : _htmlTargetEl;

const emptyElement = (element: Element) =>
  Array.prototype
    .slice.call(element.childNodes)
    .map((el: Element) =>
      element.removeChild(el));

const build = (html: string) =>
  (headElTL: timeline) => {

    emptyElement(htmlTargetEl as Element);

    (htmlTargetEl as Element)
      .insertAdjacentHTML('beforeend', html);

    document.body
      .classList.add("target");

    //mathjax-----
    const stem = Array.prototype
      .slice.call(document
        .getElementsByTagName("script"))
      .filter((el: Element) => {
        const type = el.getAttribute("type");
        return (type == null)
          ? false
          : (type.indexOf("mathjax") !== -1)
      })
      .length;

    //remove all scripts
    Array.prototype
      .slice.call(document
        .getElementsByTagName("script"))
      .map((el: Element) => {
        document.body.removeChild(el);
      });

    //add template
    document.body
      .insertAdjacentHTML("beforeend",
        templateBodyHtmlTL[now] as string);

    return stem;

  };

export { build };
