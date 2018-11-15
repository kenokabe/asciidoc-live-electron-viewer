
import { T, now } from "./modules/timeline-monad";

const _target = document
  .querySelector('#target');
const target = _target == null
  ? <Element>{}
  : _target;

const _sce = document.scrollingElement;
const sce = _sce == null
  ? <Element>{}
  : _sce;


const consoleTL = ((console) => T(
  (self: timeline) => self.sync((a: undefined) => {
    console.log(a);
    return a;
  })
))(console);
const log = (a: undefined) => (consoleTL[now] = a)

interface timeline {
  type: string;
  [now: string]: unknown;
  sync: Function;
}

interface data {
  text: string;
  line: number;
  lines: number;
}

const asciidoctor = require('asciidoctor.js')();


const render = (data: data) => {

  const htmlTL = T();

  const option =
  {
    base_dir: "/home/ken/p/timeline-monad/docs",
    safe: 'unsafe',
    header_footer: true,
    attributes:
    {
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

