module.exports = class YeomanDotnetCli {
    constructor(yeoman) {
        this.yeoman = yeoman;
    }

    // TODO Ensure that the return code of spawnCommandSync is considered properly. Example: If adding the library reference fails, then dotnet shows an error but the tests are still green.
    runInDirectoryAndReturnAfterwards(directory, delegateFunction) {
        const previousWorkingDirectory = process.cwd();
        process.chdir(directory);

        delegateFunction();

        process.chdir(previousWorkingDirectory);
    }

    createNewSolution(solutionName) {
        this.yeoman.log('Creating .NET Core solution ...');
        this.yeoman.spawnCommandSync('dotnet', ['new', 'sln', '--output', solutionName]);
    }

    createNewClassLibrary(directory, libraryProjectName) {
        this.runInDirectoryAndReturnAfterwards(directory,
            () => {
                this.yeoman.log('Creating .NET Core class library ...');
                this.yeoman.spawnCommandSync('dotnet', ['new', 'classlib', '--language', 'C#', '--name', libraryProjectName]);
            });
    }

    addProjectToSolution(solutionName, projectPath) {
        this.runInDirectoryAndReturnAfterwards(solutionName,
            () => {
                this.yeoman.log('Adding .NET Core class library to solution ...');
                this.yeoman.spawnCommandSync('dotnet', ['sln', 'add', projectPath]);
            });
    }

    createNewTestProject(directory, testProjectName) {
        this.runInDirectoryAndReturnAfterwards(directory,
            () => {
                this.yeoman.log('Creating unit test project ...');
                this.yeoman.spawnCommandSync('dotnet', ['new', 'xunit', '--name', testProjectName]);
            });
    }

    addProjectReference(directory, targetProjectPath, referenceProjectPath) {
        this.runInDirectoryAndReturnAfterwards(directory,
            () => {
                this.yeoman.log('Adding library reference to unit test project ...');
                this.yeoman.spawnCommandSync('dotnet',
                    ['add', targetProjectPath, 'reference', referenceProjectPath]);
            });
    }

}
