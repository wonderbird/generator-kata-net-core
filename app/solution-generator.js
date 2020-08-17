var path = require('path');
var ClassLibraryGenerator = require('./class-library-generator');

module.exports = class SolutionGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;

        // TODO refactor: consolidate the constants below and in SolutionGenerator into a single constants data struct
        const librarySuffix = '.Lib';
        const projectExtension = '.csproj';

        this.libraryProjectName = this.configuration.solutionName + librarySuffix;
        const libraryProjectFileName = this.libraryProjectName + projectExtension;
        this.libraryProjectPath = path.join(this.libraryProjectName, libraryProjectFileName);

        const testSuffix = '.Tests';
        this.testProjectName = this.libraryProjectName + testSuffix;
        const testProjectFileName = this.testProjectName + projectExtension;
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