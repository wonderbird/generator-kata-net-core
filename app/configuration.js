var path = require('path');

module.exports = class Configuration {
    constructor(solutionName) {
        this.projectExtension = '.csproj';
        this.librarySuffix = '.Lib';
        this.testSuffix = '.Tests';
        this.applicationSuffix = '.App';

        this.setSolutionNameAndUpdateConfiguration(solutionName);
    }

    setSolutionNameAndUpdateConfiguration(solutionName) {
        this.solutionName = solutionName;

        this.libraryProjectName = this.solutionName + this.librarySuffix;
        const libraryProjectFileName = this.libraryProjectName + this.projectExtension;
        this.libraryProjectPath = path.join(this.libraryProjectName, libraryProjectFileName);
  
        this.testProjectName = this.libraryProjectName + this.testSuffix;
        const testProjectFileName = this.testProjectName + this.projectExtension;
        this.testProjectPath = path.join(this.testProjectName, testProjectFileName);

        this.applicationProjectName = this.solutionName + this.applicationSuffix;
    }
}