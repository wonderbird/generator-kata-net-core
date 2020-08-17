var path = require('path');

module.exports = class ClassLibraryGenerator {
    constructor(dotnetCli, configuration) {

        this.dotnetCli = dotnetCli;
        this.configuration = configuration;

        // TODO refactor: consolidate the constants below and in SolutionGenerator into a single constants data struct
        const librarySuffix = '.Lib';
        const projectExtension = '.csproj';

        this.libraryProjectName = this.configuration.solutionName + librarySuffix;
        const libraryProjectFileName = this.libraryProjectName + projectExtension;
        this.libraryProjectPath = path.join(this.libraryProjectName, libraryProjectFileName);

    }

    generateClassLibrary() {
        this.dotnetCli.createNewClassLibrary(this.configuration.solutionName, this.libraryProjectName);
    }

    addClassLibraryToSolution() {
        this.dotnetCli.addProjectToSolution(this.configuration.solutionName, this.libraryProjectPath);
    }

}
