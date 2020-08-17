var path = require('path');
var ClassLibraryGenerator = require('./class-library-generator');

module.exports = class SolutionGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;

        const testSuffix = '.Tests';
        this.testProjectName = this.configuration.libraryProjectName + testSuffix;
        const testProjectFileName = this.testProjectName + this.configuration.projectExtension;
        this.testProjectPath = path.join(this.testProjectName, testProjectFileName);

        this.classLibraryGenerator = new ClassLibraryGenerator(dotnetCli, configuration);
    }

    generateSolution() {
        this.dotnetCli.createNewSolution(this.configuration.solutionName);
    }

    generateTestProject() {
        this.dotnetCli.createNewTestProject(this.configuration.solutionName, this.testProjectName);
    }

    addClassLibraryReferenceToTestProject() {
        this.dotnetCli.addProjectReference(this.configuration.solutionName,
            this.testProjectPath,
            this.libraryProjectPath);
    }

    addTestProjectToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionName, this.testProjectPath);
    }

    generate() {
        this.generateSolution();

        this.classLibraryGenerator.generateClassLibrary();
        this.classLibraryGenerator.addClassLibraryToSolution();

        // TODO refactor: Move code to TestProjectGenerator
        this.generateTestProject();
        this.addClassLibraryReferenceToTestProject();
        this.addTestProjectToSolution();
    }
}