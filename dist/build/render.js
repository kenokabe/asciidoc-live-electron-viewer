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
const render = (data) => {
    const htmlTL = T();
    const option = {
        base_dir: "/home/ken/p/timeline-monad/docs",
        safe: 'unsafe',
        header_footer: true,
        attributes: {
            icons: 'font'
        }
    };
    const html = asciidoctor
        .convert(data.text, option);
    consoleTL[now] = html;
    target.innerHTML = html;
    consoleTL[now] = sce.scrollHeight;
    const p = data.line / data.lines;
    sce.scrollTop = sce.scrollHeight * p;
    return true;
};
export { render };
