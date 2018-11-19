module.exports = function (registry) {
    registry.treeProcessor(function () {

        self.process(function (doc) {

            console.log(self.process);



            return doc;
        });
    });
};