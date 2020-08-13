var path = require('path');
var ClassLibraryGenerator = require('./class-library-generator');

module.exports = class SolutionGenerator {
    constructor(yeomanDotnetCli) {
        this.yeomanDotnetCli = yeomanDotnetCli;

        // TODO refactor: extract value type SolutionConfiguration
        this.solutionName = 'SampleKata';

        // TODO refactor: consolidate the constants below and in SolutionGenerator into a single constants data struct
        const librarySuffix = '.Lib';
        const projectExtension = '.csproj';

        this.libraryProjectName = this.solutionName + librarySuffix;
        const libraryProjectFileName = this.libraryProjectName + projectExtension;
        this.libraryProjectPath = path.join(this.libraryProjectName, libraryProjectFileName);

        const testSuffix = '.Tests';
        this.testProjectName = this.libraryProjectName + testSuffix;
        const testProjectFileName = this.testProjectName + projectExtension;
        this.testProjectPath = path.join(this.testProjectName, testProjectFileName);

        this.classLibraryGenerator = new ClassLibraryGenerator(yeomanDotnetCli, this.solutionName);
    }

    generateSolution() {
        this.yeomanDotnetCli.createNewSolution(this.solutionName);
    }

    generateTestProject() {
        this.yeomanDotnetCli.createNewTestProject(this.solutionName, this.testProjectName);
    }

    addClassLibraryReferenceToTestProject() {
        this.yeomanDotnetCli.addProjectReference(this.solutionName,
            this.testProjectPath,
            this.libraryProjectPath);
    }

    addTestProjectToSolution() {
        this.yeomanDotnetCli.addProjectToSolution(this.solutionName, this.testProjectPath);
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