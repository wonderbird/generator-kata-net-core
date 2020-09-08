module.exports = class SolutionGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;
    }

    generate() {
        this.dotnetCli.createNewSolution(this.configuration.solutionName, this.configuration.solutionName);
    }
}