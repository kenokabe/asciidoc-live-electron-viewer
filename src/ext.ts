
import { T, now } from "./modules/timeline-monad";
interface timeline {
  type: string;
  [now: string]: any;
  sync: Function;
}

interface block {
  base_dir: string;
  findBy: Function;
  getBlocks: Function;
  getLineNumber: Function;
  id: string;
  source_location: {
    dir: string;
  };
}

const test = (registry: {
  treeProcessor: Function
}) =>
  (linesMappingTL: timeline) => {
    registry.treeProcessor(function (this: any) {
      const self = this;
      self.process((doc: block) => {

        const blocks: block[] = doc.findBy();
        //   console.log("doc");
        //    console.log(doc.base_dir);
        const blocks1 = blocks
          .filter((block: block) => block.source_location.dir === doc.base_dir)
        //      console.log(blocks1);
        const linesMapping = blocks1
          .map((block) => {
            const line = block.getLineNumber();
            block.id = "__asciidoc-view-" + line;
            return line;
          });
        //   console.log(linesMapping);
        linesMappingTL[now] = linesMapping;
        return doc;
      });
    });
  };

export { test }
