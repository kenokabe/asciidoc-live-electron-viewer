import { T } from "./modules/timeline-monad";
const linemap = (registry) => (linesMappingTL) => {
    registry.treeProcessor(function () {
        const self = this;
        self.process((doc) => {
            const line = T();
            const blocks = doc
                .findBy()
                .filter((block) => block.source_location.dir === doc.base_dir)
                .filter((block) => ((line.now !== block.getLineNumber()) && (line.now = block.getLineNumber())));
            //  console.log(blocks);
            const linesMapping = blocks
                .map((block) => {
                const line = block.getLineNumber();
                const name = "data-asciidocline" + line;
                // console.log(name);
                block.addRole(name);
                return line;
            });
            //   console.log(linesMapping);
            linesMappingTL.now = linesMapping;
            return doc;
        });
    });
};
export { linemap };
