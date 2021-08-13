module.exports = class DotnetCli {
    constructor(yeoman) {
        this.yeoman = yeoman;
        this.process = process;
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

    createNewTestProject(testDirectory, testProjectName) {
        this.runDotnetWithArgumentsOrThrow('new', 'xunit', '--output', testDirectory, '--name', testProjectName);
    }

    addProjectReference(targetProjectPath, referenceProjectPath) {
        this.runDotnetWithArgumentsOrThrow('add', targetProjectPath, 'reference', referenceProjectPath);
    }

    createNewApplication(applicationDirectory, applicationProjectName) {
        this.runDotnetWithArgumentsOrThrow('new', 'console', '--output', applicationDirectory, '--language', 'C#', '--name', applicationProjectName);
    }
}
