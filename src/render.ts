
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
  lines: number;
}

const asciidoctor = require('asciidoctor.js')();
const path = require('path');

const render = (dataTL: timeline) =>
  (baseOption: object) => {

    const data = dataTL[now];

    const addOption =
    {
      base_dir: data.dir_name.dir
    };

    const option =//destructive for {}
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

