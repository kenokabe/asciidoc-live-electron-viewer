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
//require('../../asciidoc-extension-test/index.js')(registry);
import { test } from './ext';
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
    const line = (line => linesMappingTL[now]
        .reduce((acm, current) => (line >= current)
        ? current
        : acm))(data.line + 1);
    const className = (data.line < 10)
        ? "target"
        : "data-asciidocline" + line;
    const _targetElement = document
        .getElementsByClassName(className)[0];
    const targetElement = _targetElement == null
        ? {}
        : _targetElement;
    targetElement.scrollIntoView();
    const offset = 150;
    ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) //touch the bottom
        ? undefined
        : sce.scrollTop = sce.scrollTop - offset;
    return true;
})(linesMappingTL);
export { render };
