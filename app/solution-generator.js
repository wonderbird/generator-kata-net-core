const DotnetGeneratorBase = require('./dotnet-generator-base');

module.exports = class SolutionGenerator extends DotnetGeneratorBase {
    constructor(dotnetCli, configuration) {
        super(dotnetCli, configuration);
    }

    generate() {
        this.dotnetCli.createNewSolutionInDirectory(this.configuration.solutionName, this.configuration.solutionDirectory);
    }
}