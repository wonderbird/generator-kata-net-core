module.exports = class ApplicationProjectGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;
    }

    _generateApplicationProject() {
        this.dotnetCli.createNewApplication(this.configuration.solutionDirectory, this.configuration.applicationProjectName);
    }

    _addClassLibraryReferenceToApplicationProject() {
        this.dotnetCli.addProjectReference(this.configuration.solutionDirectory,
            this.configuration.applicationProjectPath,
            this.configuration.libraryProjectPath);
    }

    _addApplicationProjectToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionDirectory, this.configuration.applicationProjectPath);
    }

    generate() {
        this._generateApplicationProject();
        this._addClassLibraryReferenceToApplicationProject();
        this._addApplicationProjectToSolution();
    }
}
