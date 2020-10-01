const path = require('path');
const DateUtils = require('./date-utils');

module.exports = class Configuration {
    constructor(solutionName, dateUtilsReplacement) {
        if (dateUtilsReplacement !== undefined) {
            this.dateUtils = dateUtilsReplacement;
        } else {
            this.dateUtils = new DateUtils();
        }

        this.currentDirectory = ".";

        this.projectExtension = '.csproj';
        this.librarySuffix = '.Lib';
        this.testSuffix = '.Tests';
        this.applicationSuffix = '.App';

        this.isSeparateSolutionDirEnabled = true;
        this.isMitLicenseSelected = false;

        this.currentYear = this.dateUtils.getCurrentYear();

        this.setSolutionNameAndUpdateConfiguration(solutionName);
    }

    setSolutionNameAndUpdateConfiguration(solutionName) {
        this.solutionName = solutionName;

        if (this.isSeparateSolutionDirEnabled) {
            this.enableSeparateSolutionDir();
        } else {
            this.disableSeparateSolutionDir();
        }

        this.libraryProjectName = this.solutionName + this.librarySuffix;
        const libraryProjectFileName = this.libraryProjectName + this.projectExtension;
        this.libraryProjectPath = path.join(this.libraryProjectName, libraryProjectFileName);
  
        this.testProjectName = this.libraryProjectName + this.testSuffix;
        const testProjectFileName = this.testProjectName + this.projectExtension;
        this.testProjectPath = path.join(this.testProjectName, testProjectFileName);

        this.applicationProjectName = this.solutionName + this.applicationSuffix;
        const applicationProjectFileName = this.applicationProjectName + this.projectExtension;
        this.applicationProjectPath = path.join(this.applicationProjectName, applicationProjectFileName);
    }

    enableSeparateSolutionDir() {
        this.isSeparateSolutionDirEnabled = true;
        this.solutionDirectory = this.solutionName;
    }

    disableSeparateSolutionDir() {
        this.isSeparateSolutionDirEnabled = false;
        this.solutionDirectory = this.currentDirectory;
    }

    selectMitLicense() {
        this.isMitLicenseSelected = true;
    }

    deselectMitLicense() {
        this.isMitLicenseSelected = false;
    }

    setAuthorName(authorName) {
        this.authorName = authorName;
    }
}