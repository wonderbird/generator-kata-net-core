module.exports = class ApplicationProjectGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;
    }

    _generateApplicationProject() {
        this.dotnetCli.createNewApplication(this.configuration.solutionName, this.configuration.applicationProjectName);
    }

    _addApplicationProjectToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionName, this.configuration.applicationProjectPath);
    }

    generate() {
        this._generateApplicationProject();

        // TODO add projec reference to library project into the application

        this._addApplicationProjectToSolution();
    }
}
