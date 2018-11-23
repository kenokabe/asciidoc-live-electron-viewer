
import { T, now } from "./modules/timeline-monad";
import { fixLinks } from "./render_fixlinks";
import { build } from "./render_build";
import { scroll } from "./render_scroll";

const hljs = require('highlight.js');

const katex = require("katex");

const consoleTL = ((console) => T(
  (self: timeline) => self.sync((a: unknown) => {
    console.log(a);
    return a;
  })
))(console);
const log = (a: unknown) => (consoleTL[now] = a)

interface timeline {
  type: string;
  [now: string]: any;
  sync: Function;
}

interface dir_name {
  dir: string;
  name: string;
}
interface data {
  text: string;
  dir_name: dir_name;
  line: number;
}

const linesMappingTL = T();

const asciidoctor = require('asciidoctor.js')();
const registry = asciidoctor.Extensions.create();

import { linemap } from './ext';
import { isUndefined } from "util";
linemap(registry)(linesMappingTL);
/*
import('../extensions/highlight.js/index.js')
  .then((module: any) => {

    module.register(registry);

  });
*/


const headElTL = T();
headElTL[now] =
  document
    .getElementsByTagName("head")[0];


let count = 0;

interface hiCash {
  [index: string]: string;
}
const hiCash = {} as hiCash;

interface stemCash {
  [index: string]: string;
}
const stemCash = {} as stemCash;

const render = (dataTL: timeline) =>
  (baseOption: object) =>
    (f: Function) => {

      try {
        console.log(count++);

        const data = dataTL[now];
        const addOption =
        {
          base_dir: data.dir_name.dir,
          extension_registry: registry,
          sourcemap: true,
        };

        const option =//destructive for {}
          Object.assign({}, baseOption, addOption);

        const html = asciidoctor
          .convert(data.text, option);

        const htmlFixed = fixLinks(data)(html);

        build(htmlFixed)(headElTL);

        //script hack -----

        const codeEls = Array.prototype
          .slice.call(document
            .getElementsByClassName("highlight"));

        const stemEls = Array.prototype
          .slice.call(document
            .getElementsByClassName("stemblock"));


        codeEls.map((el: HTMLBodyElement) => {

          const code = el.innerHTML;

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



        scroll(data)(linesMappingTL);

        f();//render done!

        return true;

      } catch (error) {
        console.log("!!! ERROR !!!");
        console.log(error);

        f();//render done!
      }


    };



export { render };
