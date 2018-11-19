const test = (registry) => (linesMappingTL) => {
    registry.treeProcessor(() => {
        registry
            .process((doc) => {
            const blocks = doc.findBy();
            const blocks1 = blocks
                .slice(1)
                .filter(el => el.getLineNumber() !== undefined)
                .filter(el => el.getLineNumber() !== 0);
            console.log(blocks1);
            const linesMapping = blocks1
                .map((block) => {
                const line = block.getLineNumber();
                block.id = "__asciidoc-view-" + line;
                return line;
            });
            console.log(linesMapping);
            //  linesMappingTL[now] = linesMapping;
            return doc;
        });
    });
};
export { test };
