var path = require('path');
var ClassLibraryGenerator = require('./class-library-generator');
var TestProjectGenerator = require('./test-project-generator');

module.exports = class SolutionGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;

        this.classLibraryGenerator = new ClassLibraryGenerator(dotnetCli, configuration);
        this.testProjectGenerator = new TestProjectGenerator(dotnetCli, configuration);
    }

    generate() {
        this.dotnetCli.createNewSolution(this.configuration.solutionName);
    }
}