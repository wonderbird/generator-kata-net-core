var path = require('path');
var fs = require('fs');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('yo kata-net-core',
    function () {

        it('should create required files and directories',
            function () {
                const testContext = new GenerateKataNetCoreTestContext(this);

                return testContext.runGeneratorUnderTest()
                    .then(function () {
                        const expectedFiles = testContext.getExpectedFiles();

                        assert.file(expectedFiles);

                        testContext.deleteTestExecutionFolderContents();
                    });
            });
    });

class GenerateKataNetCoreTestContext {
    constructor(mocha) {
        this.mocha = mocha;

        const visualStudioProjectExtension = '.csproj';
        const visualStudioProjectName = 'SampleKata.Lib';

        this.runGeneratorUnderTest = function () {
            this.configureTestExecutionTimeout();

            var self = this;
            const rememberTestExecutionDirectoryCallback = function (path) {
                self.testExecutionDirectory = path;
            }

            return helpers.run(path.join(__dirname, '../../app'))
                .then(rememberTestExecutionDirectoryCallback);
        };

        this.configureTestExecutionTimeout = function () {
            const averageTestExecutionDurationOnGithubInMilliseconds = 12000;
            const safetyTimeoutMarginInMilliseconds = 5000;
            const testExecutionTimeoutInMilliseconds =
                averageTestExecutionDurationOnGithubInMilliseconds + safetyTimeoutMarginInMilliseconds;

            this.mocha.timeout(testExecutionTimeoutInMilliseconds);
        };

        this.getExpectedFiles = function () {
            const classFileName = 'Class1.cs';
            const projectFileName = visualStudioProjectName + visualStudioProjectExtension;

            return [
                path.join(visualStudioProjectName, classFileName),
                path.join(visualStudioProjectName, projectFileName)
            ];
        };

        this.deleteTestExecutionFolderContents = function () {
            const self = this;

            const expectedDirectories = this.getExpectedDirectories();
            expectedDirectories.forEach(relativePath => {
                var pathToDelete = path.join(self.testExecutionDirectory, relativePath);
                self.deleteFileOrDirectoryRecursively(pathToDelete);
            });
        };

        this.getExpectedDirectories = function () {
            return [
                visualStudioProjectName
            ];
        };

        this.deleteFileOrDirectoryRecursively = function (pathToDelete) {
            try {
                fs.rmdirSync(pathToDelete, { recursive: true });
            } catch (err) {
                console.error('Error while deleting ' + pathToDelete);
            }
        };
    }
}
