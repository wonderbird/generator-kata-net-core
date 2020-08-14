var path = require('path');

module.exports = class ClassLibraryGenerator {
    constructor(dotnetCli, solutionName) {

        this.dotnetCli = dotnetCli;
        this.solutionName = solutionName;

        // TODO refactor: consolidate the constants below and in SolutionGenerator into a single constants data struct
        const librarySuffix = '.Lib';
        const projectExtension = '.csproj';

        this.libraryProjectName = this.solutionName + librarySuffix;
        const libraryProjectFileName = this.libraryProjectName + projectExtension;
        this.libraryProjectPath = path.join(this.libraryProjectName, libraryProjectFileName);

    }

    generateClassLibrary() {
        this.dotnetCli.createNewClassLibrary(this.solutionName, this.libraryProjectName);
    }

    addClassLibraryToSolution() {
        this.dotnetCli.addProjectToSolution(this.solutionName, this.libraryProjectPath);
    }

}
