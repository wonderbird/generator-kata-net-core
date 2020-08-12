var path = require('path');
var ClassLibraryGenerator = require('./class-library-generator');
var YeomanDotnetCli = require('./yeoman-dotnet-cli');

module.exports = class SolutionGenerator {
    constructor(yeoman) {
        this.yeoman = yeoman;
        this.yeomanDotnetCli = new YeomanDotnetCli(yeoman);

        this.solutionName = 'SampleKata';

        // TODO refactor: consolidate the constants below and in SolutionGenerator into a single constants data struct
        const librarySuffix = '.Lib';
        const projectExtension = '.csproj';

        this.libraryProjectName = this.solutionName + librarySuffix;

        const testSuffix = '.Tests';
        this.testProjectName = this.libraryProjectName + testSuffix;
        const testProjectFileName = this.testProjectName + projectExtension;
        this.testProjectPath = path.join(this.testProjectName, testProjectFileName);
    }

    generateSolution() {
        this.yeomanDotnetCli.createNewSolution(this.solutionName);
    }

    generateTestProject() {
        process.chdir(this.solutionName);

        this.yeoman.log('Creating unit test project ...');
        this.yeoman.spawnCommandSync('dotnet', ['new', 'xunit', '--name', this.testProjectName]);

        process.chdir('..');
    }

    addClassLibraryReferenceToTestProject() {
        process.chdir(this.solutionName);

        this.yeoman.log('Adding library reference to unit test project ...');
        this.yeoman.spawnCommandSync('dotnet', ['add', this.testProjectPath, 'reference', this.libraryProjectPath]);

        process.chdir('..');
    }

    addTestProjectToSolution() {
        process.chdir(this.solutionName);

        this.yeoman.log('Adding unit test project to solution ...');
        this.yeoman.spawnCommandSync('dotnet', ['sln', 'add', this.testProjectPath]);

        process.chdir('..');
    }

    generate() {
        this.generateSolution();

        const classLibraryGenerator = new ClassLibraryGenerator(this.yeoman, this.solutionName);
        classLibraryGenerator.generateClassLibrary();
        classLibraryGenerator.addClassLibraryToSolution();

        // TODO refactor: Move code to TestProjectGenerator
        this.generateTestProject();
        this.addClassLibraryReferenceToTestProject();
        this.addTestProjectToSolution();
    }
}