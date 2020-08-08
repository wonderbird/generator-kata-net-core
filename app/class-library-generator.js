module.exports = class ClassLibraryGenerator {
    constructor(yeoman, solutionName, libraryProjectName) {
        this.yeoman = yeoman;
        this.solutionName = solutionName;
        this.libraryProjectName = libraryProjectName;
    }

    generateClassLibrary() {
        process.chdir(this.solutionName);

        this.yeoman.log('Creating .NET Core class library ...');
        this.yeoman.spawnCommandSync('dotnet', ['new', 'classlib', '--language', 'C#', '--name', this.libraryProjectName]);

        process.chdir('..');
    }
}
