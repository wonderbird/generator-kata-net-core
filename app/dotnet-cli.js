module.exports = class DotnetCli {
    constructor(yeoman) {
        this.yeoman = yeoman;
        this.process = process;
    }

    changeDirectoryOrThrow(directory) {
        try {
            this.process.chdir(directory);
        } catch(e) {
            throw Error('changing the working directory failed');
        }
    }

    // TODO Ensure that the return code of spawnCommandSync is considered properly. Example: If adding the library reference fails, then dotnet shows an error but the tests are still green.
    runInDirectoryAndReturnAfterwards(directory, delegateFunction) {
        const previousWorkingDirectory = process.cwd();

        this.changeDirectoryOrThrow(directory);

        delegateFunction();

        this.changeDirectoryOrThrow(previousWorkingDirectory);
    }

    runDotnetWithArgumentsOrThrow(/* parameters to the dotnet command are consumed from the arguments object */) {
        const argsArray = Array.from(arguments);
        const spawnResult = this.yeoman.spawnCommandSync('dotnet', argsArray);
    
        if (spawnResult.status != 0) {
            const stdoutString = spawnResult.output[1];
            const stderrString = spawnResult.output[2];
            throw Error('dotnet command failed with stdout = "' + stdoutString + '", stderr = "' + stderrString + '"');
        }
    }

    createNewSolution(solutionName) {
        this.runDotnetWithArgumentsOrThrow('new', 'sln', '--output', solutionName);
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
