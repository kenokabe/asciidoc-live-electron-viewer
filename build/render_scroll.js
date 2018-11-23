import { T, now } from "./modules/timeline-monad";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL[now] = a);
const _sce = document.scrollingElement;
const sce = _sce == null
    ? {}
    : _sce;
const scroll = (data) => (linesMappingTL) => {
    //target scroll---------
    consoleTL[now] = data.dir_name.dir;
    consoleTL[now] = data.dir_name.name;
    consoleTL[now] = data.line + 1;
    const line = ((line) => linesMappingTL[now]
        .reduce((acm, current) => (line >= current)
        ? current
        : acm))(data.line + 1);
    const className = (data.line < 10)
        ? "target"
        : "data-asciidocline" + line;
    consoleTL[now] = className;
    const _targetElement = document
        .getElementsByClassName(className)[0];
    const targetElement = _targetElement == null
        ? {}
        : _targetElement;
    consoleTL[now] = targetElement;
    //error??
    targetElement.scrollIntoView();
    const offset = 150;
    ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) //touch the bottom
        ? undefined
        : sce.scrollTop = sce.scrollTop - offset;
};
export { scroll };
