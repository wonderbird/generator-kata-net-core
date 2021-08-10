module.exports = class DotnetCli {
    constructor(yeoman) {
        this.yeoman = yeoman;
        this.process = process;
    }

    // TODO: finally we can delete changeDirectoryOrThrow
    changeDirectoryOrThrow(directory) {
        try {
            this.process.chdir(directory);
        } catch(e) {
            throw Error('changing the working directory failed');
        }
    }

    // TODO: finally we can delete runInDirectoryAndReturnAfterwards
    runInDirectoryAndReturnAfterwards(directory, delegateFunction) {
        const previousWorkingDirectory = this.process.cwd();

        this.changeDirectoryOrThrow(directory);

        try {
            delegateFunction();
        } finally {
            this.process.chdir(previousWorkingDirectory);
        }
    }

    runDotnetWithArgumentsOrThrow(/* parameters to the dotnet command are consumed from the arguments object */) {
        const argsArray = Array.from(arguments);
        const spawnResult = this.yeoman.spawnCommandSync('dotnet', argsArray);
    
        if (spawnResult.failed === true) {
            const stdoutString = spawnResult.output[1];
            const stderrString = spawnResult.output[2];
            throw Error('dotnet command failed with stdout = "' + stdoutString + '", stderr = "' + stderrString + '"');
        }
    }

    createNewSolutionInDirectory(solutionName, solutionDirectory) {
        this.runDotnetWithArgumentsOrThrow('new', 'sln', '--output', solutionDirectory, '--name', solutionName);
    }

    createNewClassLibrary(libraryDirectory, libraryProjectName) {
        this.runDotnetWithArgumentsOrThrow('new', 'classlib', '--output', libraryDirectory, '--language', 'C#', '--name', libraryProjectName);
    }

    addProjectToSolution(solutionPath, projectPath) {
        this.runDotnetWithArgumentsOrThrow('sln', solutionPath, 'add', projectPath);
    }

    createNewTestProject(directory, testProjectName) {
        this.runInDirectoryAndReturnAfterwards(directory,
            () => this.runDotnetWithArgumentsOrThrow('new', 'xunit', '--name', testProjectName));
    }

    addProjectReference(directory, targetProjectPath, referenceProjectPath) {
        this.runInDirectoryAndReturnAfterwards(directory,
            () => this.runDotnetWithArgumentsOrThrow('add', targetProjectPath, 'reference', referenceProjectPath));
    }

    createNewApplication(directory, applicationProjectName) {
        this.runInDirectoryAndReturnAfterwards(directory,
            () => this.runDotnetWithArgumentsOrThrow('new', 'console', '--language', 'C#', '--name', applicationProjectName));
    }
}
