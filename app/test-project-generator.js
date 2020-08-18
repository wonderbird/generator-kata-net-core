module.exports = class ClassLibraryGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;
    }

    generateTestProject() {
        this.dotnetCli.createNewTestProject(this.configuration.solutionName, this.configuration.testProjectName);
    }

    addClassLibraryReferenceToTestProject() {
        this.dotnetCli.addProjectReference(this.configuration.solutionName,
            this.configuration.testProjectPath,
            this.configuration.libraryProjectPath);
    }

    addTestProjectToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionName, this.configuration.testProjectPath);
    }
}
