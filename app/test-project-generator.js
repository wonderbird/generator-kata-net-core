module.exports = class TestProjectGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;
    }

    _generateTestProject() {
        this.dotnetCli.createNewTestProject(this.configuration.solutionDirectory, this.configuration.testProjectName);
    }

    _addClassLibraryReferenceToTestProject() {
        this.dotnetCli.addProjectReference(this.configuration.solutionDirectory,
            this.configuration.testProjectPath,
            this.configuration.libraryProjectPath);
    }

    _addTestProjectToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionDirectory, this.configuration.testProjectPath);
    }

    generate() {
        this._generateTestProject();
        this._addClassLibraryReferenceToTestProject();
        this._addTestProjectToSolution();
    }
}
