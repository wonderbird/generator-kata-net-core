var path = require('path');

module.exports = class Configuration {
    constructor(solutionName) {
      this.librarySuffix = '.Lib';
      this.projectExtension = '.csproj';

      this.solutionName = solutionName;

      this.libraryProjectName = this.solutionName + this.librarySuffix;
      const libraryProjectFileName = this.libraryProjectName + this.projectExtension;
      this.libraryProjectPath = path.join(this.libraryProjectName, libraryProjectFileName);
    }
}