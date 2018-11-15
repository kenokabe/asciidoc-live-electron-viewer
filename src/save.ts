import { T, now } from "./modules/timeline-monad";

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

const save = (dataTL: timeline) =>
  (baseOption: object) =>
    (f: Function) => {

      const data = dataTL[now];
      const name = data
        .dir_name
        .name.split(".")[0];

      console.log(name);

      const addOption =
      {
        base_dir: data.dir_name.dir,
        to_file: path.join(
          data.dir_name.dir,
          name + ".html")
      };

      const option =//destructive for {}
        Object.assign({}, baseOption, addOption);

      const html = asciidoctor
        .convert(data.text, option);

      f(name);

      return true;
    };



export { save };

