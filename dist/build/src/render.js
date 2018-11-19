import { T, now } from "./modules/timeline-monad";
const _target = document
    .querySelector('#target');
const target = _target == null
    ? {}
    : _target;
const _sce = document.scrollingElement;
const sce = _sce == null
    ? {}
    : _sce;
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL[now] = a);
const linesMappingTL = T();
const asciidoctor = require('asciidoctor.js')();
const registry = asciidoctor.Extensions.create();
import { test } from '../asciidoc-extension-test/test';
test(registry)(linesMappingTL);
const render = ((linesMappingTL) => (dataTL) => (baseOption) => {
    const data = dataTL[now];
    const addOption = {
        base_dir: data.dir_name.dir,
        extension_registry: registry,
        sourcemap: true
    };
    const option = //destructive for {}
     Object.assign({}, baseOption, addOption);
    const html = asciidoctor
        .convert(data.text, option);
    target.innerHTML = html;
    consoleTL[now] = data.dir_name.dir;
    consoleTL[now] = data.dir_name.name;
    consoleTL[now] = data.lines;
    /*
          const targetline = (line =>
            linesMappingTL[now]
              .reduce((acm: number, current: number) => {
                return line >= current
                  ? current
                  : acm;
              }))(data.line);
    
          console.log(targetline);
    
          const id = "__asciidoc-view-" + targetline;
    
          const _targetElement = document
            .getElementById(id);
          const targetElement = _targetElement == null
            ? <Element>{}
            : _targetElement;
    
          targetElement.scrollIntoView()
    */
    /*
          const p = data.line / data.lines;
          const offset = 200;
          sce.scrollTop =
            ((sce.scrollHeight) * p)
            - (offset * (1 - p))
            - (offset + offset * p)
    */
    return true;
})(linesMappingTL);
export { render };
