module.exports = class YeomanDotnetCli {
    constructor(yeoman) {
        this.yeoman = yeoman;
    }

    createNewSolution(solutionName) {
        this.yeoman.log('Creating .NET Core solution ...');
        this.yeoman.spawnCommandSync('dotnet', ['new', 'sln', '--output', solutionName]);
    }

    createNewClassLibrary(directory, libraryProjectName) {
        const previousWorkingDirectory = process.cwd();

        process.chdir(directory);

        this.yeoman.log('Creating .NET Core class library ...');
        this.yeoman.spawnCommandSync('dotnet', ['new', 'classlib', '--language', 'C#', '--name', libraryProjectName]);

        process.chdir(previousWorkingDirectory);
    }

    addClassLibraryToSolution(solutionName, libraryProjectPath) {
        const previousWorkingDirectory = process.cwd();

        process.chdir(solutionName);

        this.yeoman.log('Adding .NET Core class library to solution ...');
        this.yeoman.spawnCommandSync('dotnet', ['sln', 'add', libraryProjectPath]);

        process.chdir(previousWorkingDirectory);
    }

}
