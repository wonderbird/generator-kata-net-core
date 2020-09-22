const path = require('path');

module.exports = class ExpectedFilesBuilder {
    constructor(solutionName) {
        this.solutionName = solutionName;
        this.solutionDirectory = this.solutionName;
    }

    setSolutionDirectory(solutionDirectory) {
        this.solutionDirectory = solutionDirectory;
        return this;
    }

    build() {
        const libraryBuildOutputDirectory = path.join('bin', 'Debug', 'netStandard2.0');

        return [
            path.join(this.solutionDirectory, this._getSolutionFileName()),
            path.join(this.solutionDirectory, this._getLibraryFolderName(), libraryBuildOutputDirectory, this._getLibraryFolderName(), this._getLibraryBuildResultName()),
        ];
    }

    _getLibraryBuildResultName() {
        const libraryFolderName = this._getLibraryFolderName();
        return `${libraryFolderName}.dll`;
    }

    _getLibraryFolderName() {
        return `${this.solutionName}.Lib`;
    }

    _getSolutionFileName() {
        return `${this.solutionName}.sln`;
    }
}