const DotnetGeneratorBase = require('./dotnet-generator-base');

module.exports = class ClassLibraryGenerator extends DotnetGeneratorBase {
    constructor(dotnetCli, configuration) {
        super(dotnetCli, configuration);
    }

    _generateClassLibrary() {
        this.dotnetCli.createNewClassLibrary(this.configuration.solutionDirectory, this.configuration.libraryProjectName);
    }

    _addClassLibraryToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionDirectory, this.configuration.libraryProjectPath);
    }

    generate() {
        this._generateClassLibrary();
        this._addClassLibraryToSolution();
    }
}
