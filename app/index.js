const Generator = require('yeoman-generator');
const DotnetCli = require('./dotnet-cli');
const FileSystem = require('./file-system');
const Configuration = require('./configuration');
const SolutionGenerator = require('./solution-generator');
const ClassLibraryGenerator = require('./class-library-generator');
const TestProjectGenerator = require('./test-project-generator');
const ApplicationProjectGenerator = require('./application-project-generator');
const CopyTemplateFilesGenerator = require('./copy-template-files-generator');

module.exports = class GeneratorKataNetCore extends Generator {
    constructor(args, opts) {
        super(args, opts);

        const dotnetCli = new DotnetCli(this);
        const fileSystem = new FileSystem(this);
        this.configuration = new Configuration('SampleKata');

        this.generators = [
            new SolutionGenerator(dotnetCli, this.configuration),
            new ClassLibraryGenerator(dotnetCli, this.configuration),
            new TestProjectGenerator(dotnetCli, this.configuration),
            new ApplicationProjectGenerator(dotnetCli, this.configuration),
            new CopyTemplateFilesGenerator(fileSystem, this.configuration)
        ];
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

        this.generators.forEach(generator => generator.generate());
    }
}
