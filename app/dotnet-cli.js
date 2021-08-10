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

    createNewClassLibrary(directory, libraryProjectName) {
        this.runDotnetWithArgumentsOrThrow('new', 'classlib', '--output', directory, '--language', 'C#', '--name', libraryProjectName);
    }

    addProjectToSolution(solutionPath, projectPath) {
        this.runDotnetWithArgumentsOrThrow('sln', solutionPath, 'add', projectPath);
    }

    createNewTestProject(directory, testProjectName) {
        this.runDotnetWithArgumentsOrThrow('new', 'xunit', '--output', directory, '--name', testProjectName);
    }

    addProjectReference(targetProjectPath, referenceProjectPath) {
        this.runDotnetWithArgumentsOrThrow('add', targetProjectPath, 'reference', referenceProjectPath);
    }

    createNewApplication(directory, applicationProjectName) {
        this.runDotnetWithArgumentsOrThrow('new', 'console', '--output', directory, '--language', 'C#', '--name', applicationProjectName);
    }
}
