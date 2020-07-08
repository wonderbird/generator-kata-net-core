var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var TemporaryDirectory = require('./temporary-directory');

describe('yo kata-net-core',
    function () {

        function configureTestExecutionTimeout(mochaContext) {
            const maxTestExecutionDurationOnGithubInMilliseconds = 15000;
            const safetyTimeoutMarginInMilliseconds = 5000;
            const testExecutionTimeoutInMilliseconds =
                maxTestExecutionDurationOnGithubInMilliseconds + safetyTimeoutMarginInMilliseconds;

            mochaContext.timeout(testExecutionTimeoutInMilliseconds);
        }

        function runGeneratorUnderTest() {
            return helpers.run(path.join(__dirname, '../../app'));
        }

        function enumerateExpectedFiles() {
            const visualStudioProjectExtension = '.csproj';
            const visualStudioProjectName = 'SampleKata.Lib';
            const classFileName = 'Class1.cs';
            const projectFileName = visualStudioProjectName + visualStudioProjectExtension;

            return [
                path.join(visualStudioProjectName, classFileName),
                path.join(visualStudioProjectName, projectFileName)
            ];
        }

        function cleanupTestExecutionDirectory(testExecutionDirectoryPath) {
            const testExecutionDirectory = new TemporaryDirectory(testExecutionDirectoryPath);
            testExecutionDirectory.deleteContents();
        }

        it('should create required files and directories',
            function () {
                configureTestExecutionTimeout(this);

                return runGeneratorUnderTest()
                    .then(function (testExecutionDirectoryPath) {
                        const expectedFiles = enumerateExpectedFiles();
                        assert.file(expectedFiles);

                        cleanupTestExecutionDirectory(testExecutionDirectoryPath);
                    });
            });
    });
