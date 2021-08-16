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

        this.updateSolutionDirDependentConfiguration();
    }

    disableSeparateSolutionDir() {
        this.isSeparateSolutionDirEnabled = false;
        this.solutionDirectory = this.currentDirectory;

        this.updateSolutionDirDependentConfiguration();
    }

    updateSolutionDirDependentConfiguration() {
        const solutionFileName = this.solutionName + this.solutionExtension;
        this.solutionPath = path.join(this.solutionDirectory, solutionFileName);

        this.libraryProjectName = this.solutionName + this.librarySuffix;
        const libraryProjectFileName = this.libraryProjectName + this.projectExtension;
        this.libraryProjectDirectory = path.join(this.solutionDirectory, this.libraryProjectName)
        this.libraryProjectPath = path.join(this.libraryProjectDirectory, libraryProjectFileName);
  
        this.testProjectName = this.libraryProjectName + this.testSuffix;
        const testProjectFileName = this.testProjectName + this.projectExtension;
        this.testProjectDirectory = path.join(this.solutionDirectory, this.testProjectName)
        this.testProjectPath = path.join(this.testProjectDirectory, testProjectFileName);

        this.applicationProjectName = this.solutionName + this.applicationSuffix;
        const applicationProjectFileName = this.applicationProjectName + this.projectExtension;
        this.applicationProjectDirectory = path.join(this.solutionDirectory, this.applicationProjectName)
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