module.exports = class ClassLibraryGenerator {
    constructor(dotnetCli, configuration) {
        this.dotnetCli = dotnetCli;
        this.configuration = configuration;
    }

    generateClassLibrary() {
        this.dotnetCli.createNewClassLibrary(this.configuration.solutionName, this.configuration.libraryProjectName);
    }

    addClassLibraryToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionName, this.configuration.libraryProjectPath);
    }

    generate() {
        // TODO call the class functions from here
    }
}
