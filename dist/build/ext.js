import { T, now } from "./modules/timeline-monad";
const test = (registry) => (linesMappingTL) => {
    registry.treeProcessor(function () {
        const self = this;
        self.process((doc) => {
            const line = T();
            const blocks = doc
                .findBy()
                .filter((block) => block.source_location.dir === doc.base_dir)
                .filter((block) => ((line[now] !== block.getLineNumber()) && (line[now] = block.getLineNumber())));
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
export { test };
