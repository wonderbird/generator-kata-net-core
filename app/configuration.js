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

        this.solutionExtension = '.sln';
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
    }

    enableSeparateSolutionDir() {
        this.isSeparateSolutionDirEnabled = true;
        this.solutionDirectory = this.solutionName;
        this.updateSolutionDirDependentConfig();
    }

    disableSeparateSolutionDir() {
        this.isSeparateSolutionDirEnabled = false;
        this.solutionDirectory = this.currentDirectory;
        this.updateSolutionDirDependentConfig();
    }

    updateSolutionDirDependentConfig() {
        this.solutionPath = path.join(this.solutionDirectory, this.solutionName);
        this.solutionPath += this.solutionExtension;

        this.libraryProjectName = this.solutionName + this.librarySuffix;
        this.libraryProjectDirectory = path.join(this.solutionDirectory, this.libraryProjectName);
        const libraryProjectFileName = this.libraryProjectName + this.projectExtension;
        this.libraryProjectPath = path.join(this.libraryProjectDirectory, libraryProjectFileName);
  
        this.testProjectName = this.libraryProjectName + this.testSuffix;
        this.testProjectDirectory = path.join(this.solutionDirectory, this.testProjectName);
        const testProjectFileName = this.testProjectName + this.projectExtension;
        this.testProjectPath = path.join(this.testProjectDirectory, testProjectFileName);

        this.applicationProjectName = this.solutionName + this.applicationSuffix;
        this.applicationProjectDirectory = path.join(this.solutionDirectory, this.applicationProjectName);
        const applicationProjectFileName = this.applicationProjectName + this.projectExtension;
        this.applicationProjectPath = path.join(this.applicationProjectDirectory, applicationProjectFileName);
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