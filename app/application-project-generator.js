module.exports = class ApplicationProjectGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;
    }

    _generateApplicationProject() {
        this.dotnetCli.createNewApplication(this.configuration.solutionName, this.configuration.applicationProjectName);
    }

    generate() {
        this._generateApplicationProject();
    }
}
