
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

const linesMappingTL = T();

const asciidoctor = require('asciidoctor.js')();
const registry = asciidoctor.Extensions.create();

//require('../../asciidoc-extension-test/index.js')(registry);

import { test } from './ext';
test(registry)(linesMappingTL);

const render = ((linesMappingTL: timeline) =>
  (dataTL: timeline) =>
    (baseOption: object) => {

      const data = dataTL[now];
      const addOption =
      {
        base_dir: data.dir_name.dir,
        extension_registry: registry,
        sourcemap: true
      };

      const option =//destructive for {}
        Object.assign({}, baseOption, addOption);

      const html = asciidoctor
        .convert(data.text, option);

      target.innerHTML = html;
      consoleTL[now] = data.dir_name.dir;
      consoleTL[now] = data.dir_name.name;


      interface current {
        line: number;
        id: string;
      }
      const targetID = (data.line < 10)
        ? "target"
        : (line =>
          linesMappingTL[now]
            .reduce((acm: string, current: current) =>
              (line >= current.line)
                ? current.id
                : acm
            ))(data.line + 1);

      const _targetElement = document
        .getElementById(targetID);
      const targetElement = _targetElement == null
        ? <Element>{}
        : _targetElement;

      targetElement.scrollIntoView();

      const offset = 150;

      ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)//touch the bottom
        ? undefined
        : sce.scrollTop = sce.scrollTop - offset;

      return true;
    })(linesMappingTL);

export { render };

