var path = require('path');
var ClassLibraryGenerator = require('./class-library-generator');

module.exports = class SolutionGenerator {
    constructor(yeoman) {
        this.yeoman = yeoman;

        this.solutionName = 'SampleKata';

        const projectExtension = '.csproj';

        const librarySuffix = '.Lib';
        this.libraryProjectName = this.solutionName + librarySuffix;
        const libraryProjectFileName = this.libraryProjectName + projectExtension;
        this.libraryProjectPath = path.join(this.libraryProjectName, libraryProjectFileName);

        const testSuffix = '.Tests';
        this.testProjectName = this.libraryProjectName + testSuffix;
        const testProjectFileName = this.testProjectName + projectExtension;
        this.testProjectPath = path.join(this.testProjectName, testProjectFileName);

        this.classLibraryGenerator = new ClassLibraryGenerator(yeoman, this.solutionName, this.libraryProjectName);
    }

    generateSolution() {
        this.yeoman.log('Creating .NET Core solution ...');
        this.yeoman.spawnCommandSync('dotnet', ['new', 'sln', '--output', this.solutionName]);
    }

    generateClassLibrary() {
        process.chdir(this.solutionName);

        this.yeoman.log('Creating .NET Core class library ...');
        this.yeoman.spawnCommandSync('dotnet', ['new', 'classlib', '--language', 'C#', '--name', this.libraryProjectName]);

        process.chdir('..');
    }

    addClassLibraryToSolution() {
        process.chdir(this.solutionName);

        this.yeoman.log('Adding .NET Core class library to solution ...');
        this.yeoman.spawnCommandSync('dotnet', ['sln', 'add', this.libraryProjectPath]);

        process.chdir('..');
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

        // TOODO continue refactoring: Move code to ClassLibraryGenerator
        this.classLibraryGenerator.generateClassLibrary();
        this.addClassLibraryToSolution();

        this.generateTestProject();
        this.addClassLibraryReferenceToTestProject();
        this.addTestProjectToSolution();
    }
}