var path = require('path');

module.exports = class ClassLibraryGenerator {
    constructor(yeomanDotnetCli, solutionName) {

        this.yeomanDotnetCli = yeomanDotnetCli;
        this.solutionName = solutionName;

        // TODO refactor: consolidate the constants below and in SolutionGenerator into a single constants data struct
        const librarySuffix = '.Lib';
        const projectExtension = '.csproj';

        this.libraryProjectName = this.solutionName + librarySuffix;
        const libraryProjectFileName = this.libraryProjectName + projectExtension;
        this.libraryProjectPath = path.join(this.libraryProjectName, libraryProjectFileName);

    }

    generateClassLibrary() {
        this.yeomanDotnetCli.createNewClassLibrary(this.solutionName, this.libraryProjectName);
    }

    addClassLibraryToSolution() {
        this.yeomanDotnetCli.addProjectToSolution(this.solutionName, this.libraryProjectPath);
    }

}
