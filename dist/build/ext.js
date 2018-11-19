import { now } from "./modules/timeline-monad";
const test = (registry) => (linesMappingTL) => {
    registry.treeProcessor(function () {
        const self = this;
        self.process((doc) => {
            const blocks = doc.findBy();
            //   console.log("doc");
            //    console.log(doc.base_dir);
            const blocks1 = blocks
                .filter((block) => block.source_location.dir === doc.base_dir);
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
export { test };
