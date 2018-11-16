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
const asciidoctor = require('asciidoctor.js')();
const registry = asciidoctor.Extensions.create();
require('../../asciidoc-extension-test/test.js')(registry);
const render = (dataTL) => (baseOption) => {
    const data = dataTL[now];
    const addOption = {
        base_dir: data.dir_name.dir,
        extension_registry: registry
    };
    const option = //destructive for {}
     Object.assign({}, baseOption, addOption);
    const html = asciidoctor
        .convert(data.text, option);
    target.innerHTML = html;
    consoleTL[now] = data.dir_name.dir;
    consoleTL[now] = data.dir_name.name;
    const p = data.line / data.lines;
    sce.scrollTop = sce.scrollHeight * p;
    return true;
};
export { render };
