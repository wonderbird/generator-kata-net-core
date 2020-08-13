var Generator = require('yeoman-generator');
var YeomanDotnetCli = require('./yeoman-dotnet-cli');
var SolutionGenerator = require('./solution-generator');

module.exports = class GeneratorKataNetCore extends Generator {
    constructor(args, opts) {
        super(args, opts);
        const yeomanDotnetCli = new YeomanDotnetCli(this);
        this.solutionGenerator = new SolutionGenerator(yeomanDotnetCli);
    }

    install() {
        this.solutionGenerator.generate();
    }
}
