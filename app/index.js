var Generator = require('yeoman-generator');
var DotnetCli = require('./dotnet-cli');
var Configuration = require('./configuration');
var SolutionGenerator = require('./solution-generator');
const ClassLibraryGenerator = require('./class-library-generator');

module.exports = class GeneratorKataNetCore extends Generator {
    constructor(args, opts) {
        super(args, opts);

        const dotnetCli = new DotnetCli(this);
        const configuration = new Configuration('SampleKata');

        this.solutionGenerator = new SolutionGenerator(dotnetCli, configuration);
        this.classLibraryGenerator = new ClassLibraryGenerator(dotnetCli, configuration);
    }

    install() {
        this.solutionGenerator.generate();
        this.classLibraryGenerator.generate();
    }
}
