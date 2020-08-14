var Generator = require('yeoman-generator');
var YeomanDotnetCli = require('./yeoman-dotnet-cli');
var Configuration = require('./configuration');
var SolutionGenerator = require('./solution-generator');

module.exports = class GeneratorKataNetCore extends Generator {
    constructor(args, opts) {
        super(args, opts);

        const yeomanDotnetCli = new YeomanDotnetCli(this);
        const configuration = new Configuration();

        this.solutionGenerator = new SolutionGenerator(yeomanDotnetCli, configuration);
    }

    install() {
        this.solutionGenerator.generate();
    }
}
