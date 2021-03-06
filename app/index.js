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
        this.answers = await this.prompt([{
            type: "input",
            name: "solutionName",
            message: "Solution name:"
        }, {
            type: "confirm",
            name: "isSeparateSolutionDirEnabled",
            message: "Create solution inside separate directory:"
        }, {
            type: "confirm",
            name: "isMitLicenseSelected",
            message: "Add MIT license file to this project:"
        }])
        .then(this._promptForMitLicenseDetailsIfApplicable.bind(this));
    }

    async _promptForMitLicenseDetailsIfApplicable(answers) {
        if (answers.isMitLicenseSelected) {
            const additionalAnswers = await this.prompt([{
                type: "input",
                name: "authorName",
                message: "Enter the author's name for the LICENSE file:"
            }]);

            answers.authorName = additionalAnswers.authorName;
        }

        return answers;
    }

    configuring() {
        this.configuration.setSolutionNameAndUpdateConfiguration(this.answers.solutionName);

        this._configureSeparateSolutionDir();
        this._configureMitLicense();
    }

    _configureSeparateSolutionDir() {
        if (this.answers.isSeparateSolutionDirEnabled) {
            this.configuration.enableSeparateSolutionDir();
        } else {
            this.configuration.disableSeparateSolutionDir();
        }
    }

    _configureMitLicense() {
        if (this.answers.isMitLicenseSelected) {
            this.configuration.selectMitLicense();
            this.configuration.setAuthorName(this.answers.authorName);
        } else {
            this.configuration.deselectMitLicense();
        }
    }

    install() {
        this.generators.forEach(generator => generator.generate());
    }
}
