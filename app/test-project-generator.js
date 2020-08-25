module.exports = class ClassLibraryGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;
    }

    _generateTestProject() {
        this.dotnetCli.createNewTestProject(this.configuration.solutionName, this.configuration.testProjectName);
    }

    _addClassLibraryReferenceToTestProject() {
        this.dotnetCli.addProjectReference(this.configuration.solutionName,
            this.configuration.testProjectPath,
            this.configuration.libraryProjectPath);
    }

    _addTestProjectToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionName, this.configuration.testProjectPath);
    }

    generate() {
        this._generateTestProject();
        this._addClassLibraryReferenceToTestProject();
        this._addTestProjectToSolution();
    }
}
