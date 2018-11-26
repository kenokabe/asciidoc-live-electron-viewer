interface timeline {
  type: string;
  now: any;
  sync: Function;
}

import { T } from "./modules/timeline-monad";

const consoleTL = ((console) => T(
  (self: timeline) => self.sync((a: unknown) => {
    console.log(a);
    return a;
  })
))(console);
const log = (a: unknown) =>
  (consoleTL.now = a)

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

const _sce = document.scrollingElement;
const sce = _sce == null
  ? <Element>{}
  : _sce;

const scroll = (data: data) =>
  (linesMappingTL: timeline) => {

    //target scroll---------
    /*
        consoleTL.now = linesMappingTL.now;
    
        consoleTL.now = data.line + 1;
    
        consoleTL.now = data.dir_name.dir;
        consoleTL.now = data.dir_name.name;
    */
    const line = ((line: number) =>
      (linesMappingTL.now as number[])
        .reduce((acm: number, current: number) =>
          (line >= current)
            ? current
            : acm
        ))(data.line + 1);
    // consoleTL.now = line;


    const className = (data.line < 10)
      ? "target"
      : "data-asciidocline" + line;

    const _targetElement = document
      .getElementsByClassName(className)[0];
    const targetElement = _targetElement == null
      ? <Element>{}
      : _targetElement;

    //error??
    targetElement.scrollIntoView();

    const offset = 150;

    ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)//touch the bottom
      ? undefined
      : sce.scrollTop = sce.scrollTop - offset;
  };

export { scroll };
