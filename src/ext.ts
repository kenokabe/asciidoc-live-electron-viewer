
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
  setAttribute: Function;
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

            const id = (typeof block.id === "string")
              ? block.id
              : "_data-line_" + line;

            block.id = id;

            return { line, id };
          });
        //   console.log(linesMapping);
        linesMappingTL[now] = linesMapping;
        return doc;
      });
    });
  };

export { test }
