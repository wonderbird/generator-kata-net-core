var Generator = require('yeoman-generator');
var DotnetCli = require('./dotnet-cli');
var Configuration = require('./configuration');
var SolutionGenerator = require('./solution-generator');
const ClassLibraryGenerator = require('./class-library-generator');
const TestProjectGenerator = require('./test-project-generator');

module.exports = class GeneratorKataNetCore extends Generator {
    constructor(args, opts) {
        super(args, opts);

        const dotnetCli = new DotnetCli(this);
        this.configuration = new Configuration('SampleKata');

        this.solutionGenerator = new SolutionGenerator(dotnetCli, this.configuration);
        this.classLibraryGenerator = new ClassLibraryGenerator(dotnetCli, this.configuration);
        this.testProjectGenerator = new TestProjectGenerator(dotnetCli, this.configuration);
    }

    async prompting() {
        this.answers = await this.prompt({
            type: "input",
            name: "solutionName",
            message: "Solution name:"
        });
    }

    configuring() {
        this.configuration.setSolutionNameAndUpdateConfiguration(this.answers.solutionName);
    }

    install() {
        this.log('Creating new solution "' + this.configuration.solutionName + '"')
        this.solutionGenerator.generate();
        this.classLibraryGenerator.generate();
        this.testProjectGenerator.generate();
    }
}
