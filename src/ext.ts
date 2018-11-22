
import { T, now } from "./modules/timeline-monad";
interface timeline {
  type: string;
  [now: string]: any;
  sync: Function;
}

interface block {
  context: string;
  base_dir: string;
  findBy: Function;
  getBlocks: Function;
  getLineNumber: Function;
  addRole: Function;
  id: string;
  source_location: {
    dir: string;
  };
}

const linemap = (registry: {
  treeProcessor: Function
}) =>
  (linesMappingTL: timeline) => {
    registry.treeProcessor(function (this: any) {
      const self = this;
      self.process((doc: block) => {

        const line = T();
        const blocks: block[] =
          doc
            .findBy()
            .filter((block: block) => block.source_location.dir === doc.base_dir)
            .filter((block: block) =>
              ((line[now] !== block.getLineNumber()) && (line[now] = block.getLineNumber())));

        //  console.log(blocks);

        const linesMapping = blocks
          .map((block) => {
            const line = block.getLineNumber();
            block.addRole("data-asciidocline" + line);
            return line;
          });
        //   console.log(linesMapping);
        linesMappingTL[now] = linesMapping;
        return doc;
      });
    });
  };

export { linemap }
