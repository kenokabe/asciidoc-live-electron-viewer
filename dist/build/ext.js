import { now } from "./modules/timeline-monad";
const test = (registry) => (linesMappingTL) => {
    registry.treeProcessor(function () {
        const self = this;
        self.process((doc) => {
            const blocks = doc
                .findBy()
                .filter((block) => block.source_location.dir === doc.base_dir);
            const linesMapping = blocks
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
