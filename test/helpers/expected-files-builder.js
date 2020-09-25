const path = require('path');

module.exports = class ExpectedFilesBuilder {
    constructor(solutionName) {
        this.solutionName = solutionName;
        this.solutionDirectory = this.solutionName;
        this.isMitLicenseSelected = false;
    }

    withSolutionDirectory(solutionDirectory) {
        this.solutionDirectory = solutionDirectory;
        return this;
    }

    withMitLicense(isMitLicenseSelected) {
        this.isMitLicenseSelected = isMitLicenseSelected;
        return this;
    }

    build() {
        const expectedFiles = [];
        
        const solutionFileName = `${this.solutionName}.sln`;
        expectedFiles.push(path.join(this.solutionDirectory, solutionFileName));

        const libraryFolderName = `${this.solutionName}.Lib`;
        const libraryBuildResultName = `${libraryFolderName}.dll`
        const libraryBuildOutputDirectory = path.join('bin', 'Debug', 'netStandard2.0');
        expectedFiles.push(path.join(this.solutionDirectory, libraryFolderName, libraryBuildOutputDirectory, libraryBuildResultName));

        const testFolderName = `${this.solutionName}.Lib.Tests`;
        const testBuildResultName = `${testFolderName}.dll`
        const testBuildOutputDirectory = path.join('bin', 'Debug', 'netcoreapp3.1');
        expectedFiles.push(path.join(this.solutionDirectory, testFolderName, testBuildOutputDirectory, testBuildResultName));

        const appFolderName = `${this.solutionName}.App`;
        const appBuildResultName = `${appFolderName}.dll`
        const appBuildOutputDirectory = path.join('bin', 'Debug', 'netcoreapp3.1');
        expectedFiles.push(path.join(this.solutionDirectory, appFolderName, appBuildOutputDirectory, appBuildResultName));

        expectedFiles.push(path.join(this.solutionDirectory, 'tools', 'msxsl.exe'));
        expectedFiles.push(path.join(this.solutionDirectory, 'tools', 'dupfinder.xslt'));
        expectedFiles.push(path.join(this.solutionDirectory, 'tools', 'dupfinder.bat'));

        expectedFiles.push(path.join(this.solutionDirectory, '.gitignore'));
        expectedFiles.push(path.join(this.solutionDirectory, 'README.md'));

        if (this.isMitLicenseSelected) {
            expectedFiles.push(path.join(this.solutionDirectory, 'LICENSE'));
        }

        return expectedFiles;
    }
}