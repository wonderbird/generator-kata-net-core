module.exports = class ClassLibraryGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;
    }

    _generateClassLibrary() {
        this.dotnetCli.createNewClassLibrary(this.configuration.solutionName, this.configuration.libraryProjectName);
    }

    _addClassLibraryToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionName, this.configuration.libraryProjectPath);
    }

    generate() {
        this._generateClassLibrary();
        this._addClassLibraryToSolution();
    }
}
