import { T } from "./modules/timeline-monad";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL.now = a);
const asciidoctor = require('asciidoctor.js')();
const path = require('path');
const save = (dataTL) => (baseOption) => (f) => {
    const data = dataTL.now;
    const name = data
        .dir_name
        .name.split(".")[0];
    console.log(name);
    const addOption = {
        base_dir: data.dir_name.dir,
        to_file: path.join(data.dir_name.dir, name + ".html")
    };
    const option = //destructive for {}
     Object.assign({}, baseOption, addOption);
    const html = asciidoctor
        .convert(data.text, option);
    f(name);
    return true;
};
export { save };
