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
            // TODO (wip) Generate a solution containing this project
            // TODO Generate a unit test project and add it to the solution -- see https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test

            const solutionExtension = '.sln';
            const projectExtension = '.csproj';
            const librarySuffix = '.Lib';

            const solutionName = 'SampleKata';

            const solutionDirectory = solutionName;
            const solutionFileName = solutionName + solutionExtension;

            const projectDirectory = solutionName + librarySuffix;
            const projectFileName = solutionName + librarySuffix + projectExtension;

            return [
                path.join(solutionDirectory, solutionFileName),
                path.join(solutionDirectory, projectDirectory, projectFileName)
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
