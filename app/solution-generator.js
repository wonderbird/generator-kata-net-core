var path = require('path');
var ClassLibraryGenerator = require('./class-library-generator');
var TestProjectGenerator = require('./test-project-generator');

module.exports = class SolutionGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;

        const testSuffix = '.Tests';
        this.testProjectName = this.configuration.libraryProjectName + testSuffix;
        const testProjectFileName = this.testProjectName + this.configuration.projectExtension;
        this.testProjectPath = path.join(this.testProjectName, testProjectFileName);

        this.classLibraryGenerator = new ClassLibraryGenerator(dotnetCli, configuration);
        this.testProjectGenerator = new TestProjectGenerator(dotnetCli, configuration);
    }

    generateSolution() {
        this.dotnetCli.createNewSolution(this.configuration.solutionName);
    }

    generate() {
        this.generateSolution();

        this.classLibraryGenerator.generateClassLibrary();
        this.classLibraryGenerator.addClassLibraryToSolution();

        this.testProjectGenerator.generateTestProject();
        this.testProjectGenerator.addClassLibraryReferenceToTestProject();
        this.testProjectGenerator.addTestProjectToSolution();
    }
}