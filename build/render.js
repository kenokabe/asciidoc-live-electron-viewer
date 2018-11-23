import { T, now } from "./modules/timeline-monad";
import { fixLinks } from "./render_fixlinks";
import { build } from "./render_build";
import { script } from "./render_script";
import { scroll } from "./render_scroll";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL[now] = a);
const linesMappingTL = T();
const asciidoctor = require('asciidoctor.js')();
const registry = asciidoctor.Extensions.create();
import { linemap } from './ext';
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
const render = (dataTL) => (baseOption) => (f) => {
    try {
        console.log(count++);
        const data = dataTL[now];
        const addOption = {
            base_dir: data.dir_name.dir,
            extension_registry: registry,
            sourcemap: true,
        };
        const option = //destructive for {}
         Object.assign({}, baseOption, addOption);
        const html = asciidoctor
            .convert(data.text, option);
        const htmlFixed = fixLinks(data)(html);
        build(htmlFixed)(headElTL);
        script();
        scroll(data)(linesMappingTL);
        f(); //render done!
        return true;
    }
    catch (error) {
        console.log("!!! ERROR !!!");
        console.log(error);
        f(); //render done!
    }
};
export { render };
