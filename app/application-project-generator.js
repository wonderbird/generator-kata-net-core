const DotnetGeneratorBase = require('./dotnet-generator-base');

module.exports = class ApplicationProjectGenerator extends DotnetGeneratorBase {
    constructor(dotnetCli, configuration) {
        super(dotnetCli, configuration);
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
